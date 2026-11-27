// Reads a Workday "View Academic Progress" report (.xlsx) and places its courses into a plan.
// No external library: an .xlsx file is a zip archive, and this reads only the two parts it needs.
//
// The report lists a course once for every requirement it counts toward, so rows are merged by course.
// Completed = the Status is "Satisfied", or the row has a grade and is not marked "(In Progress)".
// (The Status column belongs to the requirement, so a completed course can sit on an "In Progress" requirement row.)

// Requirement rows that name a slot in the plan, for courses whose own code is not in the plan (checked after the code)
const REQUIREMENT_SLOT = {
  "Math Course": (c) => c.name === "Math",
  "Creativity and Innovation Course": (c) => c.name === "CI",
  "Social, Cultural and Global Perspective Course": (c) => c.name === "SCGP",
  "Science Technology and Engineering Courses: BSBA Degrees": (c) => c.name === "STE",
  "Business Law and Ethics Course": (c) => /^BLE-21[456]$/.test(c.name),
  "Statistics Course": (c) => /^STATS-2[45]0$/.test(c.name),
  "Entrepreneurship Major Elective Courses": (c) => c.type === "majorElective" && (c.programs || []).includes("M:ENT"),
};

const keyOf = (text) => String(text).replace(/[^A-Za-z0-9]/g, "").toUpperCase();

// ---------- reading the .xlsx file ----------

