import React from 'react';
import { PortfolioData } from '@/lib/store';

interface TemplateProps {
  data: PortfolioData;
}

const Card2: React.FC<TemplateProps> = ({ data }) => {
  // Mapping categories for technical skillset
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

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    );
    if (p.includes('linkedin')) return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    );
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    );
  };

  return (
    <div style={{ background: '#f0fdf4', color: '#064e3b', minHeight: '100vh', fontFamily: "'Inter', sans-serif", scrollBehavior: 'smooth' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
        
        .animate-section { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        .premium-card { background: #ffffff; border: 1px solid #d1fae5; border-radius: 32px; transition: all 0.4s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .premium-card:hover { transform: translateY(-12px); border-color: #10b981; box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.1); }
        
        .gradient-text { background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-premium { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; padding: 1rem 2.5rem; border-radius: 99px; font-weight: 700; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-premium:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }

        .logo-box { width: 45px; height: 45px; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); border-radius: 14px; display: flex; alignItems: center; justifyContent: center; color: #fff; fontSize: 1.8rem; fontWeight: 900; }
      `}} />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4da', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #d1fae5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="logo-box" style={{ 
            width: '45px', height: '45px', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
            borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem', fontWeight: 900 
          }}> {data.name?.charAt(0)} </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 950 }}>{data.name?.split(' ')[0]}<span style={{ color: '#10b981' }}>.</span></div>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#services" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>Services</a>
          <a href="#works" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>Work</a>
          <a href="#expertise" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>Expertise</a>
          <a href="#journey" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>Experience</a>
          <a href="#certifications" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>Certifications</a>
          <a href="#contact" className="btn-premium" style={{ padding: '0.6rem 1.4rem' }}>Let's Work</a>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ padding: '8rem 6%', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '6rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px' }} className="animate-section">
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1.2rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', display: 'inline-block' }}>Green Wave Edition</div>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 0.95, marginBottom: '2.5rem' }}>Building <span className="gradient-text">Sustainable</span> Future.</h1>
          <p style={{ fontSize: '1.3rem', color: '#065f46', marginBottom: '3.5rem' }}>I am {data.name}, {data.role}. {data.bio}</p>
          <button className="btn-premium">Contact Me Now</button>
        </div>
        {data.profileImage && <img src={data.profileImage} style={{ width: '480px', height: '620px', borderRadius: '40px', objectFit: 'cover', border: '12px solid #fff' }} />}
      </header>

      {/* Services */}
      <section id="services" style={{ padding: '8rem 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem' }}>Services</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {data.services?.map((s, i) => (
              <div key={i} className="premium-card" style={{ padding: '4rem 3rem', background: '#f0fdf4' }}>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{s}</h4>
                <p style={{ marginTop: '1rem', opacity: 0.8 }}>Professional {s} services.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" style={{ padding: '8rem 6%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '5rem' }}>Works</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {data.projects?.map((p, i) => (
              <div key={i} className="premium-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', marginBottom: '1.5rem' }}>{p.title}</h4>
                <p style={{ marginBottom: 'auto' }}>{p.desc}</p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {p.tech?.split(',').map(t => <span key={t} style={{ background: '#10b981', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" style={{ padding: '8rem 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '5rem' }}>Expertise</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {categorizedSkills.map((c, i) => (
              <div key={i} className="premium-card" style={{ padding: '2.5rem', borderLeft: '6px solid #10b981' }}>
                <h4>{c.category}</h4>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {c.skills.map(s => <span key={s} style={{ background: '#f0fdf4', border: '1px solid #d1fae5', padding: '0.4rem 0.8rem', borderRadius: '12px' }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" style={{ padding: '8rem 6%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '6rem' }}>Journey</h3>
          <div style={{ position: 'absolute', left: '20px', top: '15rem', bottom: '0', width: '2px', background: '#10b981', opacity: 0.2 }}></div>
          {data.experience?.map((e, i) => (
            <div key={i} className="premium-card" style={{ padding: '2.5rem', marginLeft: '60px', marginBottom: '3rem' }}>
              <div style={{ color: '#10b981', fontWeight: 900 }}>{e.duration}</div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: 900 }}>{e.role}</h4>
              <p style={{ color: '#10b981', fontWeight: 700 }}>{e.company}</p>
              <p style={{ marginTop: '1rem' }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certification Section */}
      {data.certificates?.length > 0 && (
        <section id="certifications" style={{ padding: '8rem 6%', background: '#fff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem' }}>Global Certifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
              {data.certificates.map((cert, i) => (
                <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="premium-card" style={{ padding: '3.5rem', textDecoration: 'none', background: '#f0fdf4' }}>
                  <h4 style={{ fontSize: '1.4rem', color: '#064e3b', fontWeight: 900, marginBottom: '1rem' }}>{cert.name}</h4>
                  <p style={{ color: '#10b981', fontWeight: 800, fontSize: '0.95rem' }}>{cert.issuer}</p>
                  <p style={{ color: '#059669', fontSize: '0.85rem', marginTop: '2rem' }}>Verified Credential ➔</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding: '10rem 6% 4rem', background: '#064e3b', color: '#fff', textAlign: 'center' }}>
        <h3 style={{ fontSize: '4rem', fontWeight: 900 }}>Let's Build.</h3>
        <p style={{ color: '#6ee7b7', margin: '2rem 0 4rem', fontSize: '1.4rem' }}>{data.email}</p>
        <button className="btn-premium" style={{ background: '#fff', color: '#064e3b' }}>Say Hello</button>
      </footer>
    </div>
  );
};

export default Card2;
