"use client";

import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import "../../app/globals.css";

export default function Wizard() {
  const { data, updateData, userId } = usePortfolioStore();

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Step 1: Basic Info
        </div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem' }}>
        {/* Left Side: The Wizard Form */}
        <div style={{ flex: 1 }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Let's build your brand.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Fill in your core details. We use this to populate the Hero section of your portfolio.
          </p>

          <div className="glass-card">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Aniket" 
                value={data.name} 
                onChange={(e) => updateData({ name: e.target.value })} 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Profession / Role</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Full Stack Developer" 
                value={data.role} 
                onChange={(e) => updateData({ role: e.target.value })} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Short Bio</label>
              <textarea 
                className="input-field" 
                rows={4} 
                style={{ resize: 'none' }}
                placeholder="I build scalable web applications..."
                value={data.bio}
                onChange={(e) => updateData({ bio: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="input-label">GitHub Username</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="username" 
                value={data.github}
                onChange={(e) => updateData({ github: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Link href="/" className="btn btn-secondary">Cancel</Link>
              <Link 
                href={userId ? "/wizard/step-profile" : "/signup"} 
                className="btn btn-gradient"
              >
                Next Step ➔
              </Link>
ew            </div>
          </div>
        </div>

        {/* Right Side: Live Preview Placeholder */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Live Preview</span>
          </div>
          
          <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '100px', height: '100px', background: 'var(--accent-purple)', filter: 'blur(60px)', opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '100px', height: '100px', background: 'var(--accent-blue)', filter: 'blur(60px)', opacity: 0.5 }}></div>
            
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>{data.name || "Name"}</h1>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }}>{data.role || "Role"}</h2>
              <p style={{ maxWidth: '300px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {data.bio || "Your bio will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
