"use client";

import React from 'react';

interface Scene3DProps {
   isDarkMode: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ isDarkMode }) => {
   const spaceBg = isDarkMode ? '#030712' : '#f8fafc';
   const nebula1 = isDarkMode ? '#6366f1' : '#3b82f6';
   const nebula2 = isDarkMode ? '#10b981' : '#14b8a6';
   const nebula3 = isDarkMode ? '#8b5cf6' : '#a855f7';
   const starColor = isDarkMode ? 'white' : '#1e293b'; // Dark slate for light mode visibility
   const starOpacity = isDarkMode ? '0.1' : '0.4'; // Higher opacity for light mode

   return (
      <div style={{ 
         width: '100%', 
         height: '100%', 
         background: spaceBg, 
         overflow: 'hidden', 
         position: 'relative',
         transition: 'background 0.5s ease'
      }}>
         <style dangerouslySetInnerHTML={{
            __html: `
            .nebula-container {
               position: absolute;
               width: 100%;
               height: 100%;
               filter: blur(80px);
               opacity: ${isDarkMode ? '0.6' : '0.8'}; /* Increased opacity for light mode */
               transition: all 0.5s ease;
               z-index: 1;
            }
            .nebula-ball {
               position: absolute;
               border-radius: 50%;
               filter: blur(40px);
               animation: float 25s infinite alternate ease-in-out;
               transition: background 0.5s ease;
            }
            @keyframes float {
               0% { transform: translate(0, 0) scale(1); }
               33% { transform: translate(15vw, 15vh) scale(1.3); }
               66% { transform: translate(-10vw, 20vh) scale(0.7); }
               100% { transform: translate(10vw, -15vh) scale(1.1); }
            }
            .nebula-1 { width: 700px; height: 700px; background: radial-gradient(circle, ${nebula1}, transparent); top: -150px; left: -150px; }
            .nebula-2 { width: 600px; height: 600px; background: radial-gradient(circle, ${nebula2}, transparent); bottom: -150px; right: -50px; animation-delay: -7s; }
            .nebula-3 { width: 500px; height: 500px; background: radial-gradient(circle, ${nebula3}, transparent); top: 25%; left: 45%; animation-delay: -12s; }

            .stars {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background: transparent;
               background-image: radial-gradient(${starColor} 2px, transparent 2px); /* Slightly larger stars */
               background-size: 80px 80px;
               opacity: ${starOpacity};
               transition: opacity 0.5s ease;
               z-index: 2;
            }
            `
         }} />
         <div className="nebula-container">
            <div className="nebula-ball nebula-1"></div>
            <div className="nebula-ball nebula-2"></div>
            <div className="nebula-ball nebula-3"></div>
         </div>
         <div className="stars"></div>
      </div>
   );
};

export default Scene3D;
