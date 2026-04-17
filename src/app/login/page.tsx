"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions/login";
import { usePortfolioStore } from "@/lib/store";
import "../../app/globals.css";

export default function Login() {
  const router = useRouter();
  const setUser = usePortfolioStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.success && result.userId) {
      setUser(result.userId, result.userName);
      
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get("redirect") || "/wizard/step-profile";
      router.push(redirectPath);
    }
  };

  return (
    <>
      <header className="container nav-header">
        <Link href="/" className="logo cursor-pointer">
          Port<span className="text-gradient">Gen.</span>
        </Link>
      </header>

      <main className="container auth-container animate-fade-in">
        <div className="glass-card auth-box">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to access your portfolios and premium features.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input name="email" type="email" className="input-field" placeholder="hello@example.com" required />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="password-wrapper">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="input-field input-field-with-icon" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path><line x1="1" y1="1" x2="23" y2="23"></line><path d="M13.59 13.59a3 3 0 1 1-4.18-4.18"></path></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {loading ? "Logging in..." : "Log In ➔"}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Don't have an account? <span 
                onClick={() => router.push('/signup' + window.location.search)} 
                style={{ color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
              >
                Create One
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
