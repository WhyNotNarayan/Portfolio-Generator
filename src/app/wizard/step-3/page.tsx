"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep3() {
  const { data, updateData } = usePortfolioStore();
  const [about, setAbout] = useState(data.bio || "");
  const [services, setServices] = useState<string[]>(data.services || []);
  const [customService, setCustomService] = useState("");
  const router = useRouter();

  const handleNext = () => {
    updateData({ bio: about, services });
    router.push("/wizard/step-4");
  };

  const defaultServices = [
    "Frontend Development", "Backend Architecture", "Full-Stack Dev", 
    "UI/UX Design", "Mobile App Development", "SEO Optimization", 
    "Cybersecurity Auditing", "Database Setup"
  ];

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter(s => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const addCustomService = () => {
    if (customService.trim() && !services.includes(customService.trim())) {
      setServices([...services, customService.trim()]);
      setCustomService(""); // Clear input after adding
    }
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Step 3 of 8: About & Services</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Who are you?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Tell the world your story and what you offer.</p>

          <div className="glass-card">
            <div className="input-group">
              <label className="input-label">Detailed "About Me"</label>
              <textarea 
                className="input-field" rows={5}
                placeholder="I am a passionate developer with a knack for solving complex problems..."
                value={about} onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-group" style={{ marginTop: '2rem' }}>
              <label className="input-label" style={{ marginBottom: '1rem' }}>Services You Offer</label>
              
              {/* Default Services */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {defaultServices.map(service => (
                  <button 
                    key={service}
                    onClick={() => toggleService(service)}
                    style={{ 
                      padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                      background: services.includes(service) ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                      border: services.includes(service) ? '1px solid var(--accent-purple)' : '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontWeight: 500
                    }}
                  >
                    {service}
                  </button>
                ))}
                
                {/* Dynamically added custom services so they can be toggled/removed */}
                {services.filter(s => !defaultServices.includes(s)).map(custom => (
                  <button 
                    key={custom}
                    onClick={() => toggleService(custom)}
                    style={{ 
                      padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                      background: 'var(--accent-blue)', border: '1px solid var(--accent-blue)', color: 'white', fontWeight: 500
                    }}
                    title="Click to remove"
                  >
                    {custom} ✕
                  </button>
                ))}
              </div>

              {/* Custom Service Adder */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="E.g. Technical Writing" 
                  value={customService} 
                  onChange={e => setCustomService(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustomService()}
                />
                <button 
                  onClick={addCustomService}
                  className="btn btn-secondary" 
                  style={{ whiteSpace: 'nowrap', padding: '0 1rem' }}
                >
                  + Add Custom
                </button>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Don't see your service? Type it and press custom add.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Link href="/wizard/step-2" className="btn btn-secondary">← Back</Link>
              <button 
                onClick={handleNext}
                className="btn btn-gradient"
              >
                Next: Projects ➔
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '1rem', display: 'inline-block' }}>Live Preview</div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-blue)' }}>About Me</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              {about || "Start typing to see your about section taking shape here..."}
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-purple)' }}>My Services</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {services.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No services selected.</span>}
              {services.map(s => (
                 <span key={`preview-${s}`} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
