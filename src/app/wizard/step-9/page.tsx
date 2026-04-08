"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

type Feature = {
  id: string;
  name: string;
  desc: string;
  price: number; // Stored in INR
  isFree?: boolean;
  hasOptions?: boolean;
};

export default function WizardStep9() {
  const { data, updateData } = usePortfolioStore();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(data.selectedFeatures.length > 0 ? data.selectedFeatures : ['f1', 'f2']);
  const [selected3DStyle, setSelected3DStyle] = useState<string | null>(data.selected3DStyle);
  const [selectedThemeBtnStyle, setSelectedThemeBtnStyle] = useState<string | null>(data.selectedThemeStyle);
  const router = useRouter();

  const handleNext = () => {
    updateData({ 
      selectedFeatures, 
      selected3DStyle, 
      selectedThemeStyle: selectedThemeBtnStyle 
    });
    router.push("/wizard/step-10");
  };

  // Unified State for Modals
  const [activeModal, setActiveModal] = useState<'f3' | 'f5' | null>(null);

  const features: Feature[] = [
    { id: 'f1', name: "Standard Responsive Layout", desc: "Mobile, Tablet, and Desktop optimized.", price: 0, isFree: true },
    { id: 'f2', name: "Basic Button Animations", desc: "Clean CSS hover states and subtle fade-ins.", price: 0, isFree: true },
    { id: 'f3', name: "Dark / Light Mode Toggle", desc: "Let visitors switch viewing modes instantly.", price: 29, hasOptions: true },
    { id: 'f4', name: "Framer Motion Scroll", desc: "Complex bouncy physics & triggers.", price: 49 },
    { id: 'f5', name: "Interactive 3D Library", desc: "Add deep immersive WebGL shapes.", price: 69, hasOptions: true },
    { id: 'f6', name: "Live GitHub Auto-Sync", desc: "Projects update hands-free on GitHub push.", price: 59 },
    { id: 'f7', name: "Google Analytics Dashboard", desc: "Track visitor count and clicks.", price: 39 },
  ];

  const threeDimensionalOptions = [
    { id: '3d-1', name: 'Floating Particles', img: '✨', anim: 'animate-float' },
    { id: '3d-2', name: 'Spinning Prism', img: '🧊', anim: 'animate-spin-slow' },
    { id: '3d-3', name: 'Cyberpunk Grid', img: '🌐', anim: 'animate-pulse' },
    { id: '3d-4', name: 'Liquid Waves', img: '🌊', anim: 'animate-wave' },
    { id: '3d-5', name: 'Galaxy Matrix', img: '🌌', anim: 'animate-twinkle' },
    { id: '3d-6', name: 'Holographic Globe', img: '🌍', anim: 'animate-spin-slow' },
    { id: '3d-7', name: 'Neon Wireframe', img: '🏙️', anim: 'animate-float' },
    { id: '3d-8', name: 'Glass Cubes', img: '🧩', anim: 'animate-float-delayed' },
    { id: '3d-9', name: 'Dark Matter Swarm', img: '🦇', anim: 'animate-wave' },
    { id: '3d-10', name: 'ASCII Art Shift', img: '👾', anim: 'animate-pulse' }
  ];

  const themeButtonOptions = [
    { id: 'tb-1', name: 'Classic Pill Switch', visual: <div style={{width:'50px', height:'26px', background:'var(--card-border)', borderRadius:'50px', position:'relative'}}><div style={{width:'20px',height:'20px',background:'#fff',borderRadius:'50%',position:'absolute',top:'3px',left:'3px'}}></div></div> },
    { id: 'tb-2', name: 'Apple iOS Style', visual: <div style={{width:'50px', height:'30px', background:'#22c55e', borderRadius:'50px', position:'relative'}}><div style={{width:'26px',height:'26px',background:'#fff',borderRadius:'50%',position:'absolute',top:'2px',right:'2px'}}></div></div> },
    { id: 'tb-3', name: 'Sun to Moon Morph', visual: <div style={{fontSize:'1.8rem'}}>🌗</div> },
    { id: 'tb-4', name: 'Cyberpunk Neon Hex', visual: <div style={{width:'40px', height:'40px', border:'2px solid #0ff', color:'#0ff', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'6px', background:'rgba(0,255,255,0.1)'}}>☼</div> },
    { id: 'tb-5', name: 'Minimalist Dot', visual: <div style={{width:'15px', height:'15px', borderRadius:'50%', background:'var(--text-main)', border:'2px solid var(--text-muted)'}}></div> },
    { id: 'tb-6', name: 'Glassmorphism Drop', visual: <div style={{width:'45px', height:'45px', borderRadius:'15px', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(5px)', border:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem'}}>☀</div> },
    { id: 'tb-7', name: 'Slider Text', visual: <div style={{display:'flex', width:'80px', background:'var(--card-border)', borderRadius:'4px', overflow:'hidden', fontSize:'0.75rem', fontWeight:'bold'}}><div style={{background:'var(--accent-blue)', color:'#fff', padding:'5px', flex:1, textAlign:'center'}}>L</div><div style={{color:'var(--text-muted)', padding:'5px', flex:1, textAlign:'center'}}>D</div></div> },
    { id: 'tb-8', name: 'Bouncing Bulb', visual: <div className="animate-float" style={{fontSize:'1.8rem'}}>💡</div> }
  ];

  const handleToggle = (id: string, hasOptions: boolean | undefined) => {
    // Check if the feature requires a modal
    if (hasOptions && !selectedFeatures.includes(id)) {
      setActiveModal(id as 'f3' | 'f5');
      return; 
    }

    // Standard unchecking behavior
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
      if (id === 'f5') setSelected3DStyle(null); 
      if (id === 'f3') setSelectedThemeBtnStyle(null);
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const confirmSelection = (styleName: string, featureId: string) => {
    if (featureId === 'f5') setSelected3DStyle(styleName);
    if (featureId === 'f3') setSelectedThemeBtnStyle(styleName);
    
    if (!selectedFeatures.includes(featureId)) {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
    setActiveModal(null);
  };

  const currentTotal = features
    .filter(f => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.price, 0);

  const formatPrice = (priceRs: number) => {
    if (priceRs === 0) return "Included (Free)";
    const dollar = (priceRs / 83).toFixed(2);
    return `+₹${priceRs} ($${dollar})`;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes wave { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(10deg); } }
        @keyframes twinkle { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; display: inline-block; }
        .animate-wave { animation: wave 3s ease-in-out infinite; display: inline-block; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; display: inline-block; }
        .animate-float-delayed { animation: float 6s ease-in-out 1s infinite; display: inline-block; }
      `}} />

      <header className="container nav-header">
        <Link href="/" className="logo">Port<span className="text-gradient">Gen.</span></Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Final Step: Feature Upgrades</div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', position: 'relative' }}>
        
        {/* Universal Option Picker Modal */}
        {activeModal !== null && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '900px', padding: '3rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
              <button 
                onClick={() => setActiveModal(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%' }}
              >✕</button>
              
              {activeModal === 'f5' && (
                <>
                  <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Choose your 3D Asset</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Click on a Live Preview animation below to select it for your portfolio.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                    {threeDimensionalOptions.map(opt => (
                      <div 
                        key={opt.id} 
                        onClick={() => confirmSelection(opt.name, 'f5')}
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                      >
                        <div className={opt.anim} style={{ fontSize: '3rem' }}>{opt.img}</div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-main)' }}>{opt.name}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeModal === 'f3' && (
                <>
                  <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Choose your Theme Toggle Design</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Select the visual style of the button that switches between light and dark mode.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {themeButtonOptions.map(opt => (
                      <div 
                        key={opt.id} 
                        onClick={() => confirmSelection(opt.name, 'f3')}
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                      >
                        {/* Live CSS rendering of the Button Shape */}
                        <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {opt.visual}
                        </div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-main)' }}>{opt.name}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Supercharge your portfolio.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            We've mapped out special premium upgrades for India below ₹70! Unselected features beautifully fall back to standard code.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {features.map(feature => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <div 
                key={feature.id} 
                className="glass-card" 
                onClick={() => handleToggle(feature.id, feature.hasOptions)}
                style={{ 
                  cursor: 'pointer', position: 'relative',
                  border: isSelected ? '1px solid var(--accent-blue)' : '1px solid rgba(255,255,255,0.08)',
                  background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'var(--card-bg)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: isSelected ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {feature.name}
                    </h3>
                    <div style={{ 
                      width: '24px', height: '24px', borderRadius: '50%', 
                      border: isSelected ? 'none' : '2px solid rgba(255,255,255,0.2)',
                      background: isSelected ? 'var(--accent-blue)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold'
                    }}>
                      {isSelected && '✓'}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {feature.desc}
                  </p>

                  {/* Dynamic CTA for options */}
                  {feature.hasOptions && !isSelected && (
                    <div className="animate-pulse" style={{ marginTop: '1rem', display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                      👆 Click to browse designs!
                    </div>
                  )}
                  
                  {/* Dynamic Selection Displays */}
                  {isSelected && feature.id === 'f5' && selected3DStyle && (
                    <div style={{ marginTop: '1rem', background: 'rgba(147, 51, 234, 0.2)', color: 'var(--accent-purple)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', display: 'inline-block' }}>
                      Selected 3D: {selected3DStyle}
                    </div>
                  )}
                  
                  {isSelected && feature.id === 'f3' && selectedThemeBtnStyle && (
                    <div style={{ marginTop: '1rem', background: 'rgba(59, 130, 246, 0.2)', color: '#38bdf8', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', display: 'inline-block' }}>
                      Style: {selectedThemeBtnStyle}
                    </div>
                  )}
                </div>
                
                <div style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 600, color: feature.isFree ? '#22c55e' : 'var(--accent-purple)' }}>
                  {formatPrice(feature.price)}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Link href="/wizard/step-8" className="btn btn-secondary">← Back</Link>
          <button 
            onClick={handleNext}
            className="btn btn-gradient"
          >
            Next: Layout Themes ➔
          </button>
        </div>

      </main>
    </>
  );
}
