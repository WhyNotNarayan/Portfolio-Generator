"use client";

import { useState } from "react";
import Link from "next/link";
import "../globals.css";

export default function CustomDesign() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const requirements = formData.get("requirements") as string;

    // Construct the WhatsApp Message
    const message = `*Custom Build Request*%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Email:* ${email}%0A` +
      `*Phone:* ${phone}%0A%0A` +
      `*Requirements:*%0A${requirements}`;

    const whatsappNumber = "918975347452";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <header className="container nav-header">
        <Link href="/" className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </Link>
        <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Back to Home</Link>
      </header>

      <main className="container auth-container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
        <div className="glass-card auth-box" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 0.8rem', background: 'rgba(147, 51, 234, 0.1)', color: 'var(--accent-purple)', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', border: '1px solid rgba(147, 51, 234, 0.2)' }}>
            💎 Premium Service
          </div>
          <h1 className="auth-title">Request Custom Build</h1>
          <p className="auth-subtitle">
            Have a unique Figma design or a special vision? Our elite developers will build your bespoke portfolio from scratch.
          </p>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Your Name</label>
                <input name="name" type="text" className="input-field" placeholder="John Doe" required />
              </div>
              <div className="input-group">
                <label className="input-label">Mobile Number</label>
                <input name="phone" type="tel" className="input-field" placeholder="+91 00000 00000" required />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input name="email" type="email" className="input-field" placeholder="john@example.com" required />
            </div>

            <div className="input-group">
              <label className="input-label">Project Requirements (Figma URL, Special Features, etc.)</label>
              <textarea 
                name="requirements" 
                className="input-field" 
                rows={6} 
                style={{ resize: 'none' }}
                placeholder="Ex: I want a 3D horizontal scrolling portfolio with my Figma design..."
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-gradient" style={{ width: '100%', marginTop: '1rem', padding: '1.2rem' }}>
              {loading ? "Preparing WhatsApp..." : "Send Request & Chat on WhatsApp ➔"}
            </button>
            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Clicking the button will open WhatsApp with your details.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
