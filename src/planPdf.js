import { jsPDF } from 'jspdf';

// One-page PDF of a course plan (US Letter, landscape).
//
// This file ONLY draws the page. main.jsx gathers the plan and hands it in (see printPlan in main.jsx).
// When you have a printout template, this is the one file to change.
//
// `plan` looks like:
//   { planLabel, majors: [names], minors: [names], studentName, startTerm, gradTerm,
//     totalCredits, completedCredits, progress, notes: [text], url,
//     years: [{ number, label, credits, semesters: { fall: [c], spring: [c], summer: [c] }, locked: { fall, spring, summer } }] }
//   where each course c is { code, title, credits, type, taken, transferred }

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

// [fill, text] colours for each kind of course, matching the colours on the screen
const TYPE_STYLE = {
  gened:         ['#E5E7EB', '#374151'],
  core:          ['#DBEAFE', '#1D4ED8'],
  major:         ['#FFEDD5', '#C2410C'],
  majorElective: ['#FEF9C3', '#A16207'],
  minor:         ['#CCFBF1', '#0F766E'],
  minorElective: ['#CFFAFE', '#0E7490'],
  elective:      ['#F3E8FF', '#7E22CE'],
};
const LEGEND = [
  ['GenEd', 'gened'], ['SBS Core', 'core'], ['Major (required)', 'major'], ['Major (elective)', 'majorElective'],
  ['Minor', 'minor'], ['Free elective', 'elective'],
];
const SEMESTERS = [['fall', 'FALL'], ['spring', 'SPRING'], ['summer', 'SUMMER']];

