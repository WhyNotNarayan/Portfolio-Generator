"use client";

import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import "../app/globals.css";

export default function Home() {
  const { userId, userName, reset } = usePortfolioStore();

  return (
    <>
      <header className="container nav-header">
        <div className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/templates" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Templates</Link>
          <Link href="/custom-design" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Custom Design</Link>
          
          {userId ? (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hi, {userName || 'User'}</span>
              <button onClick={() => reset()} className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem' }}>
                Log In
              </Link>
              <Link href="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="container hero-section animate-fade-in">
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          ✨ Platform v2.0 is now live
        </div>
        <h1 className="title-hero">
          Generate an elite portfolio <br />
          <span className="text-gradient">in under 5 minutes.</span>
        </h1>
        <p className="subtitle">
          Don't waste weekends building your portfolio from scratch. Input your professional details, connect your GitHub, and watch the magic happen.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link href="/wizard" className="btn btn-gradient animate-float" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            {userId ? "Build Your Portfolio" : "Generate Portfolio Now"}
          </Link>
          <Link href="/custom-design" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Request Custom Build
          </Link>
        </div>

        <div style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>⚡ Instant Creation</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Our multi-step wizard asks the right questions. We automatically compile your GitHub projects, bio, and resume into a stunning format.</p>
          </div>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>🎨 Premium Templates</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Choose from dozens of high-conversion templates. Dark mode, 3D elements, and smooth interactions—all built-in.</p>
          </div>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>💎 Bespoke Agency</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Have a specific Figma design? Request a custom portfolio quoting our specialized developers directly via our custom pipeline.</p>
          </div>
        </div>
      </main>
    </>
  );
}
