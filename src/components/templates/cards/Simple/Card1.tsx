import React from 'react';
import { PortfolioData } from '@/lib/store';

interface TemplateProps {
  data: PortfolioData;
}

const Card1: React.FC<TemplateProps> = ({ data }) => {
  // Mapping categories for technical skillset
  const skillCategories: Record<string, string[]> = {
    "Languages": ["JavaScript", "TypeScript", "Python", "Go", "Java", "C++", "Ruby", "PHP"],
    "Frontend": ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Framer Motion"],
    "Backend": ["Node.js", "Express", "Django", "Spring Boot", "Laravel", "NestJS"],
    "Cybersecurity": ["Pen Testing", "Network Security", "Cryptography", "Risk Auth"],
    "Tools": ["Git", "Docker", "Kubernetes", "AWS", "Figma", "Postman"],
    "Specialized": ["Machine Learning", "Blockchain / Web3", "SEO", "System Design"]
  };

  // Group user's skills into categories
  const categorizedSkills = Object.entries(skillCategories)
    .map(([category, list]) => ({
      category,
      skills: data.skills?.filter(s => list.includes(s)) || []
    }))
    .filter(item => item.skills.length > 0);

  // Remaining skills that didn't fit into a specific category
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
    if (p.includes('instagram')) return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    );
    if (p.includes('twitter') || p === 'x') return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
    );
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    );
  };

  return (
    <div className="portfolio-premium-design" style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      minHeight: '100vh',
      background: '#f8fafc',
      color: '#0f172a',
      scrollBehavior: 'smooth'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
        
        @keyframes subtleFloat { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        .animate-section { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        
        .premium-card { background: #ffffff; border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 32px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .premium-card:hover { transform: translateY(-12px); border-color: #3d7b7f; box-shadow: 0 25px 50px -12px rgba(61, 123, 127, 0.15); }
        
        .nav-link { color: #64748b; font-weight: 600; text-decoration: none; position: relative; padding-bottom: 4px; transition: color 0.3s; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #6366f1; transition: width 0.3s; }
        .nav-link:hover { color: #6366f1; }
        .nav-link:hover::after { width: 100%; }
        
        .social-hero-link { display: inline-flex; align-items: center; gap: 0.6rem; color: #64748b; font-weight: 700; text-decoration: none; transition: all 0.3s; }
        .social-hero-link:hover { color: #6366f1; transform: translateY(-2px); }

        .gradient-text { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-premium { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #fff; padding: 1rem 2.5rem; border-radius: 99px; font-weight: 700; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.3); }
        .btn-premium:hover { transform: scale(1.05); box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.4); }
                .logo-box:hover { transform: scale(1.1) rotate(-5deg); box-shadow: 0 12px 24px -4px rgba(99, 102, 241, 0.4); }
        
        .tag { display: inline-block; padding: 0.5rem 1.2rem; background: rgba(99, 102, 241, 0.08); color: #6366f1; border-radius: 99px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; }
      `}} />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafcda', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div style={{ 
            width: '45px', 
            height: '45px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', 
            borderRadius: '14px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: 900,
            boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s'
          }} className="logo-box">
            {data.name?.charAt(0) || "P"}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {data.name?.split(' ')[0] || "Portfolio"}<span style={{ color: '#6366f1' }}>.</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <a href="#services" className="nav-link">Services</a>
          <a href="#works" className="nav-link">Work</a>
          <a href="#expertise" className="nav-link">Expertise</a>
          <a href="#journey" className="nav-link">Experience</a>
          <a href="#certifications" className="nav-link">Certifications</a>
          <a href="#contact" className="btn-premium" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>Let's Work</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" style={{ padding: '8rem 6% 6rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '6rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px', opacity: 1 }} className="animate-section">
          <div className="tag">Creative Professional Portfolio</div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '2.5rem' }}>
            Designing <span className="gradient-text">Excellence</span> through Technology.
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#475569', lineHeight: 1.6, marginBottom: '3.5rem', maxWidth: '600px' }}>
            I am <span style={{ color: '#0f172a', fontWeight: 800 }}>{data.name || "A Professional"}</span>, a {data.role || "Developer"}. {data.bio || "I combine creative vision with technical precision to build meaningful digital products."}
          </p>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button className="btn-premium" onClick={() => window.location.href = '#contact'}>Contact Me Now</button>

            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', paddingLeft: '1rem', borderLeft: '2px solid rgba(226, 232, 240, 0.8)' }}>
              {data.socials?.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="social-hero-link" title={`Visit my ${social.platform}`}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ color: '#6366f1' }}>{getSocialIcon(social.platform)}</span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#475569' }}>{social.platform}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {data.profileImage && (
          <div className="animate-section" style={{ opacity: 1, flex: '0 0 480px', height: '620px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.1)', border: '12px solid #fff', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))' }}></div>
            <img src={data.profileImage} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </header>

      {/* 1) Services Section */}
      {data.services?.length > 0 && (
        <section id="services" style={{ padding: '10rem 6%', background: '#fff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className="tag">Services</div>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem' }}>Solutions I <span className="gradient-text">Provide.</span></h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              {data.services.map((service, i) => (
                <div key={i} className="premium-card" style={{ padding: '4rem 3rem', background: '#f8fafc' }}>
                  <div style={{ width: '50px', height: '50px', background: '#6366f1', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 900, marginBottom: '2rem' }}>
                    0{i + 1}
                  </div>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.2rem' }}>{service}</h4>
                  <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>Delivering high-quality {service.toLowerCase()} results by leveraging modern architecture and innovative thinking.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2) Works (Projects) Section */}
      {data.projects?.length > 0 && (
        <section id="works" style={{ padding: '10rem 6%', background: '#fff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className="tag" style={{ margin: '0 auto 1.5rem', display: 'table' }}>Portfolio</div>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 950, textAlign: 'center', marginBottom: '5rem', color: '#1a365d' }}>Featured <span className="gradient-text">Projects</span></h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              {data.projects.map((project, i) => (
                <div key={i} className="premium-card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '3rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '32px',
                  minHeight: '480px'
                }}>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', color: '#2c7ef0ed', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{project.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 'auto' }}>{project.desc}</p>

                  <div style={{ marginTop: '2.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                      {project.tech?.split(',').map(t => (
                        <span key={t} style={{
                          fontSize: '0.8rem',
                          color: '#ffffff',
                          fontWeight: 700,
                          background: '#006affff',
                          padding: '0.5rem 1rem',
                          borderRadius: '99px'
                        }}>{t.trim()}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      color: '#3d7b7f',
                      textDecoration: 'none',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3) Expertise (Categorized Skillset Cards) */}
      {data.skills?.length > 0 && (
        <section id="expertise" style={{ padding: '10rem 6%', background: '#f8fafc' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className="tag">Inventory</div>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 950, textAlign: 'center', marginBottom: '5rem', color: '#1a365d' }}>Skills & <span className="gradient-text">Expertise</span></h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {categorizedSkills.map((cat, i) => (
                <div key={i} className="premium-card" style={{
                  padding: '3rem 2rem',
                  background: '#ffffff',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  borderLeft: '6px solid #6366f1',
                  borderRadius: '24px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2.5rem', color: '#2d3748', letterSpacing: '-0.02em' }}>{cat.category}</h4>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {cat.skills.map(skill => (
                      <span key={skill} style={{
                        padding: '0.6rem 1.2rem',
                        background: '#f1f5f9',
                        color: '#006affff',
                        borderRadius: '15px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        transition: 'all 0.2s'
                      }} onMouseOver={e => e.currentTarget.style.background = '#e2e8f0'} onMouseOut={e => e.currentTarget.style.background = '#f1f5f9'}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4) Journey (Experience) Section */}
      {data.experience?.length > 0 && (
        <section id="journey" style={{ padding: '10rem 6%', background: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="tag" style={{ margin: '0 auto 1.5rem', display: 'table' }}>Timeline</div>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 950, textAlign: 'center', marginBottom: '6rem', color: '#1a365d' }}>Professional <span className="gradient-text">Chronicle</span></h3>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {/* Connecting Line */}
              <div style={{ position: 'absolute', left: '40px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, #6366f1 0%, #ec4899 100%)', opacity: 0.2 }}></div>

              {data.experience.map((exp, i) => (
                <div key={i} className="premium-card" style={{
                  position: 'relative',
                  padding: '3rem',
                  marginLeft: '80px',
                  background: '#ffffff',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                  {/* Floating Marker */}
                  <div style={{
                    position: 'absolute',
                    left: '-58px',
                    top: '35px',
                    width: '36px',
                    height: '36px',
                    background: '#fff',
                    border: '4px solid #6366f1',
                    borderRadius: '50%',
                    zIndex: 2,
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)'
                  }}></div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '1.2rem', color: '#6366f1', fontWeight: 900 }}>{exp.duration}</div>
                    <div style={{ background: 'rgba(236, 72, 153, 0.08)', color: '#ec4899', padding: '0.4rem 1.2rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 800 }}>Experience Node 0{i + 1}</div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{exp.role}</h4>
                    <p style={{ fontSize: '1.3rem', color: '#2c7ef0ed', fontWeight: 800, marginBottom: '1.5rem' }}>@{exp.company.toUpperCase()}</p>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '900px' }}>{exp.desc}</p>
                  </div>

                  <div style={{ position: 'absolute', right: '2rem', bottom: '-1rem', fontSize: '5rem', fontWeight: 950, color: '#f1f5f9', zIndex: -1, opacity: 1 }}>
                    0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5) Certification Section */}
      {data.certificates?.length > 0 && (
        <section id="certifications" style={{ padding: '10rem 6%', background: '#fff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className="tag">Awards</div>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem' }}>Global <span className="gradient-text">Certifications.</span></h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
              {data.certificates.map((cert, i) => (
                <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="premium-card" style={{ padding: '3.5rem', textDecoration: 'none', background: '#f8fafc' }}>
                  <h4 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 900, marginBottom: '1rem' }}>{cert.name}</h4>
                  <p style={{ color: '#6366f1', fontWeight: 800, fontSize: '0.95rem' }}>{cert.issuer}</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '2rem' }}>Verified Credential ➔</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6) Lets Contact Section */}
      <footer id="contact" style={{ padding: '12rem 6% 6rem', textAlign: 'center', background: '#0f172a', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h3 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, marginBottom: '3rem', letterSpacing: '-0.04em' }}>Ready to build <span className="gradient-text">something big?</span></h3>
          <p style={{ color: '#94a3b8', fontSize: '1.4rem', marginBottom: '5rem', lineHeight: 1.7 }}>If you are looking for a reliable partner for your next project, feel free to reach out. I am available for new collaborations.</p>

          <button className="btn-premium" style={{ fontSize: '1.3rem', padding: '1.5rem 4rem' }} onClick={() => window.location.href = `mailto:${data.email}`}>Talk to Me Now</button>

          <div style={{ display: 'flex', gap: '5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8rem', paddingBottom: '6rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.2rem', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>Primary Email</p>
              <p style={{ fontSize: '1.6rem', fontWeight: 900 }}>{data.email}</p>
            </div>
            {data.phone && (
              <div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.2rem', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>Professional Line</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900 }}>{data.phone}</p>
              </div>
            )}
          </div>

          <div style={{ padding: '4rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <p style={{ color: '#64748b', fontWeight: 600 }}>© {new Date().getFullYear()} {data.name}. Created with <span className="gradient-text" style={{ fontWeight: 900 }}>PortGen.</span></p>
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              {data.socials?.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900, fontSize: '1rem' }}>{social.platform}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Card1;
