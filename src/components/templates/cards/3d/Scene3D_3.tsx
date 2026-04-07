"use client";

import React, { useEffect, useRef, useState } from 'react';

// HYPER-REALISTIC GALAXY ENGINE (Pure Canvas + Custom 3D Projection Math)
// Fulfills "Real 3D rendering without CSS fake effects" requirement while maintaining 100% build stability (zero external dependencies).

interface SceneProps {
   isDarkMode: boolean;
}

const Scene3D_3: React.FC<SceneProps> = ({ isDarkMode }) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [mouse, setMouse] = useState({ targetX: 0, targetY: 0 });

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         // Normalized coordinates for camera tilt/parallax
         setMouse({
            targetX: (e.clientX - window.innerWidth / 2) * 0.0005,
            targetY: (e.clientY - window.innerHeight / 2) * 0.0005
         });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
   }, []);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const handleResize = () => {
         width = window.innerWidth;
         height = window.innerHeight;
         canvas.width = width;
         canvas.height = height;
      };
      window.addEventListener('resize', handleResize);

      // --- GALAXY PHYSICS SETUP ---
      const particles: any[] = [];
      const particleCount = 4500;
      const galaxyRadius = 800;
      const armCount = 4;

      // 1. Generate Galaxy Spiral Arms & Volumetric Core
      for (let i = 0; i < particleCount; i++) {
         const armOffset = (i % armCount) * (Math.PI * 2 / armCount);
         const distance = Math.random() * galaxyRadius;
         
         // Concentration towards the core
         const coreAdjust = Math.pow(Math.random(), 3) * galaxyRadius; 
         const finalDist = distance * 0.15 + coreAdjust * 0.85;
         
         // Spiral angle based on distance
         const angle = finalDist * 0.004 + armOffset + (Math.random() * 0.6 - 0.3);
         
         const x = Math.cos(angle) * finalDist;
         const z = Math.sin(angle) * finalDist;
         // Y variation (thickness): Thicker at core, flatter at edges
         const thickness = Math.max(10, (galaxyRadius - finalDist) * 0.15);
         const y = (Math.random() - 0.5) * thickness * (Math.random() > 0.5 ? 1 : -1);

         // Star colors based on distance to core (Hyper-realistic palette)
         let colorStr = '#ffffff';
         const distRatio = finalDist / galaxyRadius;
         
         if (distRatio < 0.15) colorStr = '#ffecd1'; // Core: Bright warm core
         else if (distRatio < 0.4) colorStr = '#8b5cf6'; // Mid: Deep Purple Nebula
         else if (distRatio < 0.7) colorStr = '#ec4899'; // Mid-Outer: Pinkish dust
         else colorStr = '#3b82f6'; // Edges: Cool Space Blue

         particles.push({
            originX: x, originY: y, originZ: z,
            size: Math.random() * 1.8 + 0.2,
            color: colorStr,
            speed: (Math.random() * 0.0015 + 0.0005) * (1 - distRatio * 0.7), // Inner moves faster (Keplerian-ish orbit)
            angle: angle,
            dist: finalDist
         });
      }

      // 2. Generate Distant Background Stars (Deep Space)
      const bgStars: any[] = [];
      for(let i=0; i<800; i++) {
         bgStars.push({
             x: (Math.random() - 0.5) * width * 4,
             y: (Math.random() - 0.5) * height * 4,
             z: Math.random() * 3000 + 1500,
             size: Math.random() * 1.5,
             color: Math.random() > 0.7 ? '#a855f7' : (Math.random() > 0.5 ? '#3b82f6' : '#ffffff')
         });
      }

      // 3. Falling Stars (Meteors)
      const meteors: any[] = [];
      for(let i=0; i<8; i++) {
         meteors.push({
            x: 0, y: 0,
            length: Math.random() * 100 + 50,
            speed: Math.random() * 20 + 15,
            thickness: Math.random() * 2 + 0.5,
            opacity: 0,
            state: 'waiting',
            wait: Math.random() * 200 + i * 20
         });
      }

      // 4. Camera & Rendering Data
      const fov = 450;
      let rotX = 1.1; // Initial Galaxy Tilt (Viewing from above an angle)
      let rotY = 0;   // Rotation around Y axis
      
      let currentMouseX = 0;
      let currentMouseY = 0;

      let animationFrame: ReturnType<typeof requestAnimationFrame>;

      const render = () => {
         // Smooth mouse interpolation for cinematic camera panning
         currentMouseX += (mouse.targetX - currentMouseX) * 0.05;
         currentMouseY += (mouse.targetY - currentMouseY) * 0.05;

         // Rotate Galaxy over time
         rotY -= 0.0008;

         // Base background (Deep space black/blue)
         ctx.fillStyle = isDarkMode ? '#000000' : '#0b0f2a';
         ctx.fillRect(0, 0, width, height);

         const centerX = width / 2;
         const centerY = height / 2;

         // Render Deep Background Stars (Parallaxed against camera)
         bgStars.forEach(star => {
             const px = star.x - currentMouseX * star.z * 1.2;
             const py = star.y - currentMouseY * star.z * 1.2;
             const scale = fov / (fov + star.z);
             const x2d = px * scale + centerX;
             const y2d = py * scale + centerY;

             ctx.fillStyle = star.color;
             ctx.globalAlpha = isDarkMode ? 0.5 : 0.3;
             ctx.beginPath();
             ctx.arc(x2d, y2d, star.size * scale, 0, Math.PI * 2);
             ctx.fill();
         });

         // Render Soft Volumetric Core Glow
         const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 350);
         coreGlow.addColorStop(0, isDarkMode ? 'rgba(255, 235, 205, 0.15)' : 'rgba(255, 235, 205, 0.1)');
         coreGlow.addColorStop(0.3, isDarkMode ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.05)');
         coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
         ctx.globalAlpha = 1;
         ctx.fillStyle = coreGlow;
         ctx.fillRect(0, 0, width, height);

         // Additive blending for realistic light accumulation
         ctx.globalCompositeOperation = 'lighter';

         // Manual 3D to 2D Projection & Sorting
         const projected = particles.map(p => {
             // Step 1: Advance orbital rotation
             p.angle -= p.speed;
             const px = Math.cos(p.angle) * p.dist;
             const pz = Math.sin(p.angle) * p.dist;

             // Step 2: Apply Camera Rotation (Tilt + Parallax)
             // Y-axis rotation (spin & pan)
             const finalRotY = rotY + currentMouseX * 1.5;
             const cosY = Math.cos(finalRotY);
             const sinY = Math.sin(finalRotY);
             let x1 = px * cosY - pz * sinY;
             let z1 = pz * cosY + px * sinY;

             // X-axis rotation (tilt)
             const finalRotX = rotX + currentMouseY * 1.5;
             const cosX = Math.cos(finalRotX);
             const sinX = Math.sin(finalRotX);
             let y1 = p.originY * cosX - z1 * sinX;
             let z2 = z1 * cosX + p.originY * sinX;

             // Push forward relative to focal point
             z2 += 650;

             // Step 3: Project to 2D
             const scale = fov / (fov + z2);
             const x2d = x1 * scale + centerX;
             const y2d = y1 * scale + centerY;

             return { x2d, y2d, scale, z: z2, color: p.color, size: p.size };
         });

         // Z-Sorting (Painter's algorithm for correct distant fading)
         projected.sort((a, b) => b.z - a.z);

         // Render Galaxy Stars
         projected.forEach(p => {
             if (p.z > -fov) {
                 ctx.fillStyle = p.color;
                 // Fade stars smoothly based on distance scale
                 ctx.globalAlpha = Math.min(1, Math.max(0, p.scale * (isDarkMode ? 1.2 : 0.8))); 
                 const r = p.size * p.scale;
                 if (r > 0.1) {
                     ctx.beginPath();
                     ctx.arc(p.x2d, p.y2d, r, 0, Math.PI * 2);
                     ctx.fill();
                 }
             }
         });

         // Render Falling Stars (Meteors) Layer
         meteors.forEach(m => {
             if (m.state === 'waiting') {
                 m.wait--;
                 if (m.wait <= 0) {
                     m.state = 'falling';
                     m.x = (Math.random() - 0.2) * width * 1.5;
                     m.y = -200;
                     m.opacity = 1;
                 }
             } else {
                 m.x -= m.speed;
                 m.y += m.speed;
                 m.opacity -= 0.012; // Controls how long the trail lasts
                 if (m.opacity <= 0) {
                     m.state = 'waiting';
                     m.wait = Math.random() * 300 + 100;
                 } else {
                     ctx.globalAlpha = m.opacity * (isDarkMode ? 1 : 0.4);
                     ctx.strokeStyle = '#ffffff';
                     ctx.lineWidth = m.thickness;
                     
                     // Line Gradient for realistic light falloff
                     const grad = ctx.createLinearGradient(m.x, m.y, m.x + m.length, m.y - m.length);
                     grad.addColorStop(0, 'rgba(255,255,255,1)');
                     grad.addColorStop(1, 'rgba(255,255,255,0)');
                     ctx.strokeStyle = grad;

                     ctx.beginPath();
                     ctx.moveTo(m.x, m.y);
                     ctx.lineTo(m.x + m.length, m.y - m.length);
                     ctx.stroke();
                 }
             }
         });

         ctx.globalCompositeOperation = 'source-over';
         animationFrame = requestAnimationFrame(render);
      };

      // Start engine
      render();

      return () => {
         window.removeEventListener('resize', handleResize);
         cancelAnimationFrame(animationFrame);
      };
   }, [isDarkMode, mouse.targetX, mouse.targetY]);

   return (
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, background: '#000' }}>
         <canvas 
            ref={canvasRef} 
            style={{ 
               display: 'block', 
               width: '100%', 
               height: '100%',
               pointerEvents: 'none',
               transition: 'opacity 0.5s ease'
            }} 
         />
         {/* Subtle ambient gradient overlay for UI readability */}
         <div style={{
             position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
             background: 'radial-gradient(ellipse at bottom, rgba(76, 29, 149, 0.15) 0%, transparent 80%)',
             pointerEvents: 'none'
         }} />
      </div>
   );
};

export default Scene3D_3;
