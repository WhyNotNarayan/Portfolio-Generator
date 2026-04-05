"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

export default function WizardStep5() {
  const { data, updateData } = usePortfolioStore();
  const [selected, setSelected] = useState<string[]>(data.skills || []);
  const [customSkill, setCustomSkill] = useState("");
  const router = useRouter();

  const handleNext = () => {
    updateData({ skills: selected });
    router.push("/wizard/step-6");
  };

  // Track dynamically added skills that don't fit the default lists
  const [addedCustoms, setAddedCustoms] = useState<string[]>([]);

  const skillCategories = {
    "Languages": ["JavaScript", "TypeScript", "Python", "Go", "Java", "C++", "Ruby", "PHP"],
    "Frontend": ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Framer Motion"],
    "Backend": ["Node.js", "Express", "Django", "Spring Boot", "Laravel", "NestJS"],
    "Cybersecurity": ["Pen Testing", "Network Security", "Cryptography", "Risk Auth"],
    "Tools": ["Git", "Docker", "Kubernetes", "AWS", "Figma", "Postman"],
    "Specialized": ["Machine Learning", "Blockchain / Web3", "SEO", "System Design"]
  };

  const toggle = (skill: string) => {
    setSelected(selected.includes(skill) ? selected.filter(s => s !== skill) : [...selected, skill]);
  };

  const handleAddCustom = () => {
    const skill = customSkill.trim();
    if (skill && !selected.includes(skill)) {
      setSelected([...selected, skill]);
      if (!addedCustoms.includes(skill)) {
        setAddedCustoms([...addedCustoms, skill]);
      }
      setCustomSkill("");
    }
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Step 5 of 8: Skills & Expertise</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Select your weapons.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Click on the technologies you excel at to add them to your portfolio.</p>

          <div className="glass-card">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category} style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>{category}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.map(skill => {
                    const isActive = selected.includes(skill);
                    return (
                      <button 
                        key={skill} onClick={() => toggle(skill)}
                        style={{ 
                          padding: '0.5rem 1rem', borderRadius: '99px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem',
                          background: isActive ? 'var(--text-main)' : 'transparent',
                          color: isActive ? 'var(--bg-color)' : 'var(--text-muted)',
                          border: isActive ? '1px solid var(--text-main)' : '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {isActive ? `✓ ${skill}` : `+ ${skill}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Custom Skills Section */}
            <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Custom Specific Skills</h4>
               
               <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="E.g. SvelteKit, Rust, Unreal Engine" 
                    value={customSkill} 
                    onChange={e => setCustomSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddCustom()}
                  />
                  <button 
                    onClick={handleAddCustom}
                    className="btn btn-secondary" 
                    style={{ whiteSpace: 'nowrap', padding: '0 1rem' }}
                  >
                    + Add Skill
                  </button>
               </div>

               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {addedCustoms.map(skill => {
                    const isActive = selected.includes(skill);
                    if (!isActive) return null; // If they untoggled it, we hide it or let them toggle it back? Let's treat it as a normal button
                    return (
                      <button 
                        key={skill} onClick={() => toggle(skill)}
                        style={{ 
                          padding: '0.5rem 1rem', borderRadius: '99px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem',
                          background: 'var(--accent-blue)',
                          color: '#fff',
                          border: '1px solid var(--accent-blue)'
                        }}
                        title="Click to remove"
                      >
                        ✓ {skill}
                      </button>
                    );
                  })}
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Link href="/wizard/step-4" className="btn btn-secondary">← Back</Link>
              <button 
                onClick={handleNext}
                className="btn btn-gradient"
              >
                Next: Experience ➔
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 400px' }} className="animate-fade-in">
          <div style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '1rem', display: 'inline-block' }}>Live Preview</div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>My Toolkit</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {selected.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Any selected skills will appear here...</span>}
              {selected.map(s => (
                <span key={`preview-${s}`} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--accent-purple)' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
