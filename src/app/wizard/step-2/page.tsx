"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep2() {
  const { data, updateData } = usePortfolioStore();
  const [links, setLinks] = useState(data.socials.length > 0 ? data.socials : [
    { id: 1, platform: "GitHub", url: "https://github.com/username" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/username" }
  ]);
  const router = useRouter();

  const handleNext = () => {
    updateData({ socials: links });
    router.push("/wizard/step-3");
  };

  const addLink = () => {
    const newId = links.length ? links[links.length - 1].id + 1 : 1;
    setLinks([...links, { id: newId, platform: "Custom Link", url: "https://" }]);
  };

  const removeLink = (idToRemove: number) => {
    setLinks(links.filter(link => link.id !== idToRemove));
  };

  const updateLink = (id: number, field: string, value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Step 2 of 4: Social Accounts
        </div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: The Wizard Form */}
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Connect your presence.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Attach your professional profiles. We'll automatically turn these into beautiful icons on your portfolio.
          </p>

          <div className="glass-card">
            
            {links.map((link, index) => (
              <div key={link.id} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Platform</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={link.platform} 
                    onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                  />
                </div>
                <div style={{ flex: 2 }}>
                  <label className="input-label">URL</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={link.url} 
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                  />
                </div>
                {links.length > 1 && (
                  <button 
                    onClick={() => removeLink(link.id)}
                    style={{ background: 'transparent', border: '1px solid var(--card-border)', color: '#ef4444', height: '48px', width: '48px', borderRadius: '0.8rem', marginTop: '1.8rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Remove Link"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button 
              onClick={addLink}
              className="btn btn-secondary" 
              style={{ width: '100%', marginBottom: '3rem', borderStyle: 'dashed' }}>
              + Add Another Link
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/wizard/step-profile" className="btn btn-secondary">← Back</Link>
              <button onClick={handleNext} className="btn btn-gradient">Next: About & Services ➔</button>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview Placeholder */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Live Preview</span>
            <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>Template: Default Dark</span>
          </div>
          
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '20%', right: '20%', width: '150px', height: '150px', background: 'var(--accent-purple)', filter: 'blur(70px)', opacity: 0.4 }}></div>
            
            <div style={{ textAlign: 'center', zIndex: 10, width: '100%' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Aniket</h1>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', marginBottom: '2rem' }}>Full Stack Developer</h2>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {links.map(link => (
                  <div key={`preview-${link.id}`} style={{ padding: '0.6rem 1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {link.platform}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
