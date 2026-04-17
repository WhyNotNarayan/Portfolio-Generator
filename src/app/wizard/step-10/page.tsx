"use client";

import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import "../../../app/globals.css";

// Images from the research phase (Generated to match User Screenshots)
const premiumImages = [
  "/portfolio_style_editorial_1775292970146.png",
  "/portfolio_style_neon_tech_1775292993735.png",
  "/portfolio_style_gaming_retro_1775293013202.png",
  "/portfolio_style_vibrant_orange_1775293035596.png"
];

// 4 Free Layouts (Marked as standard/low-res style)
const freeLayouts = [
  { id: 'free-simple', name: "Portfolio Designer (Card 1)", desc: "Light Fashion Theme", img: "/simple-card-1.png", badge: "HD+" },
  { id: 'lay-2', name: "Emerald Sustainable (Card 2)", desc: "Light Eco Theme", img: "/simple-card-2.png", badge: "HD+" },
  { id: 'lay-3', name: "Cyber Pulse (Card 3)", desc: "Dark High-Tech Theme", img: "/simple-card-3.png", badge: "HD+" },
  { id: 'lay-4', name: "Crimson Obsidian (Card 4)", desc: "Brutalist Dark Theme", img: "/simple-card-4.png", badge: "HD+" }
];

// 4 Premium Layouts (₹90 each)
const premiumLayouts = [
  { id: 'premium-high-1', name: "Infinite Creative (Card 1)", desc: "Professional Slate & Teal Aesthetics", img: "/high-card-1.png", badge: "PREMIUM", price: 90 },
  { id: 'lay-prem-2', name: "Midnight Luxury (Card 2)", desc: "High-End Black & Gold Gold Design", img: "/high-card-2.png", badge: "PREMIUM", price: 90 },
  { id: 'lay-prem-3', name: "Dusk Vibrant (Card 3)", desc: "Sunset Orange & Dark Slate Design", img: "/high-card-3.png", badge: "PREMIUM", price: 90 },
  { id: 'lay-prem-4', name: "Obsidian Royalty (Card 4)", desc: "Deep Purple & Obsidian Elite Design", img: "/high-card-4.png", badge: "PREMIUM", price: 90 }
];

// 4 Elite 3D Layouts (₹130 each)
const eliteLayouts = [
  { id: 'lay-elite-1', name: "Cosmic Nebula (Card 1)", desc: "Immersive 3D Space & Interactive Particles", img: "/elite-card-1.png", badge: "3D ELITE", price: 130 },
  { id: 'lay-elite-2', name: "Golden Prestige (Card 2)", desc: "Moveable Luxury Orbs & Reactive Depth", img: "/elite-card-2.png", badge: "3D ELITE", price: 130 },
  { id: 'lay-elite-3', name: "Hyper-Realistic Galaxy (Card 3)", desc: "Spinning Spiral Core & Cinematic Meteors", img: "/elite-card-3.png", badge: "3D ELITE", price: 130 },
  { id: 'lay-elite-4', name: "Plasma Reactor (Card 4)", desc: "Hyper-Realistic 3D Energy Core & Plasma Arcs", img: "/elite-card-4.png", badge: "3D ELITE", price: 130 }
];

