"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/actions/auth";
import { usePortfolioStore } from "@/lib/store";
import "../../app/globals.css";

export default function Signup() {
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
    const result = await signUpUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Success! Redirect to the specified step or profile image step
    if (result.success && result.userId) {
      setUser(result.userId, formData.get("name") as string);
      
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
          <h1 className="auth-title">Create an Account</h1>
          <p className="auth-subtitle">Save your portfolio progress and unlock premium features.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input name="name" type="text" className="input-field" placeholder="John Doe" required />
            </div>
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
              {loading ? "Creating Account..." : "Sign Up & Continue"}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Already have an account? <span 
                onClick={() => router.push('/login' + window.location.search)} 
                style={{ color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
