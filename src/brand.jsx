import React, { useCallback, useLayoutEffect, useRef } from 'react';

// The CourseCoach logo pieces, shared by the planner (main.jsx) and the help page (help.jsx).

// A cocoa (cacao) pod: a pointed oval with ridges and a short stem, drawn in white for the orange badge.
// Edit the shapes here to change the icon.
export function CocoaIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform="rotate(35 12 12)">
        {/* the pod */}
        <path d="M12 3 C18 6.5 19 15 12 22 C5 15 6 6.5 12 3 Z" fill="currentColor" fillOpacity="0.22" />
        {/* the ridges that run along a cacao pod */}
        <path d="M12 3.5 C9.6 9 9.6 16 12 21.5" />
        <path d="M12 3.5 C14.4 9 14.4 16 12 21.5" />
        <path d="M12 4 L12 21" strokeWidth="1.1" />
        {/* the stem */}
        <path d="M12 3 C12 1.8 12.7 1.1 13.8 1" />
      </g>
    </svg>
  );
}

// The orange badge: cocoa icon above the short name. It is as tall as the title block beside it.
export function BrandBadge() {
  return (
    <div className="self-stretch min-h-[48px] px-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center gap-0.5 text-white font-bold text-base leading-none tracking-tight shadow-lg flex-shrink-0">
      <CocoaIcon className="w-6 h-6" />
      <span>CouCoa</span>
    </div>
  );
}

// "CourseCoach" with the two lines of the school name under it. Each line is scaled so it is exactly as wide as the title.
export function BrandBlock({ asHeading = false }) {
  const titleRef = useRef(null);
  const lineA = useRef(null);
  const lineB = useRef(null);

  const fit = useCallback(() => {
    const title = titleRef.current;
    if (!title) return;
    const width = title.getBoundingClientRect().width;
    if (!width) return;
    [lineA, lineB].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      el.style.fontSize = '100px'; // measure at a known size, then scale to the title's width
      const natural = el.getBoundingClientRect().width;
      if (natural) el.style.fontSize = (100 * width) / natural + 'px';
    });
  }, []);

  useLayoutEffect(() => {
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); // again once the web fonts have loaded
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);

  const Title = asHeading ? 'h1' : 'div';
  return (
    <div className="flex flex-col justify-center">
      <Title ref={titleRef} className="w-max text-2xl font-bold text-gray-900 serif leading-tight">CourseCoach</Title>
      <span ref={lineA} className="block w-max whitespace-nowrap leading-tight text-gray-600" style={{ fontSize: 17 }}>Suffolk University</span>
      <span ref={lineB} className="block w-max whitespace-nowrap leading-tight text-gray-500" style={{ fontSize: 13 }}>Sawyer Business School</span>
    </div>
  );
}
