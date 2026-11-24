import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { FullHelp, PLANNER_URL } from './helpContent.jsx';
import { BrandBadge, BrandBlock } from './brand.jsx';

function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-stretch gap-3">
            <BrandBadge />
            <BrandBlock />
          </div>
          <a
            href={PLANNER_URL}
            className="px-4 py-2 rounded-xl font-semibold text-white bg-amber-500 hover:bg-amber-600 whitespace-nowrap"
          >
            Open the planner
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10">
        <FullHelp />
      </main>

      <footer className="py-6 border-t border-gray-200 bg-white/60">
        <div className="max-w-3xl mx-auto px-6 text-center text-sm text-gray-500">
          <div>©2025 Nesij Huvaj. All rights reserved.</div>
          <div className="mt-1">
            This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="text-amber-600 hover:text-amber-700 underline" target="_blank">CC BY-NC-SA</a>.
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<HelpPage />);
