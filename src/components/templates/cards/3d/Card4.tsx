"use client";

import React, { useState } from 'react';
import { PortfolioData } from '@/lib/store';
import Scene3D_4 from './Scene3D_4';

interface TemplateProps {
   data: PortfolioData;
}

const Card4: React.FC<TemplateProps> = ({ data }) => {
   const [isDarkMode, setIsDarkMode] = useState(true);

   // HYPER-REALISTIC PLASMA CORE THEME
   const primaryColor = '#22d3ee'; // Cyan Highlights
   const secondaryColor = '#8b5cf6'; // Neon Purple
   const powerColor = '#3b82f6'; // Electric Blue
   
   const bgColor = isDarkMode ? '#030510' : '#0a0f1d'; // Force dark/navy for cinematic plasma realism
   const textColor = '#f8fafc';

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
         {/* Render 3D Background - The Hyper-Realistic Plasma Core */}
         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Scene3D_4 isDarkMode={true} />
         </div>
         
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .nav-link { text-decoration: none; color: inherit; font-weight: 500; font-size: 0.95rem; opacity: 0.7; transition: 0.3s; letter-spacing: 0.05em; text-transform: uppercase; }
        .nav-link:hover { opacity: 1; color: ${primaryColor}; text-shadow: 0 0 10px ${primaryColor}88; }

        .btn-reactor { background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.4); color: white; padding: 0.6rem 1.4rem; border-radius: 4px; font-weight: 600; cursor: pointer; transition: 0.4s; backdrop-filter: blur(10px); display: flex; align-items: center; gap: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .btn-reactor:hover { background: rgba(34, 211, 238, 0.25); border-color: ${primaryColor}; box-shadow: 0 0 25px ${primaryColor}66, inset 0 0 10px ${primaryColor}44; transform: translateY(-2px); }

        .social-circle { width: 45px; height: 45px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s; cursor: pointer; background: rgba(255,255,255,0.03); backdrop-filter: blur(5px); text-decoration: none; }
        .social-circle:hover { background: rgba(59, 130, 246, 0.2); color: ${primaryColor}; transform: translateY(-5px); box-shadow: 0 8px 20px ${powerColor}44; border-color: ${primaryColor}; }

        .cta-primary { background: linear-gradient(135deg, ${powerColor}, ${primaryColor}); color: #000; padding: 1.2rem 2.5rem; border-radius: 4px; border: none; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px ${powerColor}44; text-transform: uppercase; letter-spacing: 0.05em; }
        .cta-primary:hover { filter: brightness(1.3); box-shadow: 0 10px 30px ${primaryColor}88; transform: translateY(-3px); }

        .cta-outline { background: rgba(255,255,255,0.02); color: inherit; padding: 1.2rem 2.5rem; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.4); font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: 0.3s; backdrop-filter: blur(15px); text-transform: uppercase; letter-spacing: 0.05em; }
        .cta-outline:hover { background: rgba(59, 130, 246, 0.1); border-color: ${primaryColor}; transform: translateY(-3px); box-shadow: 0 0 20px ${powerColor}33; }

        /* Sci-Fi Interface Panels (Glassmorphism + Tech Borders) */
        .glass-card { 
            background: linear-gradient(145deg, rgba(8, 12, 30, 0.7), rgba(4, 7, 18, 0.8)); 
            backdrop-filter: blur(20px); 
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2); 
            border-top: 1px solid rgba(34, 211, 238, 0.4);
            border-radius: 8px; 
            padding: 3rem; 
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
            position: relative; 
            z-index: 10; 
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1); 
        }
        .glass-card::before { content: ''; position: absolute; top: 0; left: 0; width: 30px; height: 1px; background: ${primaryColor}; box-shadow: 0 0 10px ${primaryColor}; }
        .glass-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 30px; height: 1px; background: ${secondaryColor}; box-shadow: 0 0 10px ${secondaryColor}; }
        
        .glass-card:hover { 
            transform: translateY(-5px); 
            border-top: 1px solid ${primaryColor};
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.9), 0 0 30px ${powerColor}22 inset, 0 0 20px ${primaryColor}33; 
        }

        .skill-grid-card { background: rgba(8, 12, 30, 0.7); backdrop-filter: blur(20px); border-radius: 8px; padding: 2.5rem; border: 1px solid rgba(59, 130, 246, 0.2); border-left: 4px solid ${primaryColor}; transition: all 0.3s; position: relative; z-index: 10; cursor: default; }
        .skill-grid-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px ${powerColor}33; border-color: ${primaryColor}; }

        .neon-text-plasma { background: linear-gradient(135deg, #fff 20%, ${primaryColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 12px ${primaryColor}44); }

        section { position: relative; z-index: 10; scroll-margin-top: 100px; }
      `}} />

         {/* Navigation - Exact Parity with Card1 */}
         <nav style={{ padding: '1.5rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: 'rgba(3, 5, 16, 0.7)', backdropFilter: 'blur(20px)', borderBottom: `1px solid rgba(34, 211, 238, 0.15)` }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>
               <span style={{ color: primaryColor }}>SYS.</span>{data.name.split(' ')[0].toUpperCase()}
            </div>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
               <a href="#projects" className="nav-link">Projects</a>
               <a href="#experience" className="nav-link">Experience</a>
               <a href="#skills" className="nav-link">Skills</a>
               <a href="#certifications" className="nav-link">Certs</a>
               <button className="btn-reactor" onClick={handleDownloadResume}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  ACCESS_CV
               </button>
            </div>
         </nav>

         {/* Hero Section */}
         <section className="hero-content" style={{ padding: '12rem 6% 8rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', minHeight: '90vh' }}>
            <div style={{ flex: 1 }}>
               <div style={{ color: primaryColor, fontSize: '0.85rem', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '2rem' }}>[ REACTOR ONLINE ]</div>
               <h1 style={{ fontSize: '5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Hi, I'm <br/><span className="neon-text-plasma">{data.name}</span>
               </h1>
               <p style={{ fontSize: '1.6rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '1rem', letterSpacing: '0.05em' }}>{data.role}</p>

               {data.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1rem', fontWeight: 500 }}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: primaryColor }}><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                     LOC: {data.location.toUpperCase()}
                  </div>
               )}

               <div className="social-container" style={{ display: 'flex', gap: '1.2rem', marginBottom: '3rem' }}>
                  {getSocialUrl('github') && (
                     <a href={getSocialUrl('github')} target="_blank" className="social-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                     </a>
                  )}
                  {getSocialUrl('linkedin') && (
                     <a href={getSocialUrl('linkedin')} target="_blank" className="social-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                     </a>
                  )}
               </div>

               {data.bio && (
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.8, fontWeight: 300, maxWidth: '600px', marginBottom: '3.5rem' }}>
                     {data.bio}
                  </p>
               )}

               <div className="cta-container" style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="cta-primary" onClick={() => window.location.href = '#contact'}>INITIATE_CONTACT</button>
                  <button className="cta-outline" onClick={() => window.location.href = '#projects'}>VIEW_SYSTEMS</button>
               </div>
            </div>

            <div className="profile-container" style={{ flex: '0 0 500px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '480px', height: '480px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${primaryColor}`, position: 'relative', zIndex: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', boxShadow: `0 0 50px ${primaryColor}66, inset 0 0 20px ${powerColor}66` }}>
                  <img src={data.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
               </div>
               {/* Orbital Light ring effect */}
               <div style={{ position: 'absolute', width: '520px', height: '520px', borderRadius: '50%', border: '1px solid rgba(34, 211, 238, 0.1)', zIndex: 1, pointerEvents: 'none', animation: 'spin 10s linear infinite' }}></div>
            </div>
         </section>

         {/* About Section */}
         <section id="about" style={{ padding: '8rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '6rem', alignItems: 'start' }}>
                  <div className="glass-card">
                     <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>DATA <br/><span className="neon-text-plasma">LOGS</span></h2>
                     <div style={{ width: '80px', height: '4px', background: primaryColor, borderRadius: '2px', boxShadow: `0 0 10px ${primaryColor}` }}></div>
                  </div>
                  <div className="glass-card">
                     <p style={{ fontSize: '1.6rem', lineHeight: 1.8, opacity: 0.9, fontWeight: 300, color: '#fff' }}>
                        {data.bio || "Optimizing highly scalable and fault-tolerant architectural components for maximum energy output and efficiency."}
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Services Section */}
         <section id="services" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff', letterSpacing: '0.1em' }}>CORE <span className="neon-text-plasma">MODULES</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                  {data.services?.map((s, i) => (
                     <div key={i} className="glass-card">
                        <div style={{ color: primaryColor, marginBottom: '2.5rem' }}>
                           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        </div>
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s}</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.7, fontWeight: 300, color: '#fff' }}>Powering the next generation of scalable infrastructure and digital interfaces.</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Projects Section */}
         <section id="projects" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>REACTOR <span className="neon-text-plasma">ASSETS</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                  {data.projects?.map((p, i) => (
                     <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '0.8rem', color: primaryColor, marginBottom: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>{'// PAYLOAD_0' + (i + 1)}</div>
                        <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#fff' }}>{p.title}</h3>
                        <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', flexGrow: 1, fontWeight: 300 }}>{p.desc}</p>
                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                           {p.tech?.split(',').map(t => <span key={t} style={{ background: 'rgba(34, 211, 238, 0.1)', color: primaryColor, border: '1px solid rgba(34, 211, 238, 0.3)', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{t}</span>)}
                        </div>
                        <button className="cta-outline" style={{ width: '100%' }} onClick={() => window.open(p.link)}>ENGAGE DATA</button>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Experience Timeline */}
         <section id="experience" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '8rem', textAlign: 'center', color: '#fff' }}>OPERATION <span className="neon-text-plasma">HISTORY</span></h2>
               {data.experience?.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', paddingLeft: '3rem', borderLeft: `2px solid rgba(34, 211, 238, 0.3)`, position: 'relative' }}>
                     <div style={{ position: 'absolute', left: '-8px', top: '0', width: '14px', height: '14px', borderRadius: '50%', background: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }}></div>
                     <div style={{ minWidth: '150px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em' }}>{e.duration}</div>
                     <div className="glass-card" style={{ padding: '2.5rem', flex: 1 }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>{e.role}</h3>
                        <p style={{ color: primaryColor, fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{e.company}</p>
                        <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 300, color: '#fff' }}>{e.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Skills Section */}
         <section id="skills" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>INTEGRATED <span className="neon-text-plasma">SYSTEMS</span></h2>
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
                           <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.category}</h3>
                           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              {c.skills.map(s => (
                                 <span key={s} style={{ padding: '0.6rem 1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontWeight: 500, fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>
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
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '6rem', textAlign: 'center', color: '#fff' }}>AUTHORIZED <span className="neon-text-plasma">CLEARANCES</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                  {data.certificates?.length > 0 ? (
                     data.certificates.map((c, i) => (
                        <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                           <div>
                              <div style={{ color: primaryColor, marginBottom: '1.5rem' }}>
                                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.27 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                              </div>
                              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem', color: '#fff', textTransform: 'uppercase' }}>{c.name}</h3>
                              <p style={{ color: secondaryColor, fontWeight: 700, marginBottom: '2rem', fontSize: '1.1rem' }}>{c.issuer}</p>
                           </div>
                           <button className="cta-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: 'fit-content' }} onClick={() => window.open(c.url)}>VERIFY SIGNATURE</button>
                        </div>
                     ))
                  ) : (
                     <div style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5, fontSize: '1.2rem', padding: '4rem', letterSpacing: '0.1em' }}>[ NO DATA BLOCKS FOUND ]</div>
                  )}
               </div>
            </div>
         </section>

         {/* Contact Section */}
         <section id="contact" style={{ padding: '10rem 6%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '8rem', color: '#fff' }}>ESTABLISH <span className="neon-text-plasma">COMM-LINK</span></h2>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem' }}>
                  <div className="glass-card">
                     <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Transmit Data</h3>

                     <form action={`https://formsubmit.co/${data.email}`} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_subject" value={`New Reactor Comm from ${data.name}!`} />

                        <div>
                           <label style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.7, display: 'block', marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Identifier (Name)</label>
                           <input type="text" name="name" required placeholder="User Name" style={{ width: '100%', padding: '1.2rem', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#fff', fontWeight: 500, outline: 'none' }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.7, display: 'block', marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Return Address (Email)</label>
                           <input type="email" name="email" required placeholder="name@domain.com" style={{ width: '100%', padding: '1.2rem', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#fff', fontWeight: 500, outline: 'none' }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.7, display: 'block', marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Payload (Message)</label>
                           <textarea name="message" rows={5} required placeholder="Enter data packet..." style={{ width: '100%', padding: '1.2rem', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#fff', fontWeight: 500, outline: 'none' }}></textarea>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '4px', padding: '1rem', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                           <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: primaryColor }} required />
                           <span style={{ color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>Verify Organic Status</span>
                        </div>

                        <button type="submit" className="cta-primary" style={{ width: '100%', marginTop: '1rem' }}>EXECUTE TRANSFER</button>
                     </form>
                  </div>

                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Node Coordinates</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
                           <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                           <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.email}</span>
                        </div>
                        {data.phone && (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
                              <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.phone}</span>
                           </div>
                        )}
                        {data.location && (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
                              <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg></div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.location.toUpperCase()}</span>
                           </div>
                        )}
                     </div>

                     {/* Map Embed - Scanner Theme */}
                     <div style={{ marginTop: 'auto', borderRadius: '8px', overflow: 'hidden', border: `1px solid rgba(34, 211, 238, 0.4)`, height: '250px', position: 'relative' }}>
                        <iframe 
                           width="100%" 
                           height="100%" 
                           frameBorder="0" 
                           style={{ border: 0, filter: 'invert(100%) grayscale(100%) contrast(1.5) sepia(1) hue-rotate(180deg) brightness(0.8)' }} 
                           src={`https://www.google.com/maps?q=${encodeURIComponent(data.location || "Earth")}&output=embed`} 
                           allowFullScreen>
                        </iframe>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(34, 211, 238, 0.1) 50%, rgba(0,0,0,0) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', mixBlendMode: 'overlay' }}></div>
                     </div>
                  </div>
               </div>
            </div>
            <p style={{ marginTop: '10rem', opacity: 0.3, textAlign: 'center', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, userSelect: 'none', pointerEvents: 'none', color: '#fff' }}>
               SYS.OP © {new Date().getFullYear()} @{data.name.toLowerCase().replace(/\s+/g, '')}. CORE VOLTAGE VERIFIED.
            </p>
         </section>
      </div>
   );
};

export default Card4;
