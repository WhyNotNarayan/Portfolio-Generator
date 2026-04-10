"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { generatePortfolioZip } from "@/lib/exporter";
import "../../../app/globals.css";

import { templates, TemplateId } from "@/components/templates";
import { createPaymentOrder, verifyPayment } from "@/app/actions/payment";

// --- MAIN PREVIEW PAGE ---

const getTemplatePrice = (id: string) => {
  if (id.startsWith('lay-elite') || id.includes('3d')) return 130;
  if (id.startsWith('lay-prem') || id.includes('high')) return 90;
  return 0;
};

export default function WizardFinish() {
  const { data, userId } = usePortfolioStore();
  const [exporting, setExporting] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Select the template component
  const templateId = data.selectedLayoutId || 'free-simple';
  const price = getTemplatePrice(templateId);
  const SelectedTemplate = templates[templateId as TemplateId] || templates['free-simple'];

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleRazorpayPayment = async () => {
    if (!isRazorpayLoaded) {
      alert("Payment gateway is still loading. Please wait...");
      return;
    }

    if (!userId) {
      alert("Please login to proceed with premium selection.");
      return;
    }

    setLoadingPayment(true);
    
    // 1. Create Order on Backend (Node.js/Server Action)
    const orderResult = await createPaymentOrder(price, userId);
    
    if (!orderResult.success) {
      alert(orderResult.error);
      setLoadingPayment(false);
      return;
    }

    // 2. Open Razorpay Checkout with Real Order ID
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_UeXpXnXXXXXX",
      amount: orderResult.amount,
      currency: "INR",
      name: "PortGen Premium",
      description: `Unlock ${templateId} Template`,
      order_id: orderResult.orderId,
      handler: async function (response: any) {
        // 3. Verify Payment on Backend (Secure Signature Matching)
        const verifyResult = await verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );

        if (verifyResult.success) {
          setIsPaid(true);
          alert("Payment Verified! Your download is starting...");
        } else {
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone
      },
      theme: { color: "#10b981" },
      modal: {
        ondismiss: function() {
          setLoadingPayment(false);
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleExport = async () => {
    // Check if free or already paid
    if (price > 0 && !isPaid) {
      handleRazorpayPayment();
      return;
    }

    setExporting(true);
    try {
      const blob = await generatePortfolioZip(data);
      const url = window.URL.createObjectURL(blob as Blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${data.name || "portfolio"}-project.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to generate ZIP. Please try again.");
    } finally {
      setExporting(false);
      setLoadingPayment(false);
    }
  };

  // Auto-download after successful verification
  useEffect(() => {
    if (isPaid && !exporting) {
      handleExport();
    }
  }, [isPaid]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <SelectedTemplate data={data} />

      {/* Floating Toolbar */}
      <div style={{ 
          position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
          padding: '0.8rem 2rem', borderRadius: '99px', display: 'flex', gap: '1.5rem', alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 9999
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Preview Mode</span>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
          <Link href="/wizard/step-10" style={{ fontSize: '0.85rem', color: '#fff', textDecoration: 'none' }}>Edit Layout</Link>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
          <button 
            disabled={exporting || loadingPayment}
            onClick={handleExport}
            className="btn btn-gradient" 
            style={{ 
              padding: '0.5rem 1.5rem', fontSize: '0.75rem', borderRadius: '99px',
              background: price > 0 && !isPaid ? 'linear-gradient(135deg, #10b981, #059669)' : undefined
            }}
          >
            {exporting ? "Generating ZIP..." : (loadingPayment ? "Secure Checkout..." : (price > 0 && !isPaid ? `Unlock & Export (₹${price})` : "Export ZIP ➔"))}
          </button>
      </div>
    </div>
  );
}
