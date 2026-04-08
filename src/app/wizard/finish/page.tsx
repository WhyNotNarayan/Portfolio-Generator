"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { generatePortfolioZip } from "@/lib/exporter";
import "../../../app/globals.css";

import { templates, TemplateId } from "@/components/templates";

// --- MAIN PREVIEW PAGE ---

export default function WizardFinish() {
  const { data, userId } = usePortfolioStore();
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [exporting, setExporting] = useState(false);

  // Select the template component, fallback to 'free-simple' if ID is missing or invalid
  const layoutId = (data.selectedLayoutId as TemplateId) || 'free-simple';
  const SelectedTemplate = templates[layoutId] || templates['free-simple'];

  const handleExport = async () => {
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
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* The Actual Portfolio Template Renderer */}
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
            disabled={exporting}
            onClick={handleExport}
            className="btn btn-gradient" 
            style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem', borderRadius: '99px' }}
          >
            {exporting ? "Generating ZIP..." : "Export ZIP ➔"}
          </button>
      </div>

    </div>
  );
}
