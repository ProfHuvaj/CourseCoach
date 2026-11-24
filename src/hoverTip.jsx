import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

// An instant tooltip for any element (the browser's built-in tooltips wait a second or more).
// It is drawn on top of the page, so a box that clips its contents (like a semester column) cannot cut it off.
//
//   const tip = useHoverTip();
//   <div onMouseEnter={tip.show} onMouseLeave={tip.hide}> ... </div>
//   {tip.render(<>the message</>)}    // draws nothing unless the pointer is over the element and there is a message
export function useHoverTip() {
  const [pos, setPos] = useState(null);

  const show = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, top: r.top, bottom: r.bottom });
  }, []);
  const hide = useCallback(() => setPos(null), []);

  const render = (content) => {
    if (!pos || !content) return null;
    const above = pos.top > 160; // draw above the element when there is room, otherwise below it
    const style = {
      position: 'fixed',
      left: Math.max(8, Math.min(pos.x - 170, window.innerWidth - 348)),
      ...(above ? { bottom: window.innerHeight - pos.top + 8 } : { top: pos.bottom + 8 }),
    };
    return ReactDOM.createPortal(
      <div
        role="tooltip"
        style={style}
        className="pointer-events-none z-[70] w-[340px] rounded-lg bg-gray-900 px-3 py-2 text-xs leading-relaxed text-white shadow-xl"
      >
        {content}
      </div>,
      document.body
    );
  };

  return { show, hide, render };
}
