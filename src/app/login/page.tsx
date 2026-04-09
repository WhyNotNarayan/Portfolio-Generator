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
      router.push("/wizard/step-profile");
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
              <input name="password" type="password" className="input-field" placeholder="••••••••" required />
            </div>

            {error && <p style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {loading ? "Logging in..." : "Log In ➔"}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Don't have an account? <Link href="/signup" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Create One</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
