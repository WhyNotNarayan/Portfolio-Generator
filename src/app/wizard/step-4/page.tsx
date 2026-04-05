"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep4() {
  const { data, updateData } = usePortfolioStore();
  
  // Map store projects to local state format
  const [projects, setProjects] = useState(data.projects.length > 0 
    ? data.projects.map((p, idx) => ({ id: idx, name: p.title, desc: p.desc, lang: p.tech, link: p.link }))
    : [{ id: 1, name: "", desc: "", lang: "", link: "" }]
  );
  const router = useRouter();

  const handleNext = () => {
    // Map local projects back to store format
    const storeProjects = projects.map(p => ({
      title: p.name,
      desc: p.desc,
      link: p.link,
      tech: p.lang
    }));
    updateData({ projects: storeProjects });
    router.push("/wizard/step-5");
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now(), name: "", desc: "", lang: "", link: "" }]);
  };

  const update = (id: number, field: string, val: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Step 4 of 8: Projects</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Showcase your work.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Add details for your top repositories or live sites.</p>

          <div className="glass-card">
            {projects.map((p, i) => (
              <div key={p.id} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>Project #{i + 1}</h4>
                <div className="input-group">
                  <label className="input-label">Project Name</label>
                  <input type="text" className="input-field" placeholder="E.g. E-Commerce API" value={p.name} onChange={e => update(p.id, 'name', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Short Description</label>
                  <textarea className="input-field" rows={2} placeholder="Built a highly scalable backend..." value={p.desc} onChange={e => update(p.id, 'desc', e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Core Language</label>
                    <input type="text" className="input-field" placeholder="React, Node.js..." value={p.lang} onChange={e => update(p.id, 'lang', e.target.value)} />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Link (Repo / Live)</label>
                    <input type="text" className="input-field" placeholder="https://..." value={p.link} onChange={e => update(p.id, 'link', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            
            <button onClick={addProject} className="btn btn-secondary" style={{ width: '100%', marginBottom: '3rem', borderStyle: 'dashed' }}>
              + Add Another Project
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/wizard/step-3" className="btn btn-secondary">← Back</Link>
              <button 
                onClick={handleNext} 
                className="btn btn-gradient"
              >
                Next: Skills ➔
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '1rem', display: 'inline-block' }}>Live Preview</div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Featured Work</h3>
            {projects.map((p, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{p.name || "Untitled Project"}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0' }}>{p.desc || "Description goes here..."}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', background: 'rgba(147, 51, 234, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{p.lang || "Language"}</span>
                  <a href="#" style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>View ➔</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
