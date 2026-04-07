"use client";

import React, { useState, useEffect } from 'react';

// ELITE SCENE 2: FLOATING GOLDEN ORBS & MOUSE REACTIVE DEPTH
interface SceneProps {
   isDarkMode: boolean;
}

const Scene3D_2: React.FC<SceneProps> = ({ isDarkMode }) => {
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 40,
            y: (e.clientY / window.innerHeight - 0.5) * 40
         });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
   }, []);

   const bgColor = isDarkMode ? '#0B0B0B' : '#fffcf0';
   const orbColor = '#D4AF37';

   return (
      <div style={{ 
         width: '100%', 
         height: '100%', 
         background: bgColor, 
         overflow: 'hidden', 
         position: 'relative',
         transition: 'background 0.5s ease'
      }}>
         <style dangerouslySetInnerHTML={{
            __html: `
            .orb {
               position: absolute;
               border-radius: 50%;
               background: radial-gradient(circle at 30% 30%, ${orbColor}, transparent);
               filter: blur(2px);
               box-shadow: 0 0 30px ${orbColor}22;
               transition: transform 0.1s ease-out;
            }
            .glow-mesh {
               position: absolute;
               width: 100%;
               height: 100%;
               background: radial-gradient(circle at 50% 50%, ${orbColor}11, transparent);
               filter: blur(100px);
               opacity: ${isDarkMode ? '0.3' : '0.1'};
            }
            `
         }} />

         <div className="glow-mesh"></div>

         {/* Parallax Orbs */}
         {[...Array(6)].map((_, i) => (
            <div 
               key={i} 
               className="orb"
               style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  top: `${10 + i * 15}%`,
                  left: `${15 + i * 12}%`,
                  opacity: 0.15 - i * 0.02,
                  transform: `translate(${mousePos.x * (i + 1) * 0.2}px, ${mousePos.y * (i + 1) * 0.2}px)`,
                  zIndex: 1
               }}
            />
         ))}

         {/* Small Particles */}
         {[...Array(20)].map((_, i) => (
            <div 
               key={`p-${i}`} 
               style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: orbColor,
                  borderRadius: '50%',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.4,
                  transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                  boxShadow: `0 0 10px ${orbColor}`
               }}
            />
         ))}
      </div>
   );
};

export default Scene3D_2;
