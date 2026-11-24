import React, { useCallback, useId, useLayoutEffect, useRef } from 'react';

// The CourseCoach logo pieces, shared by the planner (main.jsx) and the help page (help.jsx).

// The cocoa icon: an opened cacao pod showing its seeds, a closed pod behind it, a stem and two leaves.
// It is a white silhouette with cut-out details, so it takes the colour of the text around it (white on the orange badge).
// Everything is drawn in a 64 x 64 box. In the mask, white shapes show and black shapes cut holes.
export function CocoaIcon({ className = 'w-9 h-9' }) {
  const id = 'cocoa-' + useId().replace(/:/g, '');
  const pod = 'M0 -19 C13 -10 13 10 0 19 C-13 10 -13 -10 0 -19 Z';      // a pointed oval, standing upright
  const cavity = 'M0 -14.5 C8.5 -7 8.5 7 0 14.5 C-8.5 7 -8.5 -7 0 -14.5 Z'; // the hollow of the opened pod
  const seeds = [                                                          // x, y, half-width, half-height, tilt
    [0, -11, 2, 1.9, 0],
    [-2.9, -6, 2.5, 2.1, -18], [2.9, -6, 2.5, 2.1, 18],
    [-2.9, -0.5, 2.5, 2.1, -18], [2.9, -0.5, 2.5, 2.1, 18],
    [-2.9, 5, 2.5, 2.1, -18], [2.9, 5, 2.5, 2.1, 18],
    [0, 10.5, 2, 1.9, 0],
  ];
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          {/* stems that join the pods and leaves to the branch */}
          <path d="M40 18 C40 12 43 8 49 4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M44.5 24 C45.5 18 46.5 13 47.5 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          {/* two leaves, each with a cut-out midrib */}
          <path d="M44 10 C38 2 28 1 22 4 C28 11 38 14 44 10 Z" fill="#fff" />
          <path d="M42 9.6 C36 8 29 6 24.5 4.6" fill="none" stroke="#000" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M47 8 C52 3.5 59 5.5 62 14 C56 15.5 50 13.5 47 8 Z" fill="#fff" />
          <path d="M49 8.8 C53 9.5 58 11 60.5 13" fill="none" stroke="#000" strokeWidth="1.1" strokeLinecap="round" />
          {/* the closed pod behind: ridges cut into it */}
          <g transform="translate(50 38) rotate(-22) scale(0.9)">
            <path d={pod} transform="scale(0.9 0.9)" fill="#fff" />
            <path d="M0 -15 C-4.5 -6 -4.5 6 0 15" fill="none" stroke="#000" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M0 -15 C4.5 -6 4.5 6 0 15" fill="none" stroke="#000" strokeWidth="1.3" strokeLinecap="round" />
          </g>
          {/* the opened pod in front, with a thin gap around it, its hollow cut out and the seeds put back */}
          <g transform="translate(28 37) rotate(32) scale(1.2)">
            <path d={pod} fill="#000" stroke="#000" strokeWidth="2.6" strokeLinejoin="round" />
            <path d={pod} fill="#fff" />
            <path d={cavity} fill="#000" />
            {seeds.map(([x, y, rx, ry, tilt], i) => (
              <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${tilt} ${x} ${y})`} fill="#fff" />
            ))}
          </g>
        </mask>
      </defs>
      <rect width="64" height="64" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
}

// The orange badge: cocoa icon above the short name. It is as tall as the title block beside it.
export function BrandBadge() {
  return (
    <div className="self-stretch min-h-[48px] px-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center gap-0.5 text-white font-bold text-base leading-none tracking-tight shadow-lg flex-shrink-0">
      <CocoaIcon className="w-9 h-9" />
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
