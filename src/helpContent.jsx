import React, { useEffect, useRef } from 'react';

// Edit the wording of the help page in this one file.
// It feeds both the quick-start pop-up (on the planner) and the full help page (help.html).

export const ADVISING_URL =
  'https://www.suffolk.edu/academics/advising-student-services/undergraduate-academic-advising-center';

const BASE = import.meta.env.BASE_URL; // "/CourseCoach/"
export const HELP_URL = BASE + 'help.html';
export const PLANNER_URL = BASE;

const linkClass = 'text-amber-600 hover:text-amber-700 underline';

export function Contact() {
  return (
    <p>
      For any specific questions or concerns regarding your program of studies, contact either your faculty advisor
      listed on your academic record on Workday or the{' '}
      <a href={ADVISING_URL} className={linkClass} target="_blank" rel="noopener noreferrer">
        Undergraduate Academic Advising Center
      </a>
      .
    </p>
  );
}

export function Disclaimer() {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-gray-700 space-y-2">
      <p>
        <strong>CourseCoach is a planning aid, not an official degree audit.</strong> The courses, requirements and
        credit counts shown here may not match your official record. Always confirm your plan with an advisor.
      </p>
      <Contact />
    </div>
  );
}

const quickSteps = [
  {
    title: 'Pick your major(s) and minor(s)',
    text: 'Use the boxes at the top. You can choose up to two majors and up to two minors. Each new combination opens its own plan tab, so you can compare options side by side.',
  },
  {
    title: 'Arrange your semesters',
    text: 'Drag a course card to another semester, summers included, or use the small up and down arrows on a card to reorder it.',
  },
  {
    title: 'Choose specific courses',
    text: 'Click Select on a card to pick a course from the list, or mark it Transferred. Some cards, such as Math or an elective, also let you type a course in.',
  },
  {
    title: 'Mark what you have finished',
    text: 'Tick "Completed?" on finished courses and they count toward your Degree Progress. Lock a semester when it is final.',
  },
  {
    title: 'Watch your credits',
    text: 'Regular tuition covers up to 17 credits in a semester. Credits over 17 cost extra, and 21 is the maximum.',
  },
];

