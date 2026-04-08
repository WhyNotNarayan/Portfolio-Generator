"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep7() {
  const { data, updateData } = usePortfolioStore();
  
  // Map store data to local state
  const [certs, setCerts] = useState(data.certificates.length > 0 
    ? data.certificates.map((c, idx) => ({ id: idx, name: c.name, provider: c.issuer, link: c.url }))
    : [{ id: 1, name: "", provider: "", link: "" }]
  );
  const router = useRouter();

  const handleNext = () => {
    // Map back to store
    const storeCerts = certs.map(c => ({
      name: c.name,
      issuer: c.provider,
      url: c.link
    }));
    updateData({ certificates: storeCerts });
    router.push("/wizard/step-8");
  };

  const addCert = () => {
    setCerts([...certs, { id: Date.now(), name: "", provider: "", link: "" }]);
  };

  const update = (id: number, field: string, val: string) => {
    setCerts(certs.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Step 7 of 8: Certificates</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Prove your skills.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Link your digital certificates or credentials (AWS, Coursera, etc).</p>

          <div className="glass-card">
            {certs.map((c, i) => (
              <div key={c.id} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Certificate Name</label>
                    <input type="text" className="input-field" placeholder="e.g. AWS Cloud Practitioner" value={c.name} onChange={e => update(c.id, 'name', e.target.value)} />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Provider</label>
                    <input type="text" className="input-field" placeholder="e.g. Amazon" value={c.provider} onChange={e => update(c.id, 'provider', e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Digital Badge / Credential Link</label>
                  <input type="text" className="input-field" placeholder="https://credly.com/..." value={c.link} onChange={e => update(c.id, 'link', e.target.value)} />
                </div>
              </div>
            ))}
            
            <button onClick={addCert} className="btn btn-secondary" style={{ width: '100%', marginBottom: '3rem', borderStyle: 'dashed' }}>
              + Add Certificate
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/wizard/step-6" className="btn btn-secondary">← Back</Link>
              <button 
                onClick={handleNext}
                className="btn btn-gradient"
              >
                Next: Contact Info ➔
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