export function makePlanPdf(plan) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
  doc.setProperties({ title: `CourseCoach plan: ${plan.planLabel}`, creator: 'CourseCoach' });
  const W = doc.internal.pageSize.getWidth();   // 792
  const H = doc.internal.pageSize.getHeight();  // 612
  const M = 28;

  const font = (style, size) => { doc.setFont('helvetica', style); doc.setFontSize(size); };
  const text = (h) => doc.setTextColor(...hex(h));
  const fit = (str, maxW) => {
    if (doc.getTextWidth(str) <= maxW) return str;
    let t = str;
    while (t.length > 1 && doc.getTextWidth(t + '...') > maxW) t = t.slice(0, -1);
    return t.trimEnd() + '...';
  };

  // ---------- Header ----------
  font('bold', 18); text('#111827');
  doc.textWithLink('CourseCoach', M, M + 14, { url: plan.url }); // the title links to the site
  font('normal', 10); text('#4B5563');
  doc.text(`Four-year plan: ${plan.planLabel}`, M, M + 28);

  const right = W - M;
  if (plan.studentName) { font('bold', 12); text('#111827'); doc.text(plan.studentName, right, M + 12, { align: 'right' }); }
  else { font('normal', 11); text('#6B7280'); doc.text('Name: ______________________________', right, M + 12, { align: 'right' }); }
  font('normal', 9); text('#4B5563');
  doc.text(`Started ${plan.startTerm}   |   Expected graduation ${plan.gradTerm}`, right, M + 25, { align: 'right' });
  font('normal', 7.5); text('#9CA3AF');
  doc.text(`Printed ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`, right, M + 36, { align: 'right' });

  doc.setDrawColor(...hex('#F59E0B')); doc.setLineWidth(1.5);
  doc.line(M, M + 42, W - M, M + 42);

  font('normal', 8.5); text('#374151');
  const summary = [
    `Major(s): ${plan.majors.join(' + ')}`,
    `Minor(s): ${plan.minors.length ? plan.minors.join(' + ') : 'none'}`,
    `Credits planned: ${plan.totalCredits}`,
    `Completed: ${plan.completedCredits} of 124 (${plan.progress}%)`,
  ].join('   |   ');
  doc.text(fit(summary, W - 2 * M), M, M + 56);

  // ---------- Grid area ----------
  const gridTop = M + 66;
  const noteLine = plan.notes && plan.notes.length ? plan.notes[0] : '';
  const gridBottom = H - 46 - (noteLine ? 11 : 0);
  const showSummer = plan.years.some(y => y.semesters.summer.length > 0);
  const sems = SEMESTERS.filter(([k]) => k !== 'summer' || showSummer);

  const labelW = 58, gap = 8, rowGap = 6, headH = 14, padB = 4;
  const colW = (W - M - (M + labelW + gap) - gap * (sems.length - 1)) / sems.length;
  const rowsN = plan.years.map(y => Math.max(1, ...sems.map(([k]) => y.semesters[k].length)));
  const sumN = rowsN.reduce((a, b) => a + b, 0);
  const fixed = plan.years.length * (headH + padB) + rowGap * (plan.years.length - 1);
  const lineH = Math.max(9, Math.min(17, (gridBottom - gridTop - fixed) / sumN));
  const fs = Math.min(9.5, lineH * 0.6);

  let y = gridTop;
  plan.years.forEach((yr, yi) => {
    const rowH = headH + rowsN[yi] * lineH + padB;

    // row background and year label
    doc.setFillColor(...hex('#F9FAFB')); doc.setDrawColor(...hex('#E5E7EB')); doc.setLineWidth(0.6);
    doc.roundedRect(M, y, W - 2 * M, rowH, 4, 4, 'FD');
    font('bold', 10); text('#B45309'); doc.text(`Year ${yr.number}`, M + 6, y + 14);
    font('normal', 7.5); text('#6B7280');
    doc.text(yr.label, M + 6, y + 24);
    doc.text(`${yr.credits} credits`, M + 6, y + 33);

    sems.forEach(([key, name], ci) => {
      const x = M + labelW + gap + ci * (colW + gap);
      const list = yr.semesters[key];
      const total = list.reduce((s, c) => s + c.credits, 0);

      // semester heading
      font('bold', 7.5); text('#6B7280');
      doc.text(name + (yr.locked[key] ? '  (locked)' : ''), x, y + 10);
      font('bold', 7.5); text(total > 20 ? '#DC2626' : total > 17 ? '#D97706' : '#6B7280');
      doc.text(`${total} cr`, x + colW, y + 10, { align: 'right' });

      list.forEach((c, i) => {
        const cy = y + headH + i * lineH;
        const [fill, ink] = TYPE_STYLE[c.type] || TYPE_STYLE.elective;
        doc.setFillColor(...hex(fill));
        doc.roundedRect(x, cy, colW, lineH - 1.5, 2, 2, 'F');
        const mid = cy + (lineH - 1.5) / 2;
        let tx = x + 4;
        if (c.taken) { // completed: a small green tick
          doc.setDrawColor(...hex('#16A34A')); doc.setLineWidth(1);
          doc.lines([[2, 2.2], [3.6, -4.6]], x + 3.5, mid, [1, 1], 'S');
          tx = x + 12;
        }
        const credit = `${c.credits}${c.transferred ? ' (T)' : ''}`;
        font('bold', fs); const creditW = doc.getTextWidth(credit);
        text(ink); doc.text(credit, x + colW - 4, mid + fs * 0.35, { align: 'right' });
        const room = x + colW - 4 - creditW - 4;
        font('normal', fs); // course codes are drawn in regular weight (only the credits are bold)
        const code = fit(c.code, room - tx);
        doc.text(code, tx, mid + fs * 0.35);
        const used = doc.getTextWidth(code) + 7;
        if (c.title && tx + used < room - 10) {
          font('normal', fs); text('#374151');
          doc.text(fit(c.title, room - tx - used), tx + used, mid + fs * 0.35);
        }
      });
    });
    y += rowH + rowGap;
  });

  // ---------- Footer ----------
  let fy = H - 40;
  if (noteLine) { font('italic', 7); text('#6B7280'); doc.text(fit(noteLine, W - 2 * M), M, gridBottom + 8); }
  let lx = M;
  font('normal', 7);
  LEGEND.forEach(([label, type]) => {
    doc.setFillColor(...hex(TYPE_STYLE[type][0])); doc.setDrawColor(...hex(TYPE_STYLE[type][1])); doc.setLineWidth(0.5);
    doc.roundedRect(lx, fy - 6, 9, 7, 1.5, 1.5, 'FD');
    text('#4B5563'); doc.text(label, lx + 12, fy);
    lx += 12 + doc.getTextWidth(label) + 12;
  });
  doc.setDrawColor(...hex('#16A34A')); doc.setLineWidth(1);
  doc.lines([[2, 2.2], [3.6, -4.6]], lx, fy - 3, [1, 1], 'S');
  text('#4B5563'); doc.text('Completed', lx + 11, fy); lx += 11 + doc.getTextWidth('Completed') + 12;
  doc.text('(T) Transfer credit', lx, fy);

  font('normal', 7); text('#9CA3AF');
  doc.text('CourseCoach is a planning aid, not an official degree audit. Confirm your plan with your faculty advisor or the Undergraduate Academic Advising Center.', W / 2, H - 22, { align: 'center' });
  doc.text('\u00A92027 Nesij Huvaj. All rights reserved.', W / 2, H - 12, { align: 'center' });

  const safe = plan.planLabel.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'plan';
  doc.save(`CourseCoach-${safe}.pdf`);
}
