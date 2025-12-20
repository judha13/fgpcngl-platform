// hooks/useBlurFadeIn.ts
'use client';

import { useEffect } from 'react';

export default function useBlurFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-animated-up');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1, // 10% of element visible to trigger
      }
    );

    document.querySelectorAll('.blur_fade_in_up').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