export function QuickStart() {
  return (
    <ol className="space-y-3">
      {quickSteps.map((s, i) => (
        <li key={s.title} className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <div>
            <div className="font-semibold text-gray-900">{s.title}</div>
            <div className="text-sm text-gray-600">{s.text}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function HelpModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-bounce-in"
      >
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-between rounded-t-2xl">
          <h2 id="help-modal-title" className="text-xl font-bold text-white serif">Quick start</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close quick start"
            className="w-8 h-8 rounded-full text-white text-2xl leading-none hover:bg-white/20"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <QuickStart />
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 text-sm text-gray-700">
            <strong>Your plan is not saved.</strong> If you refresh or close the page, it resets. Take a screenshot or
            print the page (Ctrl+P) before you leave.
          </div>
          <Disclaimer />
        </div>
        <div className="sticky bottom-0 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <a href={HELP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-600 hover:text-amber-700 underline">
            Open the full help page ↗
          </a>
          <button onClick={onClose} className="px-5 py-2 rounded-xl font-semibold text-white bg-amber-500 hover:bg-amber-600">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 serif mb-3">{title}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

function Faq({ q, children }) {
  return (
    <details className="group bg-white rounded-xl border border-gray-200 px-4 py-3">
      <summary className="cursor-pointer font-semibold text-gray-900">{q}</summary>
      <div className="mt-2 text-gray-700 space-y-2">{children}</div>
    </details>
  );
}

const toc = [
  ['start', 'Getting started'],
  ['courses', 'Working with courses'],
  ['semesters', 'Semesters and credits'],
  ['progress', 'Tracking your progress'],
  ['faq', 'FAQ and troubleshooting'],
  ['help', 'Questions about your degree'],
];

export function FullHelp() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 serif">How to use CourseCoach</h1>
        <p className="mt-2 text-lg text-gray-600">
          CourseCoach helps Sawyer Business School undergraduates sketch a four-year plan, try out majors and minors,
          and see how their credits add up.
        </p>
      </div>

      <Disclaimer />

      <nav aria-label="Help sections" className="rounded-xl bg-white border border-gray-200 p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">On this page</div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {toc.map(([id, label]) => (
            <li key={id}><a href={'#' + id} className={linkClass}>{label}</a></li>
          ))}
        </ul>
      </nav>

      <Section id="start" title="Getting started">
        <p>The page is built from a few parts, from top to bottom:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Selected Major(s) and Selected Minor(s).</strong> Choose up to two of each. A major always stays selected.</li>
          <li><strong>Degree Progress.</strong> Shows how many of the 124 credits you have completed. It sits in the Overview box with your major and minor choices.</li>
          <li><strong>BSBA Graduation Requirements.</strong> Bars for General Education, SBS Core, your major and free electives, split into transfer credit, Suffolk credit, and what remains.</li>
          <li><strong>Plans.</strong> Switch between plan tabs, or view all years or just one.</li>
          <li><strong>The four-year plan.</strong> Each year has a Fall and a Spring column of course cards, plus a Summer tab you can open when you need it.</li>
        </ul>
        <p>On wider screens, a legend in the header explains the card colors, and a menu on the left jumps to each section and each year.</p>
        <p>
          <strong>Comparing options.</strong> Each time you choose a new combination of majors and minors, CourseCoach
          opens a new plan tab, or takes you back to the tab you already have for that combination. Use the × on a
          tab to close a plan you no longer need.
        </p>
        <p>
          CourseCoach works best on a computer. Dragging can be awkward on a touch screen, so use the up and down
          arrows on each card instead.
        </p>
      </Section>

      <Section id="courses" title="Working with courses">
        <p>Each card shows the course code, its title, what kind of requirement it fills, and its credits.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Move a course.</strong> Drag the card to another semester, or use the small up and down arrows on
            the card to change its order within a semester.
          </li>
          <li>
            <strong>Select.</strong> Click <em>Select</em> on a card to open a menu. Choose a course from the list (for
            categories that have one), or choose <em>Transferred</em> if you earned the credit elsewhere. Cards where
            you decide the course, such as Math, other General Education areas and electives, also offer
            <em> Enter manually…</em> so you can type your own course code and title. Courses the curriculum names
            exactly, such as WRI-101 or SBS-100, are fixed, so they have no manual entry. The SBS Core
            <em> Business Area</em> card lets you pick EC-102, ACCT-202 or ISOM-319, unless your major requires one of
            them. Choose <em>Select</em> again to put a card back as it was.
          </li>
          <li>
            <strong>Completed?</strong> Tick the box when you have finished the course. Its credits then count toward
            your degree progress. Courses marked <em>Transferred</em> show (T) and count as completed.
          </li>
        </ul>
      </Section>

      <Section id="semesters" title="Semesters and credits">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Credit totals.</strong> Each semester shows its total credits, and each year shows the credits
            planned.
          </li>
          <li>
            <strong>Credit warning.</strong> Regular tuition covers up to and including 17 credits in a semester.
            Credits over 17 are billed extra. You cannot take more than 21 credits in a semester. If you drag a course
            into a semester that would pass 21, the move is cancelled and a message explains why.
          </li>
          <li>
            <strong>Lock a semester.</strong> Click <em>Lock</em> beside a semester when it is final. It turns gray and
            cannot be changed. Click <em>Unlock</em> to edit it again.
          </li>
          <li>
            <strong>Summers.</strong> Most students do not take summer courses, so each year shows a slim Summer tab
            on its right edge. Click the tab to open the Summer column, or drag a course onto the tab and it opens by
            itself. A summer that has courses in it stays open. An empty one has a Hide button.
          </li>
        </ul>
      </Section>

      <Section id="progress" title="Tracking your progress">
        <ul className="list-disc pl-6 space-y-2">
          <li>The <strong>Degree Progress</strong> ring shows the share of the 124 credits you have completed.</li>
          <li>
            The <strong>BSBA Graduation Requirements</strong> bars fill as you tick
            courses complete. Transfer credit and Suffolk credit are shown in different shades.
          </li>
          <li>Notes can appear on the page when something needs your attention, for example when a course counts toward more than one program.</li>
        </ul>
      </Section>

      <Section id="faq" title="FAQ and troubleshooting">
        <div className="space-y-2">
          <Faq q="My plan disappeared when I refreshed the page. Can I get it back?">
            <p>
              No. CourseCoach does not save your plan yet, so refreshing, closing the tab or going back resets
              everything. Before you leave, take a screenshot or print the page (Ctrl+P on Windows, Cmd+P on Mac) to
              keep a copy.
            </p>
          </Faq>
          <Faq q="Can I put my own name and dates at the top?">
            <p>
              Yes. Type your name or an alias in the name box (up to 30 characters), then pick your starting semester
              and your expected graduation semester from the lists. When you pick a starting semester, the expected
              graduation semester fills in automatically (seven semesters later), and you can change it. None of this
              is saved or sent anywhere. It is only for your own reference on this page.
            </p>
          </Faq>
          <Faq q="Is this my official degree audit?">
            <p>
              No. CourseCoach is a planning aid. Your official record is kept by the University, so confirm your plan
              with an advisor before you register.
            </p>
          </Faq>
          <Faq q="I can't move or change a course.">
            <p>
              The semester is probably locked. Locked semesters are grayed out. Click <em>Unlock</em> next to the
              semester name, then try again.
            </p>
          </Faq>
          <Faq q="A dragged course snapped back.">
            <p>
              The move would have put more than 21 credits in that semester, which is not allowed. Choose a lighter
              semester, or move another course out first.
            </p>
          </Faq>
          <Faq q="The course I need isn't in the Select list.">
            <p>
              If the card offers <em>Enter manually…</em> (for example Math, a General Education area or an elective),
              choose it and type the course code and title. Courses the curriculum names exactly are fixed, so check
              with an advisor if one does not match your record.
            </p>
          </Faq>
          <Faq q="Dragging doesn't work on my phone or tablet.">
            <p>Use the up and down arrows on each card, or open CourseCoach on a computer.</p>
          </Faq>
          <Faq q="The page looks wrong or won't load.">
            <p>
              Refresh the page and try again, or try a different browser. Keep in mind that refreshing resets your
              plan.
            </p>
          </Faq>
        </div>
      </Section>

      <Section id="help" title="Questions about your degree">
        <Contact />
      </Section>
    </div>
  );
}