export default function WizardStep10() {
  const { data, updateData } = usePortfolioStore();
  const selectedLayoutId = data.selectedLayoutId;

  const setSelectedLayoutId = (id: string) => {
    updateData({ selectedLayoutId: id });
  };

  // Logic for final checkout
  const selectedPremium = premiumLayouts.find(p => p.id === selectedLayoutId);
  const selectedElite = eliteLayouts.find(e => e.id === selectedLayoutId);
  
  const layoutPrice = selectedPremium ? selectedPremium.price : (selectedElite ? selectedElite.price : 0);
  
  // Hardcoded for UI demonstration - in real app would sum from Step 9 state
  const previousFeaturesTotal = 0; 
  const grandTotal = previousFeaturesTotal + layoutPrice;

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </Link>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Final Step: Portfolio Selection
        </div>
      </header>

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '12rem' }}>
        
        <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Final Step: Pick your Skin.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            We've built your portfolio structure. Now, choose the visual layer. Select from our free tiers or upgrade to premium 3D experiences.
          </p>
        </div>

        {/* Free Layouts Section */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
            Standard Tier (Free)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {freeLayouts.map(layout => (
              <div 
                key={layout.id}
                onClick={() => setSelectedLayoutId(layout.id)}
                style={{
                  cursor: 'pointer', borderRadius: '1.5rem', padding: '0.8rem', transition: 'all 0.3s transform',
                  border: selectedLayoutId === layout.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
                  background: 'var(--card-bg)', overflow: 'hidden'
                }}
                className={selectedLayoutId === layout.id ? 'active-card' : ''}
              >
                <div style={{ height: '180px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem', position: 'relative', filter: layout.id === 'free-simple' ? 'none' : 'grayscale(0.6)' }}>
                  <img src={layout.img} alt={layout.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: layout.id === 'free-simple' ? '#6366f1' : 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, color: '#fff' }}>{layout.badge}</div>
                </div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', padding: '0 0.5rem' }}>{layout.name}</h4>
                <p style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.5rem' }}>Included (Free)</p>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Layouts Section */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6366f1' }}></span>
            Premium Tiers (₹90)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {premiumLayouts.map(layout => (
              <div 
                key={layout.id}
                onClick={() => setSelectedLayoutId(layout.id)}
                style={{
                  cursor: 'pointer', borderRadius: '1.5rem', padding: '0.8rem', transition: 'all 0.3s transform',
                  border: selectedLayoutId === layout.id ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.05)',
                  background: selectedLayoutId === layout.id ? 'rgba(99, 102, 241, 0.05)' : 'var(--card-bg)',
                  boxShadow: selectedLayoutId === layout.id ? '0 10px 30px rgba(99, 102, 241, 0.15)' : 'none'
                }}
              >
                <div style={{ height: '200px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                  <img src={layout.img} alt={layout.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#6366f1', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 800, color: '#fff' }}>
                    {layout.badge}
                  </div>
                </div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', padding: '0 0.5rem' }}>{layout.name}</h4>
                <p style={{ color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.5rem' }}>₹{layout.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Elite 3D Layouts Section */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 15px #10b981' }}></span>
            Elite 3D Space Tiers (₹130)
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '800px' }}>
            The ultimate experience. Full WebGL-powered 3D environments, spatial audio ready, and immersive background physics.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {eliteLayouts.map(layout => (
              <div 
                key={layout.id}
                onClick={() => setSelectedLayoutId(layout.id)}
                style={{
                  cursor: 'pointer', borderRadius: '1.5rem', padding: '0.8rem', transition: 'all 0.3s transform',
                  border: selectedLayoutId === layout.id ? '2px solid #10b981' : '2px solid rgba(16, 185, 129, 0.1)',
                  background: selectedLayoutId === layout.id ? 'rgba(16, 185, 129, 0.05)' : 'var(--card-bg)',
                  boxShadow: selectedLayoutId === layout.id ? '0 10px 40px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                <div style={{ height: '220px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                  <img src={layout.img} alt={layout.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 800, color: '#fff' }}>
                    {layout.badge}
                  </div>
                </div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', padding: '0 0.5rem' }}>{layout.name}</h4>
                <p style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, padding: '0.2rem 0.5rem' }}>₹{layout.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Universal Checkout Sticky Footer */}
        <div style={{ 
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          width: '90%', maxWidth: '1200px', background: 'rgba(10, 10, 15, 0.95)', 
          backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.15)',
          padding: '1.5rem 2.5rem', borderRadius: '1.5rem', display: 'flex', 
          justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)', zIndex: 100
        }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Final Portfolio Price</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
              ₹{grandTotal}
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginLeft: '0.86rem', fontWeight: 400 }}>
                (${((grandTotal) / 83).toFixed(2)})
              </span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/wizard/step-8" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>← Back</Link>
            
            {grandTotal === 0 ? (
              <Link href="/wizard/finish" className="btn btn-gradient" style={{ padding: '1rem 3rem' }}>
                Generate Portfolio ✨
              </Link>
            ) : (
              <Link 
                href="/wizard/finish"
                className="btn btn-gradient" 
                style={{ padding: '1rem 3rem', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
              >
                Unlock Premium & Generate ➔
              </Link>
            )}
          </div>
        </div>

      </main>
    </>
  );
}
