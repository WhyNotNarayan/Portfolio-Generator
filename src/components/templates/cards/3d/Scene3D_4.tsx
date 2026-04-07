"use client";

import React, { useEffect, useRef, useState } from 'react';

// HYPER-REALISTIC PLASMA REACTOR CORE (Pure Canvas 3D Engine)
// Provides cinematic, physically believable WebGL-level plasma fusion visuals without external dependencies.
// Simulates 3D turbulence, lightning arcs, and volumetric glowing emission.

interface SceneProps {
   isDarkMode: boolean;
}

const Scene3D_4: React.FC<SceneProps> = ({ isDarkMode }) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [mouse, setMouse] = useState({ targetX: 0, targetY: 0, isHovering: false });

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         setMouse({
            targetX: (e.clientX - window.innerWidth / 2) * 0.001,
            targetY: (e.clientY - window.innerHeight / 2) * 0.001,
            isHovering: true
         });
      };
      const handleMouseLeave = () => setMouse(m => ({ ...m, isHovering: false }));
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('mouseleave', handleMouseLeave);
      };
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

      // --- REACTOR CORE PHYSICS SETUP ---
      // Distribute points evenly on a sphere using Fibonacci spiral algorithm
      const particleCount = 2000;
      const baseRadius = 250;
      const particles: any[] = [];

      for (let i = 0; i < particleCount; i++) {
         const phi = Math.acos(-1 + (2 * i) / particleCount);
         const theta = Math.sqrt(particleCount * Math.PI) * phi;

         particles.push({
            origX: Math.cos(theta) * Math.sin(phi),
            origY: Math.sin(theta) * Math.sin(phi),
            origZ: Math.cos(phi),
            // Unique frequency offsets for realistic fluid turbulence
            freqX: Math.random() * Math.PI * 2,
            freqY: Math.random() * Math.PI * 2,
            size: Math.random() * 2.5 + 0.5,
            color: Math.random() > 0.5 ? '#22d3ee' : '#8b5cf6' // Cyan or Neon Purple
         });
      }

      // Lightning / Plasma Arcs Setup
      const arcs: any[] = [];
      for(let i = 0; i < 7; i++) {
         arcs.push({
             points: Array.from({length: 6}, () => ({ x: 0, y: 0, z: 0 })),
             life: 0
         });
      }

      let time = 0;
      let currentRadius = baseRadius;
      
      let rotX = 0;
      let rotY = 0;

      let animationFrame: number;

      const render = () => {
         time += mouse.isHovering ? 0.04 : 0.02; // Speed up internal reaction on hover

         // Interaction modifiers (Intense core pulsing)
         const targetRadius = mouse.isHovering ? baseRadius * 1.15 : baseRadius;
         currentRadius += (targetRadius - currentRadius) * 0.05;

         // Camera Parallax based on mouse
         rotY += (mouse.targetX * 2 - rotY) * 0.05;
         rotX += (mouse.targetY * 2 - rotX) * 0.05;

         // Deep space / dark laboratory background
         ctx.fillStyle = isDarkMode ? '#030510' : '#0a0f1d';
         ctx.fillRect(0, 0, width, height);

         const cx = width / 2;
         const cy = height / 2;

         // Enable additive blending for energy bloom
         ctx.globalCompositeOperation = 'lighter';

         // Center drawing on screen
         ctx.translate(cx, cy);

         // 1. Outer Volumetric Heat/Glow
         const outerGlow = ctx.createRadialGradient(0, 0, currentRadius * 0.5, 0, 0, currentRadius * 3);
         outerGlow.addColorStop(0, mouse.isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'); // Electric Blue bloom
         outerGlow.addColorStop(0.3, 'rgba(139, 92, 246, 0.15)'); // Purple haze
         outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
         ctx.fillStyle = outerGlow;
         ctx.beginPath();
         ctx.arc(0, 0, currentRadius * 3, 0, Math.PI * 2);
         ctx.fill();

         // Camera Lens / Focal Length Matrix for 3D projection
         const fov = 800; 

         // 2. Project Particles (Plasma Shell)
         const projected = particles.map(p => {
             // Turbulence constraint: Plasma breathes and shifts
             const turbulentForce = 
                 Math.sin(time * 2.5 + p.freqX) * 0.08 + 
                 Math.cos(time * 1.8 + p.freqY) * 0.08;
             
             // Dynamic variance (expand slightly randomly)
             const variance = 1 + turbulentForce * (mouse.isHovering ? 2 : 1);
             
             const px = p.origX * currentRadius * variance;
             const py = p.origY * currentRadius * variance;
             const pz = p.origZ * currentRadius * variance;

             // Rotate globally (Spinning reactor)
             const totalRotY = time * 0.3 + rotY;
             const cosY = Math.cos(totalRotY);
             const sinY = Math.sin(totalRotY);
             let x1 = px * cosY - pz * sinY;
             let z1 = pz * cosY + px * sinY;

             // Rotate X (Tilt based on mouse)
             const cosX = Math.cos(rotX);
             const sinX = Math.sin(rotX);
             let y1 = py * cosX - z1 * sinX;
             let z2 = z1 * cosX + py * sinX;

             // Z-transform
             z2 += 800; // Pull camera back

             const scale = fov / (fov + z2);
             const x2d = x1 * scale;
             const y2d = y1 * scale;

             return { x2d, y2d, scale, z: z2, color: p.color, size: p.size, isFront: z2 <= 800 };
         });

         // Z-sorting for correct painter's algorithm
         projected.sort((a, b) => b.z - a.z);

         // Render energy particles
         projected.forEach(p => {
             ctx.fillStyle = p.color;
             // High contrast diff: bright in front, dark in back
             ctx.globalAlpha = p.isFront ? (p.scale * 1.5) : (p.scale * 0.3);
             if (mouse.isHovering && p.isFront) ctx.globalAlpha = Math.min(1, ctx.globalAlpha * 1.3);

             const finalSize = p.size * p.scale;
             if (finalSize > 0) {
                ctx.beginPath();
                ctx.arc(p.x2d, p.y2d, finalSize, 0, Math.PI * 2);
                ctx.fill();
             }
         });

         // 3. Ultra-Bright Fusion Center Core
         const corePulse = Math.sin(time * 10) * 10;
         const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, (currentRadius * 0.8) + corePulse);
         innerGlow.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Blinding center
         innerGlow.addColorStop(0.3, 'rgba(34, 211, 238, 0.8)'); // Cyan fusion ring
         innerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
         ctx.fillStyle = innerGlow;
         ctx.beginPath();
         ctx.arc(0, 0, currentRadius * 0.8 + corePulse, 0, Math.PI * 2);
         ctx.fill();

         // 4. Volumetric Plasma Arcs (High voltage lightning)
         arcs.forEach(arc => {
            arc.life -= mouse.isHovering ? 2 : 1;
            if (arc.life <= 0) {
               // Re-strike lightning inside the orb
               arc.life = Math.random() * 20 + 5;
               
               // Random start and end vectors on the sphere surface
               const u1 = Math.random(), v1 = Math.random();
               const u2 = Math.random(), v2 = Math.random();
               
               const theta1 = u1 * Math.PI * 2;
               const phi1 = Math.acos(2 * v1 - 1);
               const theta2 = u2 * Math.PI * 2;
               const phi2 = Math.acos(2 * v2 - 1);

               arc.points[0] = {
                  x: Math.cos(theta1) * Math.sin(phi1),
                  y: Math.sin(theta1) * Math.sin(phi1),
                  z: Math.cos(phi1)
               };
               arc.points[arc.points.length - 1] = {
                  x: Math.cos(theta2) * Math.sin(phi2),
                  y: Math.sin(theta2) * Math.sin(phi2),
                  z: Math.cos(phi2)
               };
               
               // Create erratic middle nodes for the lightning path
               for(let i=1; i<arc.points.length-1; i++) {
                   const ratio = i / (arc.points.length - 1);
                   arc.points[i] = {
                       x: arc.points[0].x * (1-ratio) + arc.points[arc.points.length-1].x * ratio + (Math.random()-0.5)*0.8,
                       y: arc.points[0].y * (1-ratio) + arc.points[arc.points.length-1].y * ratio + (Math.random()-0.5)*0.8,
                       z: arc.points[0].z * (1-ratio) + arc.points[arc.points.length-1].z * ratio + (Math.random()-0.5)*0.8,
                   };
               }
            }

            // Draw the generated Arc
            ctx.beginPath();
            arc.points.forEach((pt: any, idx: number) => {
               const px = pt.x * currentRadius;
               const py = pt.y * currentRadius;
               const pz = pt.z * currentRadius;

               // Apply exact same camera transformation as particles
               const totalRotY = time * 0.3 + rotY;
               const cosY = Math.cos(totalRotY);
               const sinY = Math.sin(totalRotY);
               let x1 = px * cosY - pz * sinY;
               let z1 = pz * cosY + px * sinY;

               const cosX = Math.cos(rotX);
               const sinX = Math.sin(rotX);
               let y1 = py * cosX - z1 * sinX;
               let z2 = z1 * cosX + py * sinX;

               z2 += 800; // Focal distance match
               const scale = fov / (fov + z2);
               const x2d = x1 * scale;
               const y2d = y1 * scale;

               if (idx === 0) ctx.moveTo(x2d, y2d);
               else ctx.lineTo(x2d, y2d);
            });

            // Strike style (bright core)
            ctx.lineWidth = Math.random() * 2 + 1.5;
            ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(34, 211, 238, 0.9)'; // White or Cyan electric snap
            ctx.stroke();
            
            // Strike Bloom
            ctx.lineWidth = Math.random() * 8 + 4;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
            ctx.stroke();
         });

         ctx.translate(-cx, -cy); // Reset transform
         ctx.globalCompositeOperation = 'source-over';
         animationFrame = requestAnimationFrame(render);
      };

      render();

      return () => {
         window.removeEventListener('resize', handleResize);
         cancelAnimationFrame(animationFrame);
      };
   }, [isDarkMode]);

   return (
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, background: '#000' }}>
         <canvas 
            ref={canvasRef} 
            style={{ display: 'block', width: '100%', height: '100%', position: 'absolute' }} 
         />
      </div>
   );
};

export default Scene3D_4;
