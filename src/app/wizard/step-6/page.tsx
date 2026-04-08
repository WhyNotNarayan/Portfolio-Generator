"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep6() {
  const { data, updateData } = usePortfolioStore();
  
  // Map store experience to local state format
  const [experiences, setExperiences] = useState(data.experience.length > 0 
    ? data.experience.map((e, idx) => ({ id: idx, role: e.role, company: e.company, duration: e.duration, details: e.desc }))
    : [{ id: 1, role: "", company: "", duration: "", details: "" }]
  );
  const router = useRouter();

  const handleNext = () => {
    // Map local back to store
    const storeExp = experiences.map(e => ({
      role: e.role,
      company: e.company,
      duration: e.duration,
      desc: e.details
    }));
    updateData({ experience: storeExp });
    router.push("/wizard/step-7");
  };

  const addExp = () => {
    setExperiences([...experiences, { id: Date.now(), role: "", company: "", duration: "", details: "" }]);
  };

  const update = (id: number, field: string, val: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Step 6 of 8: Experience</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your professional journey.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Add your past work history (if any) to build a beautiful timeline.</p>

          <div className="glass-card">
            {experiences.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>Position #{i + 1}</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Role Title</label>
                    <input type="text" className="input-field" placeholder="Software Engineer" value={exp.role} onChange={e => update(exp.id, 'role', e.target.value)} />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Company / Client</label>
                    <input type="text" className="input-field" placeholder="Google" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Duration</label>
                  <input type="text" className="input-field" placeholder="Jan 2022 - Present" value={exp.duration} onChange={e => update(exp.id, 'duration', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Details / Accomplishments</label>
                  <textarea className="input-field" rows={3} placeholder="Led a team of..." value={exp.details} onChange={e => update(exp.id, 'details', e.target.value)} />
                </div>
              </div>
            ))}
            
            <button onClick={addExp} className="btn btn-secondary" style={{ width: '100%', marginBottom: '3rem', borderStyle: 'dashed' }}>
              + Add Experience
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/wizard/step-5" className="btn btn-secondary">← Back</Link>
              <button 
                onClick={handleNext}
                className="btn btn-gradient"
              >
                Next: Certificates ➔
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