function readZipDirectory(buf) {
  const dv = new DataView(buf), u8 = new Uint8Array(buf);
  let eocd = -1;
  for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("This file is not a valid Excel (.xlsx) file.");
  const count = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  const entries = {};
  for (let n = 0; n < count; n++) {
    if (dv.getUint32(p, true) !== 0x02014b50) throw new Error("The Excel file is damaged.");
    const method = dv.getUint16(p + 10, true);
    const size = dv.getUint32(p + 24, true);
    const compSize = dv.getUint32(p + 20, true);
    const nameLen = dv.getUint16(p + 28, true), extraLen = dv.getUint16(p + 30, true), commentLen = dv.getUint16(p + 32, true);
    const localOff = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(u8.subarray(p + 46, p + 46 + nameLen));
    entries[name] = { method, compSize, size, localOff };
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

async function unzipEntry(buf, entry) {
  if (entry.size > 20 * 1024 * 1024) throw new Error("The Excel file is too large to be a progress report.");
  const dv = new DataView(buf), u8 = new Uint8Array(buf);
  const p = entry.localOff;
  if (dv.getUint32(p, true) !== 0x04034b50) throw new Error("The Excel file is damaged.");
  const start = p + 30 + dv.getUint16(p + 26, true) + dv.getUint16(p + 28, true);
  const data = u8.subarray(start, start + entry.compSize);
  if (entry.method === 0) return data;
  if (entry.method === 8) {
    const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
  throw new Error("This Excel file uses a compression method that is not supported.");
}

const textOf = (el) => [...el.getElementsByTagName("t")].map(t => t.textContent).join("");
const parseXml = (bytes) => new DOMParser().parseFromString(new TextDecoder().decode(bytes), "application/xml");
const colIndex = (ref) => { let n = 0; for (const ch of /^[A-Z]+/.exec(ref)[0]) n = n * 26 + (ch.charCodeAt(0) - 64); return n - 1; };

async function readSheetRows(buf) {
  const entries = readZipDirectory(buf);
  const sheetName = Object.keys(entries).sort().find(n => /^xl\/worksheets\/sheet\d*\.xml$/.test(n));
  if (!sheetName) throw new Error("No worksheet was found in this Excel file.");
  const shared = entries["xl/sharedStrings.xml"]
    ? [...parseXml(await unzipEntry(buf, entries["xl/sharedStrings.xml"])).getElementsByTagName("si")].map(textOf)
    : [];
  const doc = parseXml(await unzipEntry(buf, entries[sheetName]));
  const rows = [];
  for (const rowEl of doc.getElementsByTagName("row")) {
    const row = [];
    for (const c of rowEl.getElementsByTagName("c")) {
      const t = c.getAttribute("t");
      const v = c.getElementsByTagName("v")[0];
      let val = "";
      if (t === "inlineStr") val = textOf(c);
      else if (t === "s") val = v ? (shared[Number(v.textContent)] || "") : "";
      else val = v ? v.textContent : "";
      row[colIndex(c.getAttribute("r"))] = val;
    }
    rows.push(Array.from(row, v => v ?? ""));
  }
  return rows;
}

// ---------- reading the Workday rows ----------

export function parseWorkdayRows(rows) {
  const headerIdx = rows.findIndex(r => r.some(v => /^registrations?\s+used$/i.test(String(v).trim())));
  if (headerIdx < 0) throw new Error("This does not look like a Workday academic progress report: the \"Registrations Used\" column was not found.");
  const head = rows[headerIdx].map(v => String(v).trim().toLowerCase());
  const col = {
    req: head.indexOf("requirement"),
    status: head.indexOf("status"),
    reg: head.findIndex(h => /^registrations?\s+used$/.test(h)),
    period: head.indexOf("academic period"),
    credits: head.indexOf("credits"),
    grade: head.indexOf("grade"),
  };
  if (col.status < 0 || col.period < 0 || col.credits < 0) throw new Error("The report is missing the Status, Academic Period or Credits column.");

  const groups = new Map(), warnings = [];
  rows.slice(headerIdx + 1).forEach(r => {
    const reg = String(r[col.reg] || "").trim();
    if (!reg) return;
    const m = /^([A-Za-z][A-Za-z.&]*)\s*(H?)\s*(\d{2,4})\s*-\s*(.+)$/.exec(reg);
    if (!m) { warnings.push(`Could not read this course: ${reg}`); return; }
    const dept = m[1].toUpperCase(), num = m[3];
    const key = keyOf(dept + num);                 // SBS H101 (honors) is keyed as SBS101, the same as SBS-101
    const code = `${dept}-${num}`;
    const inProgress = /\(In Progress\)\s*$/i.test(m[4]);
    const title = m[4].replace(/\s*\(In Progress\)\s*$/i, "").trim();   // full title kept; the screen shortens it
    const pm = /^(Fall|Spring)\s+(\d{4})$/i.exec(String(r[col.period] || "").trim());
    if (!pm) { warnings.push(`${code} is in a term other than Fall or Spring and was not imported.`); return; }
    const term = `${pm[1][0].toUpperCase()}${pm[1].slice(1).toLowerCase()} ${pm[2]}`;
    const status = String(r[col.status] || "").trim();
    const grade = String(r[col.grade] ?? "").trim();
    const requirement = String(r[col.req] || "").trim();

    let g = groups.get(key);
    if (!g) {
      g = { key, code, title, term, credits: Number(r[col.credits]) || 0, grade: "", completed: false, requirements: new Set() };
      groups.set(key, g);
    }
    if (status === "Satisfied" || (grade && !inProgress)) g.completed = true;
    if (grade && !g.grade) g.grade = grade;
    if (requirement) g.requirements.add(requirement);
  });

  const courses = [...groups.values()].map(g => ({ ...g, requirements: [...g.requirements] }));
  return { courses, warnings };
}

export async function readWorkdayRecord(file) {
  const rows = await readSheetRows(await file.arrayBuffer());
  return parseWorkdayRows(rows);
}

// ---------- placing the courses into a plan ----------

// "Fall 2025" -> academic year start and half (0 = Fall, 1 = Spring)
const parseTerm = (term) => {
  const [s, y] = term.split(" ");
  const Y = Number(y);
  return s === "Fall" ? { acad: Y, half: 0 } : { acad: Y - 1, half: 1 };
};

// plan: {year1: {fall: [cards], spring: [cards]}, ...}; semesters: the plan's ordered [year, semester] list.
// Returns {plan, locks, summary} or {error}.
export function placeRecord(plan, courses, { entryTerm, semesters, bizOptions = [] }) {
  const entry = parseTerm(entryTerm);
  const idxOf = (term) => { const t = parseTerm(term); return (t.acad - entry.acad) * 2 + t.half; };
  const before = courses.filter(c => idxOf(c.term) < 0);
  if (before.length) {
    return { error: `${before.length} course(s) are in a term before the starting term (${entryTerm}). Set "Started" to the student's first term, then import again.` };
  }
  const latest = Math.max(...courses.map(c => idxOf(c.term)));
  const lastIdx = semesters.length - 1;
  const isLocked = (idx) => idx <= latest - 2;   // past semesters: two or more terms before the latest term in the record

  const out = JSON.parse(JSON.stringify(plan));
  const pool = semesters.flatMap(([y, s]) => (out[y][s] || []).map(card => ({ card, y, s })));
  semesters.forEach(([y, s]) => { out[y][s] = []; });
  const used = new Set();
  const take = (pred) => pool.find(p => !used.has(p.card) && pred(p.card, p));

  const fill = (card, course) => {
    card.fullName = course.title;
    card.credits = course.credits;
    card.taken = course.completed;
    card.inProgress = !course.completed;
    card.grade = course.grade || undefined;
    card.transferred = false;
    card.recordCode = true;
  };

  const summary = { completedCredits: 0, inProgressCredits: 0, completed: 0, inProgress: 0, notInCurriculum: [] };
  const ordered = [...courses].sort((a, b) => idxOf(a.term) - idxOf(b.term));
  ordered.forEach(course => {
    const idx = Math.min(idxOf(course.term), lastIdx);
    const [y, s] = semesters[idx];
    let hit = take(c => keyOf(c.name) === course.key);
    if (!hit && bizOptions.includes(course.code)) hit = take(c => c.name === "Business Area" || bizOptions.includes(c.name));
    if (!hit) {
      const slot = course.requirements.map(r => REQUIREMENT_SLOT[r]).find(Boolean);
      if (slot) hit = take(slot);
    }
    let card;
    if (hit) {
      card = hit.card;
      used.add(card);
      if (keyOf(card.name) !== course.key) card.name = course.code;
    } else {
      // Not in the curriculum: default treatment is a free elective (in the same term if possible)
      const sameTerm = pool.find(p => !used.has(p.card) && p.card.type === "elective" && p.y === y && p.s === s);
      const pick = sameTerm || take(c => c.type === "elective");
      if (pick) { card = pick.card; used.add(card); card.name = course.code; }
      else card = { id: `rec-${course.key}`, name: course.code, fullName: course.title, credits: course.credits, type: "elective", programs: [] };
      summary.notInCurriculum.push(course.code);
    }
    fill(card, course);
    out[y][s].push(card);
    if (course.completed) { summary.completed += 1; summary.completedCredits += course.credits; }
    else { summary.inProgress += 1; summary.inProgressCredits += course.credits; }
  });

  // Template cards nobody filled: requirements move to the first open term; unused free-elective placeholders in past terms are dropped
  const firstOpen = semesters.findIndex((_, idx) => !isLocked(idx));
  pool.forEach(p => {
    if (used.has(p.card)) return;
    const idx = semesters.findIndex(([y, s]) => y === p.y && s === p.s);
    if (!isLocked(idx)) out[p.y][p.s].push(p.card);
    else if (p.card.type !== "elective" && firstOpen >= 0) out[semesters[firstOpen][0]][semesters[firstOpen][1]].push(p.card);
  });

  const locks = {};
  semesters.forEach(([y, s], idx) => { if (isLocked(idx)) locks[`${y}.${s}`] = true; });
  return { plan: out, locks, summary };
}
