import React, { useState } from 'react';
import { PortfolioData } from '@/lib/store';

interface TemplateProps {
   data: PortfolioData;
}

const Card2: React.FC<TemplateProps> = ({ data }) => {
   const [isDarkMode, setIsDarkMode] = useState(true);

   // LUXURY GOLD & BLACK DESIGN SYSTEM
   const primaryColor = '#D4AF37'; // Gold
   const bgColor = isDarkMode ? '#0B0B0B' : '#F9FAFB'; // Black / Off White
   const cardBg = isDarkMode ? '#1F2937' : '#FFFFFF'; // Dark Gray / White
   const textColor = isDarkMode ? '#F9FAFB' : '#0B0B0B'; // Off White / Black
   const mutedTextColor = isDarkMode ? '#9ca3af' : '#4b5563';

   // Helper to find social links
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
         background: bgColor,
         color: textColor,
         minHeight: '100vh',
         fontFamily: "'Inter', sans-serif",
         transition: 'all 0.4s ease',
         overflowX: 'hidden'
      }}>
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        
        .ivo-nav-link { text-decoration: none; color: inherit; font-weight: 600; font-size: 0.95rem; opacity: 0.8; transition: 0.3s; }
        .ivo-nav-link:hover { opacity: 1; color: ${primaryColor}; }

        .btn-resume { background: ${primaryColor}; color: #000; padding: 0.6rem 1.4rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.8rem; transition: 0.3s; }
        .btn-resume:hover { transform: translateY(-2px); box-shadow: 0 4px 12px ${primaryColor}66; }

        .social-circle { width: 45px; height: 45px; border-radius: 50%; border: 1px solid ${primaryColor}44; display: flex; align-items: center; justify-content: center; color: ${primaryColor}; transition: all 0.3s; cursor: pointer; background: transparent; text-decoration: none; }
        .social-circle:hover { background: ${primaryColor}; color: #000; transform: translateY(-5px); box-shadow: 0 8px 15px ${primaryColor}33; }

        .cta-primary { background: ${primaryColor}; color: #000; padding: 1.2rem 2.5rem; border-radius: 12px; border: none; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; }
        .cta-outline { background: transparent; color: inherit; padding: 1.2rem 2.5rem; border-radius: 12px; border: 2px solid ${isDarkMode ? 'rgba(212,175,55,0.3)' : 'rgba(0,0,0,0.1)'}; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .cta-primary:hover { opacity: 0.9; transform: scale(1.02); box-shadow: 0 10px 20px ${primaryColor}33; }
        .cta-outline:hover { border-color: ${primaryColor}; color: ${primaryColor}; }

        .profile-glow { border-radius: 50%; border: 8px solid ${primaryColor}22; box-shadow: 0 0 40px ${primaryColor}33; transition: all 0.5s ease; }
        .profile-glow:hover { box-shadow: 0 0 60px ${primaryColor}55; transform: scale(1.02); }

        .elite-card { background: ${cardBg}; border: 1px solid ${isDarkMode ? 'rgba(212,175,55,0.1)' : '#edf2f7'}; border-radius: 24px; padding: 3rem; transition: 0.3s; box-shadow: ${isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.04)'}; }
        .elite-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px ${primaryColor}22; border-color: ${primaryColor}; }

        .skill-grid-card { background: ${cardBg}; border-radius: 20px; padding: 2.5rem; border-left: 5px solid ${primaryColor}; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; box-shadow: ${isDarkMode ? '0 10px 20px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.03)'}; }
        .skill-grid-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px ${primaryColor}${isDarkMode ? '33' : '22'} !important; border-left-width: 8px; }

        @media (max-width: 1024px) {
          .hero-content { flex-direction: column-reverse !important; text-align: center; }
          .social-container { justify-content: center; }
          .cta-container { justify-content: center; flex-direction: column; }
          .profile-container { margin-bottom: 2rem; }
        }
      `}} />

         {/* Navigation */}
         <nav style={{ padding: '1.5rem 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, background: isDarkMode ? 'rgba(11, 11, 11, 0.95)' : 'rgba(249, 250, 251, 0.95)', backdropFilter: 'blur(10px)', borderBottom: isDarkMode ? `1px solid ${primaryColor}22` : 'none' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: primaryColor }}>{data.name}</div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
               <a href="#about" className="ivo-nav-link">About</a>
               <a href="#services" className="ivo-nav-link">Services</a>
               <a href="#projects" className="ivo-nav-link">Projects</a>
               <a href="#experience" className="ivo-nav-link">Experience</a>
               <a href="#skills" className="ivo-nav-link">Skills</a>
               <a href="#certifications" className="ivo-nav-link">Certifications</a>
               <div onClick={() => setIsDarkMode(!isDarkMode)} style={{ cursor: 'pointer', fontSize: '1.4rem' }}>{isDarkMode ? '🌞' : '🌙'}</div>
               <button className="btn-resume" onClick={handleDownloadResume}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Resume
               </button>
            </div>
         </nav>

         {/* Hero Section */}
         <section className="hero-content" style={{ padding: '8rem 6%', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
            <div style={{ flex: 1 }}>
               <h1 style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  Hi, I'm <span style={{ color: primaryColor }}>{data.name}</span>
               </h1>
               <p style={{ fontSize: '1.8rem', fontWeight: 700, color: primaryColor, marginBottom: '0.8rem' }}>{data.role}</p>
          
               {data.location && (
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: mutedTextColor, marginBottom: '2.5rem', fontSize: '1rem', fontWeight: 600 }}>
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
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.8, fontWeight: 500, maxWidth: '600px', marginBottom: '3rem' }}>
                     {data.bio}
                  </p>
               )}

               <div className="cta-container" style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="cta-primary" onClick={() => window.location.href = '#contact'}>Get In Touch</button>
                  <button className="cta-outline" onClick={() => window.location.href = '#projects'}>View Projects</button>
               </div>
            </div>

            <div className="profile-container" style={{ flex: '0 0 450px', display: 'flex', justifyContent: 'center' }}>
               <div className="profile-glow" style={{ width: '420px', height: '420px', overflow: 'hidden' }}>
                  <img src={data.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
            </div>
         </section>

         {/* About Section */}
         <section id="about" style={{ padding: '8rem 6%', borderTop: isDarkMode ? `1px solid ${primaryColor}22` : '1px solid rgba(0,0,0,0.05)', background: isDarkMode ? '#0B0B0B' : '#ffffff' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '6rem', alignItems: 'start' }}>
                  <div>
                     <h2 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '2rem' }}>About <span style={{ color: primaryColor }}>Me</span></h2>
                     <div style={{ width: '80px', height: '6px', background: primaryColor, borderRadius: '10px' }}></div>
                  </div>
                  <div>
                     <p style={{ fontSize: '1.6rem', lineHeight: 1.8, opacity: 0.8, fontWeight: 500 }}>
                        {data.bio || "I am a dedicated professional focused on delivering high-impact solutions and creating exceptional digital experiences."}
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Services Section */}
         <section id="services" style={{ padding: '10rem 6%', background: isDarkMode ? '#0B0B0B' : '#ffffff' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '6rem', textAlign: 'center' }}>Core <span style={{ color: primaryColor }}>Specialties</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                  {data.services?.map((s, i) => (
                     <div key={i} className="elite-card">
                        <div style={{ color: primaryColor, marginBottom: '2.5rem' }}>
                           <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>{s}</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.7, fontWeight: 500 }}>Specializing in advanced technical solutions with a focus on high-performance architecture.</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Projects Section */}
         <section id="projects" style={{ padding: '10rem 6%', background: bgColor }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '6rem', textAlign: 'center' }}>Featured <span style={{ color: primaryColor }}>Missions</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                  {data.projects?.map((p, i) => (
                     <div key={i} className="elite-card">
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{p.title}</h3>
                        <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>{p.desc}</p>
                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                           {p.tech?.split(',').map(t => <span key={t} style={{ background: primaryColor, color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>{t}</span>)}
                        </div>
                        <button className="cta-outline" style={{ width: '100%' }} onClick={() => window.open(p.link)}>Analyze Codebase</button>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Experience Timeline */}
         <section id="experience" style={{ padding: '10rem 6%', background: isDarkMode ? '#0B0B0B' : '#f7fafc' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '8rem', textAlign: 'center' }}>Professional <span style={{ color: primaryColor }}>Chronicle</span></h2>
               {data.experience?.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', paddingLeft: '3rem', borderLeft: `2px solid ${primaryColor}22`, position: 'relative' }}>
                     <div style={{ position: 'absolute', left: '-7px', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: primaryColor }}></div>
                     <div style={{ minWidth: '150px', fontWeight: 700, color: primaryColor }}>{e.duration}</div>
                     <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>{e.role}</h3>
                        <p style={{ color: primaryColor, fontWeight: 700, marginBottom: '1rem' }}>{e.company}</p>
                        <p style={{ opacity: 0.6, fontSize: '1.1rem', lineHeight: 1.8 }}>{e.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Skills Section */}
         <section id="skills" style={{ padding: '10rem 6%', background: isDarkMode ? '#0B0B0B' : '#eff3f6' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '6rem', textAlign: 'center', color: primaryColor, opacity: 0.9 }}>Skills & <span style={{ color: isDarkMode ? '#fff' : '#0B0B0B' }}>Expertise</span></h2>
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
                           <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', color: primaryColor }}>{c.category}</h3>
                           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              {c.skills.map(s => (
                                 <span key={s} style={{ padding: '0.8rem 1.8rem', background: isDarkMode ? '#111827' : '#f3f4f6', borderRadius: '100px', fontWeight: 700, fontSize: '1rem', border: `1px solid ${isDarkMode ? primaryColor + '44' : 'transparent'}`, transition: '0.3s' }}>
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
         <section id="certifications" style={{ padding: '10rem 6%', borderTop: isDarkMode ? `1px solid ${primaryColor}22` : '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '6rem', textAlign: 'center' }}>Professional <span style={{ color: primaryColor }}>Credentials</span></h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                  {data.certificates?.length > 0 ? (
                     data.certificates.map((c, i) => (
                        <div key={i} className="elite-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                           <div>
                              <div style={{ color: primaryColor, marginBottom: '1.5rem' }}>
                                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                              </div>
                              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>{c.name}</h3>
                              <p style={{ color: primaryColor, fontWeight: 700, marginBottom: '2rem', fontSize: '1.1rem' }}>{c.issuer}</p>
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
         <section id="contact" style={{ padding: '10rem 6%', background: isDarkMode ? '#0B0B0B' : '#f7fafc', borderTop: isDarkMode ? `4px solid ${primaryColor}` : 'none' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '8rem', color: primaryColor }}>Get In <span style={{ color: isDarkMode ? '#fff' : '#0B0B0B' }}>Touch</span></h2>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem' }}>
                  <div style={{ background: cardBg, borderRadius: '30px', padding: '3.5rem', boxShadow: isDarkMode ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)' }}>
                     <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>Send a Message</h3>
                     
                     <form action={`https://formsubmit.co/${data.email}`} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_subject" value={`New Portfolio Inquiry from ${data.name}!`} />

                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.8, display: 'block', marginBottom: '0.6rem' }}>Name</label>
                           <input type="text" name="name" required placeholder="Your Name" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: isDarkMode ? '#0B0B0B' : '#f3f4f6', border: `1px solid ${isDarkMode ? primaryColor + '44' : 'transparent'}`, color: 'inherit', fontWeight: 600 }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.8, display: 'block', marginBottom: '0.6rem' }}>Email</label>
                           <input type="email" name="email" required placeholder="Your Email" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: isDarkMode ? '#0B0B0B' : '#f3f4f6', border: `1px solid ${isDarkMode ? primaryColor + '44' : 'transparent'}`, color: 'inherit', fontWeight: 600 }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.8, display: 'block', marginBottom: '0.6rem' }}>Subject</label>
                           <input type="text" name="subject" required placeholder="Subject" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: isDarkMode ? '#0B0B0B' : '#f3f4f6', border: `1px solid ${isDarkMode ? primaryColor + '44' : 'transparent'}`, color: 'inherit', fontWeight: 600 }} />
                        </div>
                        <div>
                           <label style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.8, display: 'block', marginBottom: '0.6rem' }}>Message</label>
                           <textarea name="message" rows={5} required placeholder="Your Message" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: isDarkMode ? '#0B0B0B' : '#f3f4f6', border: `1px solid ${isDarkMode ? primaryColor + '44' : 'transparent'}`, color: 'inherit', fontWeight: 600 }}></textarea>
                        </div>
                        
                        <div style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1rem', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                           <input type="checkbox" style={{ width: '18px', height: '18px' }} required />
                           <span style={{ color: '#000', fontSize: '0.9rem' }}>I'm not a robot</span>
                           <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" style={{ width: '25px', marginLeft: 'auto' }} />
                        </div>

                        <button type="submit" className="cta-primary" style={{ width: '100%', marginTop: '1rem', boxShadow: `0 10px 20px ${primaryColor}44` }}>Send Message</button>
                     </form>
                  </div>

                  <div style={{ background: cardBg, borderRadius: '30px', padding: '3.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>Contact Information</h3>
                     
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                           <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                           <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.email}</span>
                        </div>
                        {data.phone && (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                              <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.phone}</span>
                           </div>
                        )}
                        {data.location && (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                              <div style={{ color: primaryColor }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{data.location}</span>
                           </div>
                        )}
                     </div>

                     <div style={{ marginTop: 'auto', borderRadius: '20px', overflow: 'hidden', border: `1px solid ${primaryColor}22`, height: '250px' }}>
                        <iframe 
                           width="100%" 
                           height="100%" 
                           frameBorder="0" 
                           style={{ border: 0, filter: isDarkMode ? 'invert(90%) hue-rotate(180deg) brightness(0.6)' : 'none' }} 
                           src={`https://www.google.com/maps?q=${encodeURIComponent(data.location || "Earth")}&output=embed`} 
                           allowFullScreen>
                        </iframe>
                     </div>
                  </div>
               </div>
            </div>
            <p style={{ marginTop: '10rem', opacity: 0.25, textAlign: 'center', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 900, userSelect: 'none', pointerEvents: 'none' }}>
               © {new Date().getFullYear()} @{data.name.toLowerCase().replace(/\s+/g, '')}. Created with <span style={{ color: primaryColor }}>PortGen.</span>
            </p>
         </section>
      </div>
   );
};

export default Card2;
