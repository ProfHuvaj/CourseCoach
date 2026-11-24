import React, { useLayoutEffect, useRef, useState } from 'react';

// The "BSBA Graduation Requirements" bar: one horizontal bar made of coloured sections (GenEd, SBS Core, major(s),
// minor(s), Free Electives). Each section is as wide as its share of the plan's credits and carries its own progress bar.
//
// `segments` is a list of:
//   { key, label, href?, grow, taken, total, transfer, suffolk, theme: {box, text, fill, track},
//     tipTitle, tipLines: [text] }
// A section shows "label  taken/total" when that fits on one line. When it is too narrow it tries the short label (the
// course code, e.g. "ENT"), then only "taken/total", and when even that does not fit it shows no text at all
// (hover the section to read everything).

function ProgressBar({ transfer, suffolk, total, fill, track }) {
  const safe = total || 1;
  const transferPct = Math.min(100, (transfer / safe) * 100);
  const suffolkPct = Math.min(100 - transferPct, (suffolk / safe) * 100);
  return (
    <div className={`h-2.5 ${track} rounded-full overflow-hidden flex`}>
      {transfer > 0 && (
        <div
          className="h-full bg-gray-500 transition-all duration-300"
          style={{ width: `${transferPct}%`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 2px, transparent 2px 4px)' }}
        ></div>
      )}
      {suffolk > 0 && <div className={`h-full ${fill} transition-all duration-300`} style={{ width: `${suffolkPct}%` }}></div>}
    </div>
  );
}

function Segment({ seg, align }) {
  const boxRef = useRef(null);
  const labelRef = useRef(null);
  const numRef = useRef(null);
  const shortRef = useRef(null);
  const [mode, setMode] = useState('full'); // 'full' | 'short' | 'numbers' | 'none'
  const PAD = 16; // the section's left and right padding (px-2)

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const room = box.clientWidth - PAD;
      const labelW = labelRef.current ? labelRef.current.offsetWidth : 0;
      const numW = numRef.current ? numRef.current.offsetWidth : 0;
      const shortW = shortRef.current ? shortRef.current.offsetWidth : 0;
      setMode(room >= labelW + numW + 8 ? 'full' : (seg.shortLabel && room >= shortW + numW + 8) ? 'short' : room >= numW ? 'numbers' : 'none');
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => ro.disconnect();
  }, [seg.label, seg.shortLabel, seg.taken, seg.total]);

  const { theme } = seg;
  const tipPos = align === 'left' ? 'left-0' : align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div
      style={{ flex: `${seg.grow} 1 0%` }}
      className="relative group min-w-0 flex"
      tabIndex={0}
      aria-label={`${seg.tipTitle}: ${seg.taken} of ${seg.total} credits`}
    >
      {/* the padding and border are on this inner box so the sections are exactly as wide as their share of the credits */}
      <div ref={boxRef} className={`flex-1 min-w-0 rounded-lg border px-2 py-2 ${theme.box}`}>
      {mode !== 'none' && (
        <div className={`flex items-center gap-1 text-xs ${mode === 'numbers' ? 'justify-center' : 'justify-between'}`}>
          {(mode === 'full' || mode === 'short') && (
            <span className={`truncate font-medium ${theme.text}`}>
              {seg.href
                ? <a href={seg.href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:decoration-solid">{mode === 'short' ? seg.shortLabel : seg.label}</a>
                : (mode === 'short' ? seg.shortLabel : seg.label)}
            </span>
          )}
          <span className={`font-bold whitespace-nowrap ${theme.text}`}>{seg.taken}/{seg.total}</span>
        </div>
      )}
      <div className={mode === 'none' ? '' : 'mt-1.5'}>
        <ProgressBar transfer={seg.transfer} suffolk={seg.suffolk} total={seg.total} fill={theme.fill} track={theme.track} />
      </div>

      </div>

      {/* hover / keyboard-focus tooltip with the full curriculum name */}
      <div role="tooltip" className={`pointer-events-none absolute bottom-full mb-1.5 z-30 hidden group-hover:block group-focus:block w-max max-w-[280px] rounded-md bg-gray-900 px-2.5 py-1.5 text-xs text-white shadow-lg ${tipPos}`}>
        <div className="font-semibold">{seg.tipTitle}</div>
        {seg.tipLines.map((line) => <div key={line} className="text-gray-300">{line}</div>)}
      </div>

      {/* hidden copies of the text, used only to measure whether it fits */}
      <span ref={labelRef} aria-hidden="true" className="invisible absolute left-0 top-0 whitespace-nowrap text-xs font-medium pointer-events-none">{seg.label}</span>
      {seg.shortLabel && <span ref={shortRef} aria-hidden="true" className="invisible absolute left-0 top-0 whitespace-nowrap text-xs font-medium pointer-events-none">{seg.shortLabel}</span>}
      <span ref={numRef} aria-hidden="true" className="invisible absolute left-0 top-0 whitespace-nowrap text-xs font-bold pointer-events-none">{seg.taken}/{seg.total}</span>
    </div>
  );
}

export function RequirementsBar({ segments }) {
  return (
    <div className="flex w-full items-stretch gap-1">
      {segments.map((seg, i) => (
        <Segment key={seg.key} seg={seg} align={i === 0 ? 'left' : i === segments.length - 1 ? 'right' : 'center'} />
      ))}
    </div>
  );
}
