import React from 'react';
import { PortfolioData } from '@/lib/store';

interface TemplateProps {
  data: PortfolioData;
}

const Card4: React.FC<TemplateProps> = ({ data }) => {
  const skillCategories: Record<string, string[]> = {
    "Languages": ["JavaScript", "TypeScript", "Python", "Go", "Java", "C++", "Ruby", "PHP"],
    "Frontend": ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Framer Motion"],
    "Backend": ["Node.js", "Express", "Django", "Spring Boot", "Laravel", "NestJS"],
    "Cybersecurity": ["Pen Testing", "Network Security", "Cryptography", "Risk Auth"],
    "Tools": ["Git", "Docker", "Kubernetes", "AWS", "Figma", "Postman"],
    "Specialized": ["Machine Learning", "Blockchain / Web3", "SEO", "System Design"]
  };

  const categorizedSkills = Object.entries(skillCategories)
    .map(([category, list]) => ({
      category,
      skills: data.skills?.filter(s => list.includes(s)) || []
    }))
    .filter(item => item.skills.length > 0);

  const uncategorizedSkills = data.skills?.filter(s =>
    !Object.values(skillCategories).flat().includes(s)
  ) || [];

  if (uncategorizedSkills.length > 0) {
    categorizedSkills.push({ category: "Other Skills", skills: uncategorizedSkills });
  }

  return (
    <div style={{ background: '#000000', color: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif", scrollBehavior: 'smooth' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
        
        .animate-section { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        .premium-card { background: #111111; border: 1px solid #1a1a1a; border-radius: 32px; transition: all 0.4s; }
        .premium-card:hover { transform: translateY(-12px); border-color: #ef4444; box-shadow: 0 0 40px rgba(239, 68, 68, 0.2); }
        
        .gradient-text { background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-premium { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #fff; padding: 1.2rem 3rem; border-radius: 99px; font-weight: 800; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-premium:hover { transform: scale(1.05); box-shadow: 0 15px 30px rgba(239, 68, 68, 0.4); }

        .logo-box { width: 45px; height: 45px; background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%); border-radius: 14px; display: flex; alignItems: center; justifyContent: center; color: #fff; fontSize: 1.8rem; fontWeight: 950; }
      `}} />

      {/* Navigation */}
      <nav style={{ padding: '2rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000da', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }}>
          <div className="logo-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {data.name?.charAt(0)} </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#fff' }}>{data.name?.split(' ')[0]}<span style={{ color: '#ef4444' }}>.</span></div>
        </div>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <a href="#services" style={{ color: '#fff', opacity: 0.6, fontWeight: 700, textDecoration: 'none' }}>Services</a>
          <a href="#works" style={{ color: '#fff', opacity: 0.6, fontWeight: 700, textDecoration: 'none' }}>Work</a>
          <a href="#contact" className="btn-premium" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>Start Project</a>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ padding: '12rem 6%', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '8rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px' }} className="animate-section">
          <div style={{ background: '#ef4444', color: '#fff', padding: '0.4rem 1.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem', display: 'inline-block' }}>Obsidian Crimson Tier</div>
          <h1 style={{ fontSize: '6rem', fontWeight: 900, lineHeight: 0.85, marginBottom: '3rem', letterSpacing: '-0.04em' }}>Boldly <span className="gradient-text">Different.</span></h1>
          <p style={{ fontSize: '1.4rem', color: '#888', marginBottom: '4rem', maxWidth: '550px' }}>I am {data.name}, {data.role}. {data.bio}</p>
          <button className="btn-premium">Hire Me Immediately</button>
        </div>
        {data.profileImage && <img src={data.profileImage} style={{ width: '450px', height: '620px', borderRadius: '0px', objectFit: 'cover', border: '1px solid #333' }} />}
      </header>

      {/* Services */}
      <section id="services" style={{ padding: '10rem 6%', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '5rem' }}>Services</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            {data.services?.map((s, i) => (
              <div key={i} className="premium-card" style={{ padding: '5rem 4rem' }}>
                <h4 style={{ fontSize: '2.2rem', fontWeight: 950 }}>{s}</h4>
                <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '1.1rem' }}>Premium execution in {s}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" style={{ padding: '10rem 6%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '6rem' }}>Selected Projects</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
            {data.projects?.map((p, i) => (
              <div key={i} className="premium-card" style={{ padding: '4rem 3rem', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
                <h4 style={{ fontSize: '2.4rem', fontWeight: 950, color: '#ef4444', marginBottom: '2rem' }}>{p.title}</h4>
                <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: 'auto' }}>{p.desc}</p>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {p.tech?.split(',').map(t => <span key={t} style={{ background: '#333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section style={{ padding: '10rem 6%', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '6rem' }}>Skill Inventory</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {categorizedSkills.map((c, i) => (
              <div key={i} className="premium-card" style={{ padding: '3rem' }}>
                <h4 style={{ color: '#ef4444', fontWeight: 900 }}>{c.category}</h4>
                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {c.skills.map(s => <span key={s} style={{ background: '#000', border: '1px solid #333', padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" style={{ padding: '10rem 6%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <h3 style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '8rem' }}>The Path</h3>
          {data.experience?.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '0 0 200px', color: '#ef4444', fontSize: '1.2rem', fontWeight: 950 }}>{e.duration}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.5rem' }}>{e.role}</h4>
                <p style={{ color: '#ef4444', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>{e.company}</p>
                <p style={{ color: '#777', fontSize: '1.2rem', lineHeight: 1.8 }}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '15rem 6% 6rem', background: '#000', color: '#fff', textAlign: 'center' }}>
        <h3 style={{ fontSize: '6rem', fontWeight: 950, color: '#ef4444', letterSpacing: '-0.06em' }}>DOMINATE.</h3>
        <p style={{ color: '#444', margin: '3rem 0 6rem', fontSize: '1.5rem', fontWeight: 700 }}>{data.email}</p>
        <button className="btn-premium" style={{ width: '100%', maxWidth: '1000px' }}>Contact For Elite Collaboration</button>
      </footer>
    </div>
  );
};

export default Card4;
