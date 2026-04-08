"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep8() {
  const { data, updateData } = usePortfolioStore();
  const [contact, setContact] = useState({
    email: data.email || "", 
    phone: data.phone || "", 
    address: data.location || "", 
    freelnaceStatus: "Available"
  });
  const router = useRouter();

  const handleNext = () => {
    updateData({ 
       email: contact.email, 
       phone: contact.phone, 
       location: contact.address 
    });
    router.push("/wizard/step-9");
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Step 8 of 8: Contact & Finish</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>How can they reach you?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>The final step. Add ways for recruiters and clients to get in touch.</p>

          <div className="glass-card">
            <div className="input-group">
              <label className="input-label">Public Email Address</label>
              <input type="email" className="input-field" placeholder="hello@example.com" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number (Optional)</label>
              <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Location / Timezone</label>
              <input type="text" className="input-field" placeholder="New York, NY (EST)" value={contact.address} onChange={e => setContact({...contact, address: e.target.value})} />
            </div>
            
            <div className="input-group" style={{ marginTop: '2rem' }}>
              <label className="input-label">Are you open to freelance/new roles?</label>
              <select className="input-field" value={contact.freelnaceStatus} onChange={e => setContact({...contact, freelnaceStatus: e.target.value})} style={{ appearance: 'none' }}>
                <option>Available for Freelance</option>
                <option>Looking for Full-time Roles</option>
                <option>Not open right now</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Link href="/wizard/step-7" className="btn btn-secondary">← Back</Link>
              <button 
                onClick={handleNext}
                className="btn btn-gradient"
              >
                Next: Advanced Features ➔
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
