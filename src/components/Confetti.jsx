import React, { useEffect, useRef } from 'react';

const Confetti = ({ trigger }) => {
  const confettiAreaRef = useRef(null);

  const createConfetti = () => {
    if (!confettiAreaRef.current) return;

    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('confetti-particle');
      
      const startX = Math.random() * confettiAreaRef.current.offsetWidth;
      const startY = -Math.random() * 50; 

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      particle.style.animationDuration = `${3 + Math.random() * 2}s`; // 3-5 seconds
      particle.style.animationDelay = `${Math.random() * 0.5}s`; // 0-0.5 seconds delay

      confettiAreaRef.current.appendChild(particle);

      particle.onanimationend = () => {
        particle.remove();
      };
    }
  };

  useEffect(() => {
    if (trigger) {
      createConfetti();
    }
  }, [trigger]);

  return (
    <div id="confetti-area" ref={confettiAreaRef}></div>
  );
};

export default Confetti;