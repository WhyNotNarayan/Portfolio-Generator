"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardProfileImage() {
  const { data, updateData } = usePortfolioStore();
  const [preview, setPreview] = useState<string | null>(data.profileImage);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        updateData({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    router.push("/wizard/step-3");
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Step 2 of 11: Profile Picture
        </div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem' }}>
        {/* Left Side: The Wizard Form */}
        <div style={{ flex: 1 }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Show your face.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            A professional profile picture builds trust instantly. Upload a high-quality headshot to be featured on your landing page.
          </p>

          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div 
              style={{ 
                width: '180px', height: '180px', borderRadius: '50%', margin: '0 auto 2rem',
                border: '2px dashed rgba(255,255,255,0.2)', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)', position: 'relative'
              }}
            >
              {preview ? (
                <img src={preview} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>👤</span>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
              />
            </div>

            <div className="input-group">
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => document.getElementById('profile-upload')?.click()} 
                  className="btn btn-gradient"
                >
                  Choose Photo
                </button>
              </div>
            </div>

            <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Professional Resume (Optional)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                High-Tier templates include a one-click download for your resume.
              </p>
              
              <input 
                type="file" 
                id="resume-upload" 
                hidden 
                accept=".pdf,.doc,.docx,image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateData({ resumeUrl: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              
              <div 
                onClick={() => document.getElementById('resume-upload')?.click()}
                style={{ 
                  padding: '1.5rem', background: data.resumeUrl ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)', 
                  border: data.resumeUrl ? '2px solid #22c55e' : '2px dashed rgba(255,255,255,0.2)',
                  borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                {data.resumeUrl ? (
                  <div style={{ color: '#22c55e', fontWeight: 700 }}>✓ Resume Uploaded Successfully</div>
                ) : (
                  <div style={{ color: 'var(--text-muted)' }}>Click to Upload Resume (.pdf, .doc)</div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Link href="/signup" className="btn btn-secondary">← Back</Link>
              <button onClick={handleNext} className="btn btn-gradient">Next: About & Services ➔</button>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Live Preview</span>
            <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>Real-time Render</span>
          </div>
          
          <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '100px', height: '100px', background: 'var(--accent-purple)', filter: 'blur(60px)', opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '100px', height: '100px', background: 'var(--accent-blue)', filter: 'blur(60px)', opacity: 0.5 }}></div>
            
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              <div 
                style={{ 
                  width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem',
                  border: '4px solid var(--accent-blue)', overflow: 'hidden'
                }}
              >
                {preview ? (
                  <img src={preview} alt="Hero Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ background: '#333', width: '100%', height: '100%' }}></div>
                )}
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Aniket</h1>
              <h2 style={{ fontSize: '1rem', color: 'var(--accent-blue)', marginBottom: '1rem' }}>Full Stack Developer</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
