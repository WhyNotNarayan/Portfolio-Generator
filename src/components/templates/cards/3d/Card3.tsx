"use client";

import React, { useState } from 'react';
import { PortfolioData } from '@/lib/store';
import Scene3D_3 from './Scene3D_3';

interface TemplateProps {
   data: PortfolioData;
}

const Card3: React.FC<TemplateProps> = ({ data }) => {
   const [isDarkMode, setIsDarkMode] = useState(true);

   // HYPER-REALISTIC GALAXY THEME
   const primaryColor = '#8b5cf6'; // Purple Nebula
   const secondaryColor = '#ec4899'; // Pink Highlights
   const linkColor = '#3b82f6'; // Space Blue
   
   const bgColor = isDarkMode ? '#000000' : '#0b0f2a';
   const textColor = isDarkMode ? '#f8fafc' : '#000000';
   const mutedTextColor = isDarkMode ? '#9ca3af' : '#4b5563';

   const getSocialUrl = (platform: string) => {
      return data.socials?.find(s => s.platform.toLowerCase() === platform.toLowerCase())?.url;
   };

   const handleDownloadResume = () => {
      if (!data.resumeUrl) {
         alert("No resume uploaded. Please go back to the wizard to upload your CV.");
         return;
      }
      const link = document.createElement('a');
      link.href = data.resumeUrl;
      link.download = `${data.name}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <div style={{
         backgroundColor: bgColor,
         color: textColor,
         minHeight: '100vh',
         fontFamily: "'Space Grotesk', sans-serif",
         transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
         overflowX: 'hidden',
         position: 'relative'
      }}>
         {/* Render 3D Background - The Hyper-Realistic Galaxy Engine */}
         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Scene3D_3 isDarkMode={isDarkMode} />
         </div>
         
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .galaxy-nav-link { text-decoration: none; color: inherit; font-weight: 500; font-size: 0.95rem; opacity: 0.8; transition: 0.3s; letter-spacing: 0.05em; }
        .galaxy-nav-link:hover { opacity: 1; color: ${linkColor}; text-shadow: 0 0 15px ${linkColor}88; }

        .btn-galaxy { background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); color: white; padding: 0.6rem 1.4rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: 0.4s; backdrop-filter: blur(10px); display: flex; align-items: center; gap: 0.8rem; }
        .btn-galaxy:hover { background: rgba(139, 92, 246, 0.3); border-color: ${primaryColor}; box-shadow: 0 0 20px ${primaryColor}44; transform: translateY(-2px); }

        .social-circle { width: 45px; height: 45px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s; cursor: pointer; background: rgba(255,255,255,0.05); backdrop-filter: blur(5px); text-decoration: none; }
        .social-circle:hover { background: ${primaryColor}; color: white; transform: translateY(-5px); box-shadow: 0 8px 15px ${primaryColor}44; border-color: ${primaryColor}; }

        .cta-primary { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; padding: 1.2rem 2.5rem; border-radius: 8px; border: none; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
        .cta-primary:hover { filter: brightness(1.2); box-shadow: 0 10px 30px ${primaryColor}66; transform: translateY(-3px); }

        .cta-outline { background: rgba(255,255,255,0.02); color: inherit; padding: 1.2rem 2.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: 0.3s; backdrop-filter: blur(15px); }
        .cta-outline:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); transform: translateY(-3px); }

        /* Premium Glassmorphism replacing standard cards */
        .glass-card { 
            background: rgba(11, 15, 42, 0.4); 
            backdrop-filter: blur(24px) saturate(150%); 
            -webkit-backdrop-filter: blur(24px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.05); 
            border-bottom: 1px solid rgba(255, 255, 255, 0.02);
            border-right: 1px solid rgba(255, 255, 255, 0.02);
            border-radius: 20px; 
            padding: 3rem; 
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
            position: relative; 
            z-index: 10; 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); 
        }
        .glass-card:hover { 
            transform: translateY(-8px) translateZ(20px) rotateX(2deg); 
            border-top: 1px solid rgba(139, 92, 246, 0.3);
            border-left: 1px solid rgba(139, 92, 246, 0.3);
            box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.1) inset; 
        }

        .skill-grid-card { background: rgba(11, 15, 42, 0.4); backdrop-filter: blur(24px) saturate(150%); border-radius: 20px; padding: 2.5rem; border: 1px solid rgba(255,255,255,0.05); border-left: 5px solid ${primaryColor}; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; position: relative; z-index: 10; }
        .skill-grid-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px ${primaryColor}22 !important; border-left-width: 8px; border-color: rgba(139,92,246,0.3); }

        .neon-text-subtle { background: linear-gradient(135deg, #fff 20%, ${primaryColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        section { position: relative; z-index: 10; scroll-margin-top: 100px; }
      `}} />

         {/* Navigation - Exact Parity with Card1 */}
         <nav style={{ padding: '1.5rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, background: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(11, 15, 42, 0.5)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
               {data.name}
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
               <a href="#projects" className="galaxy-nav-link">Projects</a>
               <a href="#experience" className="galaxy-nav-link">Experience</a>
               <a href="#skills" className="galaxy-nav-link">Skills</a>
               <a href="#certifications" className="galaxy-nav-link">Certifications</a>
               <div onClick={() => setIsDarkMode(!isDarkMode)} style={{ cursor: 'pointer', fontSize: '1.4rem' }}>{isDarkMode ? '🌙' : '☀️'}</div>
               <button className="btn-galaxy" onClick={handleDownloadResume}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Resume
               </button>
            </div>
         </nav>

         {/* Hero Section */}
         <section className="hero-content" style={{ padding: '8rem 6%', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', minHeight: '85vh' }}>
            <div style={{ flex: 1 }}>
               <h1 style={{ fontSize: '5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  Hi, I'm <span className="neon-text-subtle">{data.name}</span>
               </h1>
               <p style={{ fontSize: '1.8rem', fontWeight: 600, color: linkColor, marginBottom: '0.8rem' }}>{data.role}</p>

               {data.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', marginBottom: '2.5rem', fontSize: '1rem', fontWeight: 500 }}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: primaryColor }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                     {data.location}
                  </div>
               )}

               <div className="social-container" style={{ display: 'flex', gap: '1.2rem', marginBottom: '3rem' }}>
                  {getSocialUrl('github') && (
                     <a href={getSocialUrl('github')} target="_blank" className="social-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                     </a>
                  )}
                  {getSocialUrl('linkedin') && (
                     <a href={getSocialUrl('linkedin')} target="_blank" className="social-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                     </a>
                  )}
               </div>

               {data.bio && (
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.8, fontWeight: 300, maxWidth: '600px', marginBottom: '3rem' }}>
                     {data.bio}
                  </p>
               )}

               <div className="cta-container" style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="cta-primary" onClick={() => window.location.href = '#contact'}>Get In Touch</button>
                  <button className="cta-outline" onClick={() => window.location.href = '#projects'}>View Projects</button>
               </div>
            </div>

            <div className="profile-container" style={{ flex: '0 0 500px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '480px', height: '480px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(139, 92, 246, 0.4)', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)' }}>
                  <img src={data.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
               {/* Realistic ambient bloom behind profile */}
               <div style={{ position: 'absolute', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }}></div>
            </div>
         </section>

         {/* About Section */}
         <section id="about" style={{ padding: '8rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '6rem', alignItems: 'start' }}>
                  <div className="glass-card">
                     <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>About <span className="neon-text-subtle">Me</span></h2>
                     <div style={{ width: '80px', height: '6px', background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`, borderRadius: '10px' }}></div>
                  </div>
                  <div className="glass-card">
                     <p style={{ fontSize: '1.6rem', lineHeight: 1.8, opacity: 0.9, fontWeight: 300, color: '#fff' }}>
                        {data.bio || "I am a dedicated professional focused on delivering high-impact solutions and creating exceptional digital experiences."}
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Services Section */}
         <section id="services" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>Core <span className="neon-text-subtle">Specialties</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                  {data.services?.map((s, i) => (
                     <div key={i} className="glass-card">
                        <div style={{ color: primaryColor, marginBottom: '2.5rem' }}>
                           <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>{s}</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.7, fontWeight: 300, color: '#fff' }}>Delivering bespoke luxury digital solutions with a focus on premium aesthetics and performance.</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Projects Section */}
         <section id="projects" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>Featured <span className="neon-text-subtle">Missions</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                  {data.projects?.map((p, i) => (
                     <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>{p.title}</h3>
                        <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', flexGrow: 1, fontWeight: 300 }}>{p.desc}</p>
                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                           {p.tech?.split(',').map(t => <span key={t} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500 }}>{t}</span>)}
                        </div>
                        <button className="cta-outline" style={{ width: '100%' }} onClick={() => window.open(p.link)}>Analyze Codebase</button>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Experience Timeline */}
         <section id="experience" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '8rem', textAlign: 'center', color: '#fff' }}>Professional <span className="neon-text-subtle">Chronicle</span></h2>
               {data.experience?.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', paddingLeft: '3rem', borderLeft: `2px solid rgba(139, 92, 246, 0.4)`, position: 'relative' }}>
                     <div style={{ position: 'absolute', left: '-7px', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }}></div>
                     <div style={{ minWidth: '150px', fontWeight: 700, color: linkColor }}>{e.duration}</div>
                     <div className="glass-card" style={{ padding: '2.5rem', flex: 1 }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{e.role}</h3>
                        <p style={{ color: secondaryColor, fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{e.company}</p>
                        <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 300, color: '#fff' }}>{e.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Skills Section */}
         <section id="skills" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>Skills & <span className="neon-text-subtle">Expertise</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {(() => {
                     const skillCategories: Record<string, string[]> = {
                        "Languages": ["JavaScript", "TypeScript", "Python", "Go", "Java", "C++", "Ruby", "PHP", "Rust", "Swift", "C#"],
                        "Frontend": ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Framer Motion", "SASS", "Bootstrap", "Responsive Design", "HTML5", "CSS3"],
                        "Backend": ["Node.js", "Express", "Django", "Spring Boot", "Laravel", "NestJS", "Firebase", "PostgreSQL", "Prisma", "MongoDB", "REST APIs"],
                        "Cybersecurity": ["Pen Testing", "Network Security", "Cryptography", "Risk Auth", "Ethical Hacking", "Security Audits"],
                        "Tools": ["Git", "Docker", "Kubernetes", "AWS", "Figma", "Postman", "Vercel", "Jenkins", "Nginx", "Linux"],
                        "Specialized": ["Machine Learning", "Blockchain / Web3", "SEO", "System Design", "Data Science", "Mobile Development"]
                     };

                     const userSkills = data.skills || [];
                     const renderedCategories: Array<{ category: string, skills: string[] }> = [];

                     Object.entries(skillCategories).forEach(([category, patterns]) => {
                        const matchedSkills = userSkills.filter(s => patterns.map(p => p.toLowerCase()).includes(s.toLowerCase()));
                        if (matchedSkills.length > 0) {
                           renderedCategories.push({ category, skills: matchedSkills });
                        }
                     });

                     return renderedCategories.map((c, i) => (
                        <div key={i} className="skill-grid-card">
                           <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff' }}>{c.category}</h3>
                           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              {c.skills.map(s => (
                                 <span key={s} style={{ padding: '0.8rem 1.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontWeight: 500, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.1)', transition: '0.3s', color: '#cbd5e1' }}>
                                    {s}
                                 </span>
                              ))}
                           </div>
                        </div>
                     ));
                  })()}
               </div>
            </div>
         </section>

         {/* Certifications Section */}
         <section id="certifications" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>Professional <span className="neon-text-subtle">Credentials</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                  {data.certificates?.length > 0 ? (
                     data.certificates.map((c, i) => (
                        <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                           <div>
                              <div style={{ color: primaryColor, marginBottom: '1.5rem' }}>
                                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                              </div>
                              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>{c.name}</h3>
                              <p style={{ color: linkColor, fontWeight: 700, marginBottom: '2rem', fontSize: '1.1rem' }}>{c.issuer}</p>
                           </div>
                           <button className="cta-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: 'fit-content' }} onClick={() => window.open(c.url)}>Verify Credential</button>
                        </div>
                     ))
                  ) : (
                     <div style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5, fontSize: '1.2rem', padding: '4rem' }}>Professional credentials will be archived here.</div>
                  )}
               </div>
            </div>
         </section>

         {/* Contact Section */}
         <section id="contact" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '8rem', color: '#fff' }}>Get In <span className="neon-text-subtle">Touch</span></h2>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem' }}>
                  <div className="glass-card">
                     <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff' }}>Send a Message</h3>

                     <form action={`https://formsubmit.co/${data.email}`} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_subject" value={`New Galaxy Portfolio Inquiry from ${data.name}!`} />

                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8, display: 'block', marginBottom: '0.6rem', color: '#fff' }}>Name</label>
                           <input type="text" name="name" required placeholder="Your Name" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 500, outline: 'none' }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8, display: 'block', marginBottom: '0.6rem', color: '#fff' }}>Email</label>
                           <input type="email" name="email" required placeholder="Your Email" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 500, outline: 'none' }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8, display: 'block', marginBottom: '0.6rem', color: '#fff' }}>Message</label>
                           <textarea name="message" rows={5} required placeholder="Your Message" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 500, outline: 'none' }}></textarea>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                           <input type="checkbox" style={{ width: '18px', height: '18px' }} required />
                           <span style={{ color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>I'm not a robot</span>
                           <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" style={{ width: '25px', marginLeft: 'auto', filter: 'brightness(0) invert(1)' }} />
                        </div>

                        <button type="submit" className="cta-primary" style={{ width: '100%', marginTop: '1rem', boxShadow: `0 10px 20px rgba(139, 92, 246, 0.3)` }}>Send Message</button>
                     </form>
                  </div>

                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff' }}>Contact Information</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
                           <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                           <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.email}</span>
                        </div>
                        {data.phone && (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
                              <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.phone}</span>
                           </div>
                        )}
                        {data.location && (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
                              <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.location}</span>
                           </div>
                        )}
                     </div>

                     {/* Map Embed */}
                     <div style={{ marginTop: 'auto', borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.05)`, height: '250px' }}>
                        <iframe 
                           width="100%" 
                           height="100%" 
                           frameBorder="0" 
                           style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(0.7) contrast(1.2)' }} 
                           src={`https://www.google.com/maps?q=${encodeURIComponent(data.location || "Earth")}&output=embed`} 
                           allowFullScreen>
                        </iframe>
                     </div>
                  </div>
               </div>
            </div>
            <p style={{ marginTop: '10rem', opacity: 0.3, textAlign: 'center', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, userSelect: 'none', pointerEvents: 'none', color: '#fff' }}>
               © {new Date().getFullYear()} @{data.name.toLowerCase().replace(/\s+/g, '')}. Created with <span style={{ color: primaryColor }}>Galaxy Tech.</span>
            </p>
         </section>
      </div>
   );
};

export default Card3;
