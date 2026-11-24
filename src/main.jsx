import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HelpModal } from './helpContent.jsx';
import { BrandBadge, BrandBlock } from './brand.jsx';
import { RequirementsBar } from './reqBar.jsx';

    const initialCourseData = {
      year1: {
        fall: [
          { id: "math", name: "Math", fullName: "GenEd Math", credits: 4, type: "gened", taken: true, transferred: true },
          { id: "wri101", name: "WRI-101", fullName: "1st Year Writing I", credits: 4, type: "gened", taken: true, transferred: true },
          { id: "sbs100", name: "SBS-100", fullName: "Career Start", credits: 1, type: "core", taken: true, transferred: false },
          { id: "sbs101", name: "SBS-101", fullName: "Business Foundations", credits: 3, type: "core", taken: true, transferred: false },
          { id: "sib101", name: "SIB-101", fullName: "Globalization", credits: 3, type: "core", taken: true, transferred: false },
        ],
        spring: [
          { id: "ci", name: "CI", fullName: "Creativity & Innovation", credits: 3, type: "gened", taken: true, transferred: false },
          { id: "sbs104", name: "SBS-104", fullName: "Innovative Teaming", credits: 3, type: "core", taken: true, transferred: false },
          { id: "sbs110", name: "SBS-110", fullName: "Business Communication", credits: 3, type: "core", taken: true, transferred: false },
          { id: "stats240", name: "STATS-240", fullName: "Statistics", credits: 4, type: "core", taken: true, transferred: true },
          { id: "ec101", name: "EC-101", fullName: "Microeconomics", credits: 3, type: "core", taken: true, transferred: false },
        ],
        summer: [
        ],
      },
      year2: {
        fall: [
          { id: "acct201", name: "ACCT-201", fullName: "Accounting for Decision Making", credits: 3, type: "core", taken: true, transferred: true },
          { id: "mkt210", name: "MKT-210", fullName: "Introduction to Marketing", credits: 3, type: "core", taken: true, transferred: false },
          { id: "isom210", name: "ISOM-210", fullName: "Management Information Systems", credits: 3, type: "core", taken: true, transferred: false },
          { id: "mgt217", name: "MGT-217", fullName: "Organizational Behavior", credits: 3, type: "core", taken: true, transferred: false },
          { id: "ble216", name: "BLE-216", fullName: "Business Law and Ethics", credits: 3, type: "core", taken: true, transferred: false },
        ],
        spring: [
          { id: "wri102", name: "WRI-102", fullName: "1st Year Writing II", credits: 4, type: "gened", taken: true, transferred: false },
          { id: "isom201", name: "ISOM-201", fullName: "Data and Decision Analysis", credits: 3, type: "core", taken: true, transferred: false },
          { id: "fin200", name: "FIN-200", fullName: "Business Finance", credits: 3, type: "core", taken: true, transferred: false },
          { id: "bizarea", name: "Business Area", fullName: "EC-102, ACCT-202, or ISOM-319", credits: 3, type: "core", taken: true, transferred: true },
          { id: "sbs298", name: "SBS-298", fullName: "Global Wicked Problems", credits: 3, type: "core", taken: true, transferred: false },
        ],
        summer: [
        ],
      },
      year3: {
        fall: [
          { id: "ent201", name: "ENT-201", fullName: "Creating Value", credits: 3, type: "major", taken: false, transferred: false },
          { id: "entel1", name: "ENT Elective", fullName: "Major elective (1/3)", credits: 3, type: "majorElective", taken: false, transferred: false },
          { id: "free1", name: "Free Elective 1", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free2", name: "Free Elective 2", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free3", name: "Free Elective 3", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
        ],
        spring: [
          { id: "scgp", name: "SCGP", fullName: "Social, Cultural, Global Perspectives", credits: 4, type: "gened", taken: false, transferred: false },
          { id: "ent319", name: "ENT-319", fullName: "Measuring Value", credits: 3, type: "major", taken: false, transferred: false },
          { id: "entel2", name: "ENT Elective", fullName: "Major elective (2/3)", credits: 3, type: "majorElective", taken: false, transferred: false },
          { id: "free4", name: "Free Elective 4", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free5", name: "Free Elective 5", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
        ],
        summer: [
        ],
      },
      year4: {
        fall: [
          { id: "sib429", name: "SIB-429", fullName: "Strategic Management", credits: 3, type: "core", taken: false, transferred: false },
          { id: "ent419", name: "ENT-419", fullName: "Delivering Value", credits: 3, type: "major", taken: false, transferred: false },
          { id: "entel3", name: "ENT Elective", fullName: "Major elective (3/3)", credits: 3, type: "majorElective", taken: false, transferred: false },
          { id: "free6", name: "Free Elective 6", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free7", name: "Free Elective 7", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
        ],
        spring: [
          { id: "ste", name: "STE", fullName: "Science, Technology, and Engineering", credits: 4, type: "gened", taken: false, transferred: false },
          { id: "free8", name: "Free Elective 8", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free9", name: "Free Elective 9", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free10", name: "Free Elective 10", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
          { id: "free11", name: "Free Elective 11", fullName: "Any approved course", credits: 3, type: "elective", taken: false, transferred: false },
        ],
        summer: [
        ],
      },
    };

    // Sort order for course types
    const typeOrder = { gened: 0, core: 1, major: 2, majorElective: 3, minor: 4, minorElective: 5, elective: 6 };

    const COURSE_TITLES = {"ACCT-310": "International Business Accounting", "ACCT-415": "Not-For-Profit Accounting and Control", "ACCT-520": "Accounting Internship", "ACCT-550": "Special Topics", "SEED-383": "SEED Accounting Clinic", "ISOM-211": "Cloud Computing and Network Infrastructure", "ISOM-215": "Mobile App Development", "ISOM-230": "Big Data, Business Intelligence and Analytics", "ISOM-232": "Sports Analytics in Action!", "ISOM-240": "Data Privacy and Digital Forensics", "ISOM-260": "Artificial Intelligence for Business", "ISOM-313": "Business Systems Development", "ISOM-330": "Machine Learning for Business Analytics", "ISOM-340": "Cybersecurity Fundamentals", "ISOM-341": "Project Management for the Modern Organizations", "ISOM-360": "Building AI Agents for Business Applications", "ISOM-424": "Consulting Project", "ISOM-440": "ERP Systems and Intelligent Business Process Transformation", "ISOM-510": "Independent Study in Information Systems and Operations Management", "ISOM-550": "Special Topics", "EC-131": "Environmental Economics", "EC-141": "Development Economics", "EC-151": "Economic and Human Geography", "EC-261": "Behavioral Economics", "EC-311": "Intermediate Micro Theory", "EC-402": "Mathematical Economics", "EC-420": "Economics of Sports", "EC-421": "Public Finance", "EC-430": "International Trade Theory and Policy", "EC-442": "International Monetary Economics", "EC-443": "Economics of Cryptocurrencies And Blockchain Technology", "EC-445": "The Economics of the European Union", "EC-451": "AI-Powered Forecasting", "EC-460": "Game Theory", "EC-483": "Money, Banking and Financial Markets", "EC-503": "Internship in Economics", "EC-510": "Economics Independent Study", "ACCT-320": "Federal Taxation", "ACCT-430": "Accounting Information Systems", "ACCT-431": "Auditing and Assurance Services", "FIN-315": "Principles of Investments", "FIN-319": "Money and Capital Markets", "FIN-411": "Futures and Options", "FIN-413": "Investment Analysis and Portfolio Management", "FIN-419": "Applied Financial Strategy", "FIN-432": "Risk Management and Financial Institutions", "ENT-211": "The Sports Institute: Opportunities in the Sports Industry", "ENT-241": "Development Economics", "ENT-333": "Real Estate for Entrepreneurs", "ENT-336": "Family Business: The Family", "ENT-337": "Family Business: The Business", "ENT-350": "Social Entrepreneurship", "ENT-352": "Green and Sustainable Business", "ENT-353": "Corporate Entrepreneurship", "ENT-354": "Global Entrepreneurship", "ENT-355": "Design Thinking for Business", "ENT-367": "Franchising", "ENT-377": "Small Business Consulting", "ENT-399": "Technology Entrepreneurship", "ENT-510": "Entrepreneurship Independent Study", "ENT-521": "Entrepreneurship Internship", "ENT-550": "Special Topics", "MGT-305": "Negotiations", "SIB-550": "Global Travel Seminar", "SEED-380": "SEED Consulting Clinic", "SEED-381": "SEED Resource Acquisition Clinic", "SEED-382": "SEED Marketing and Communications", "SEED-384": "SEED Design Clinic", "FIN-313": "General Insurance", "FIN-317": "Real Estate Finance", "FIN-330": "Introduction to FinTech", "FIN-350": "Venture Capital and Private Equity", "FIN-401": "Practical Financial Planning", "FIN-409": "Securities Analysis", "FIN-410": "Analysis of Financial Statements", "FIN-415": "Capital Budgeting", "FIN-424": "Retirement and Estate Planning", "FIN-430": "The Blockchain Revolution", "FIN-445": "Quantitative Analysis and Trading of Financial Instruments", "FIN-475": "Case Studies in Financial Planning", "FIN-480": "Applied Quantitative Finance with Python and AI", "FIN-510": "Independent Study in Finance", "FIN-550": "Special Topics", "SIB-340": "Global Innovation", "SIB-400": "", "SIB-510": "", "SIB-520": "", "SIB-540": "", "BLE-317": "Managing in the Global Legal Environment", "BLE-325": "Global Business Ethics", "CJN-482": "", "FIN-417": "Multinational Financial Management", "MGT-313": "Global Human Resource Management", "MGT-322": "Managing Across Differences", "MGT-341": "Managing a Global Workforce", "MKT-421": "Global Marketing", "CJN-470": "", "POLS-310": "", "POLS-367": "", "POLS-382": "", "POLS-387": "", "POLS-389": "", "POLS-411": "", "POLS-463": "", "POLS-509": "", "SPAN-315": "", "MGT-310": "Applied Managerial Skills", "MGT-350": "Special Topics", "MGT-385": "Managing Difficult People at Work", "MGT-411": "Workplace Engagement, Power, and Voice", "MGT-520": "Management Internship", "HLTH-301": "Healthcare in the United States", "P.AD-325": "Nonprofit Management", "MKT-310": "Storytelling and Personal Brand Building", "MKT-315": "Integrated Marketing Communication", "MKT-360": "Event Marketing Practicum", "MKT-415": "Content and Influencer Marketing", "MKT-418": "Beyond the Click: Topics in Consumer Privacy and Well Being", "MKT-420": "Marketing for Entrepreneurs", "MKT-423": "Global Retail Strategy", "MKT-424": "Sports Partnership, Activation, and Engagement", "MKT-426": "Sports Marketing", "MKT-427": "Global Supply Chain Relationships", "MKT-428": "The Business of Sports and the Media", "MKT-429": "eSports and Gaming: Marketing Insights from the New Frontier", "MKT-440": "New Product Development", "MKT-442": "Brand Marketing", "MKT-444": "Social Media Marketing", "MKT-450": "Marketing with Generative AI", "MKT-456": "Digital Marketing Analytics", "MKT-499": "Customer Insights and Decision Making", "MKT-510": "Directed Study", "MKT-520": "Marketing Internship", "MKT-530": "Marketing Practicum", "MKT-550": "Special Topics", "ADPR-458": "Advanced Sports Public Relations", "CJN-302": "Sports Journalism", "EC-320": "Economics of Sports", "SPMT-410": "Advanced Topics in Sports Management", "SPMT-510": "Sports Management Independent Study", "SPMT-520": "Sports Management Internship", "SPMT-521": "Maine Celtics Internship", "SPMT-530": "Sports Management Practicum", "SPMT-550": "Special Topics", "ACCT-331": "Cost Accounting", "BLE-315": "Legal Lessons for Business Startups Organizations", "SCM-550": "Special Topics", "ACCT-202": "Accounting for Decision Making II", "ACCT-321": "Intermediate Accounting I", "ACCT-322": "Intermediate Accounting II", "ACCT-450": "Accounting Theory and Practice", "ISOM-130": "Introduction to Business Analytics", "ISOM-316": "Coding for Business", "ISOM-319": "Operations Management", "ISOM-323": "Database Management", "EC-312": "Intermediate Macro Theory", "EC-350": "Data Analytics for Economics and Business", "EC-432": "Managerial Economics", "EC-450": "Applied Econometrics", "EC-490": "Senior Seminar in Economics", "ACCT-440": "Corporate Accounting and Financial Management", "FIN-311": "Intermediate Finance", "ENT-201": "Creating Value", "ENT-319": "Measuring Value", "ENT-419": "Delivering Value", "SIB-101": "Globalization", "SIB-321": "Introduction to International Business", "SIB-419": "Global Business Theory and Practice", "Advanced Course 1": "Customized Program of Study (2+ disciplines)", "Advanced Course 2": "Customized Program of Study (2+ disciplines)", "Advanced Course 3": "Customized Program of Study (2+ disciplines)", "Advanced Course 4": "Customized Program of Study (2+ disciplines)", "Advanced Course 5": "Customized Program of Study (2+ disciplines)", "Advanced Course 6": "Customized Program of Study (2+ disciplines)", "MGT-360": "Leadership 360 Practicum", "MGT-419": "Management Consulting Project", "MKT-317": "Consumer Behavior", "MKT-320": "Marketing Research Methods and Tools in the Age of Generative AI", "MKT-322": "Marketing Analytics", "MKT-419": "Marketing Policies and Strategies", "BLE-324": "Sports Ethics & Law", "SPMT-419": "Sports Management Capstone", "ISOM-351": "Supply Chain Management", "SCM-520": "Supply Chain Management Internship", "EC-101": "Applied Microeconomics", "EC-102": "Global Macroeconomics", "STATS-250": "Applied Statistics", "EC-312 / EC-432": "Intermediate Macro Theory or Managerial Economics (choose 1)", "ENT-317": "Real Estate Development and Public Policy", "FIN-409 / FIN-413": "Securities Analysis or Investment Analysis and Portfolio Management (choose 1)", "FIN-430 / ISOM-215": "The Blockchain Revolution or Mobile App Development (choose 1)", "SIB-330": "Technical Innovation Strategy", "MGT-560": "Leadership Journey Experience", "HLTH-307": "Innovative Healthcare Models", "PAD-325": "Nonprofit Management", "PAD-330": "Fundraising for Nonprofits", "PAD-310": "Introduction to Public Service"};
    const SelectContext = React.createContext(null);
    const CompletedContext = React.createContext(null); // toggles a box's "Completed?" check box // opens a card's "Select" menu
    const TransferredContext = React.createContext(null); // toggles a box's "Transferred" check box

    // Category text shown on each course box, e.g. "ENT Major, required"
    const categoryText = (c) => {
      if (c.type === "gened") return "General Education";
      if (c.type === "core") return "SBS Core";
      if (c.type === "elective") return "Free Elective";
      const key = (c.programs && c.programs[0]) || (c.type.startsWith("major") ? "M:ENT" : "m:");
      return `${key.slice(2)} ${key[0] === "M" ? "Major" : "Minor"}, ${c.type.endsWith("Elective") ? "elective" : "required"}`;
    };
    // "Enter manually" is only for boxes where the student has to supply a course: GenEd areas such as Math, SCGP, CI
    // and STE, electives, minors and open "Advanced Course" slots. A box that already names one specific course in the
    // GenEd, SBS Core or major curriculum (WRI-101, SBS-100, ENT-201 ...) is fixed. The test looks at the box's ORIGINAL
    // name, so a flexible box stays flexible after the student has typed a course into it.
    const SPECIFIC_CODE = /^[A-Z]+-\d{3}[A-Z]?$/;
    const allowsManualEntry = (c) => {
      if (c.id === "bizarea") return false; // picks one of three listed courses, or is set by the major
      if (!["gened", "core", "major"].includes(c.type)) return true;
      return !SPECIFIC_CODE.test(c.orig ? c.orig.name : c.name);
    };

    // A box gets a "Select" button only when there is something to select: a course to type in or pick from a list.
    // Boxes that name one specific course (MGT-217, WRI-101, ENT-201 ...) have nothing to select; they only have the
    // "Completed?" and "Transferred" check boxes.
    const hasSelection = (c) => allowsManualEntry(c) || (c.id === "bizarea" && !c.mandated);

    // SBS Core "Business Area": the student picks one of three courses, unless the major names one.
    // Edit this table if a department's rule changes (major code -> required Business Area course).
    const BIZ_AREA_OPTIONS = ["EC-102", "ACCT-202", "ISOM-319"];
    const BIZ_AREA_BY_MAJOR = {
      ECON: "EC-102",   // Business Economics
      ACCT: "ACCT-202", // Accounting
      BAIS: "ISOM-319", // Business Analytics & Information Systems (Information Systems and Operations Management)
      SCM: "ISOM-319",  // Supply Chain Management (Information Systems and Operations Management)
    };

    // Courses that can be picked for a box: the program's required courses, or its elective list
    const menuCourses = (c) => {
      if (c.id === "bizarea") return c.mandated ? [] : BIZ_AREA_OPTIONS.map(code => ({ code, title: COURSE_TITLES[code] || "" }));
      if (!["major", "majorElective", "minor", "minorElective"].includes(c.type)) return [];
      const key = (c.programs && c.programs[0]) || "M:ENT";
      let codes;
      if (c.type.endsWith("Elective")) codes = ELECTIVE_LISTS[key] || [];
      else { const tpl = (key[0] === "M" ? MAJOR_PLANS : MINOR_PLANS)[key.slice(2)]; codes = tpl ? tpl.req.map(r => r[0]) : []; }
      return codes.map(code => ({ code, title: COURSE_TITLES[code] || "" }));
    };

    // The text line(s) under a course title. A course that double counts for two programs shows one line for each,
    // e.g. "ENT Major, elective" and, right under it, "IB Major, elective".
    const categoryLines = (c) => {
      const lines = [categoryText(c)];
      if (c.dual && c.dual.program) {
        const key = c.dual.program;
        lines.push(`${key.slice(2)} ${key[0] === "M" ? "Major" : "Minor"}, ${c.dual.type.endsWith("Elective") ? "elective" : "required"}`);
      }
      return lines;
    };

    const LockContext = React.createContext({ locks: {}, toggle: () => {} }); // semesters the student has locked
    const MoveContext = React.createContext(null); // lets a card ask the app to move it up/down within its semester

    // Insert a dropped course after the last course of the same or an earlier category, keeping any manual order
    const insertByType = (list, course) => {
      let at = 0;
      list.forEach((c, i) => { if (typeOrder[c.type] <= typeOrder[course.type]) at = i + 1; });
      return [...list.slice(0, at), course, ...list.slice(at)];
    };

    const sortCoursesByType = (courses) => {
      return [...courses].sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
    };

    // Credit warning modal
    const CreditWarningModal = ({ isOpen, onClose, isOverLimit }) => {
      if (!isOpen) return null;
      
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md mx-4 overflow-hidden animate-bounce-in">
            <div className={`px-6 py-4 ${isOverLimit ? 'bg-red-500' : 'bg-amber-500'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isOverLimit ? 'Credit Limit Exceeded' : 'Credit Warning'}
                </h3>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-700 leading-relaxed">
                Your regular tuition covers up to and including <strong>17 credits</strong> per semester. 
                If you take more than 17 credits in a semester, you will need to pay for credits over 17. 
                You cannot take more than <strong>21 credits</strong> in a semester.
              </p>
              {isOverLimit && (
                <p className="mt-3 text-red-600 font-medium">
                  This move has been cancelled because it would exceed the 21 credit limit.
                </p>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={onClose}
                className={`px-6 py-2.5 rounded-xl font-semibold text-white transition-all hover:scale-105 ${isOverLimit ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      );
    };

    const majors = [
      { name: "Accounting", code: "ACCT", required: 8, elective: 1, credits: 27, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/accounting/accounting-bsba" },
      { name: "Business Analytics & Information Systems", code: "BAIS", required: 4, elective: 4, credits: 24, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-analytics-and-information-systems/business-analytics-and-information-systems-bsba" },
      { name: "Business Economics", code: "ECON", required: 5, elective: 2, credits: 26, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-economics/business-economics-bsba" },
      { name: "Business Management & Leadership", code: "MGT", required: 3, elective: 3, credits: 18, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-management-and-leadership/business-management-and-leadership-bsba" },
      { name: "Corporate Accounting & Finance", code: "CAF", required: 8, elective: 1, credits: 27, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/corporate-accounting-and-finance/corporate-accounting-and-finance-bsba" },
      { name: "Entrepreneurship & Innovation", code: "ENT", required: 3, elective: 3, credits: 18, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/entrepreneurship/entrepreneurship-and-innovation-bsba" },
      { name: "Finance", code: "FIN", required: 4, elective: 3, credits: 21, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/finance-bsba" },
      { name: "Financial Planning", code: "FPLAN", required: 6, elective: 1, credits: 21, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/financial-wealth-management-bsba" },
      { name: "International Business", code: "IB", required: 3, elective: 3, credits: 18, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/international-business/international-business-bsba" },
      { name: "Interdisciplinary Business Studies", code: "IBS", required: 6, elective: 0, credits: 18, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/interdisciplinary-business-studies/interdisciplinary-business-studies-bsba" },
      { name: "Marketing", code: "MKT", required: 4, elective: 3, credits: 21, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/marketing/marketing-bsba" },
      { name: "Sports Management", code: "SPMT", required: 4, elective: 3, credits: 21, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/sports-management/sports-management-bsba" },
      { name: "Supply Chain Management", code: "SCM", required: 6, elective: 3, credits: 27, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/supply-chain-management/supply-chain-management-bsba" },
    ];

    const minors = [
      { name: "Accounting", code: "ACCT", credits: 12, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/accounting/accounting-minor" },
      { name: "Artificial Intelligence", code: "AI", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-analytics-and-information-systems/artificial-intelligence-minor" },
      { name: "Business Analytics", code: "BA", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-analytics-and-information-systems/business-analytics-minor" },
      { name: "Business Economics", code: "ECON", credits: 21, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-economics/business-economics-minor" },
      { name: "Business Law", code: "BLE", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/accounting/business-law-minor" },
      { name: "Business Management & Leadership", code: "MGT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-management-and-leadership/business-management-and-leadership-minor" },
      { name: "Corporate Finance", code: "CFIN", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/corporate-finance-minor" },
      { name: "Cybersecurity", code: "CYBER", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-analytics-and-information-systems/cybersecurity-minor" },
      { name: "Digital Marketing", code: "DMKT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/marketing/digital-marketing-minor" },
      { name: "Diversity, Equity & Inclusion", code: "DEI", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-management-and-leadership/diversity-equity-inclusion-minor" },
      { name: "Entrepreneurship & Innovation", code: "ENT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/entrepreneurship/entrepreneurship-and-innovation-minor" },
      { name: "Finance", code: "FIN", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/finance-minor" },
      { name: "Financial Institutions", code: "FINST", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/financial-institutions-minor" },
      { name: "FinTech", code: "FINTECH", credits: 12, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/fintech-minor" },
      { name: "Global Marketing", code: "GMKT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/marketing/global-marketing-minor" },
      { name: "Healthcare Systems & Innovation", code: "HSI", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/public-service-and-healthcare-administration/healthcare-systems-and-innovation-minor" },
      { name: "Information Systems", code: "IS", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-analytics-and-information-systems/information-systems-minor" },
      { name: "Innovation Strategy", code: "INNOV", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/international-business/innovation-strategy-minor" },
      { name: "International Business", code: "IB", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/international-business/international-business-minor" },
      { name: "Investments", code: "INV", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/finance/investments-minor" },
      { name: "Leadership", code: "LDR", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-management-and-leadership/leadership-minor" },
      { name: "Marketing", code: "MKT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/marketing/marketing-minor" },
      { name: "Nonprofit Management", code: "NPM", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/public-service-and-healthcare-administration/nonprofit-management-minor" },
      { name: "Product Innovation & Brand Marketing", code: "PIBM", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/marketing/product-innovation-and-brand-marketing-minor" },
      { name: "Public Service", code: "PSV", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/public-service-and-healthcare-administration/public-service-minor" },
      { name: "Real Estate", code: "RE", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/entrepreneurship/real-estate-minor" },
      { name: "Social Impact", code: "SOC", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/business-management-and-leadership/social-impact-minor" },
      { name: "Sports Management", code: "SPMT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/sports-management/sports-management-minor" },
      { name: "Sports Marketing", code: "SMKT", credits: 9, url: "https://suffolk.smartcatalogiq.com/en/current/catalog/sawyer-business-school-undergraduate-programs/marketing/sports-marketing-minor" },
    ];

    const MAJOR_PLANS = {"ACCT": {"req": [["ACCT-202", "Accounting for Decision Making II", 3], ["ACCT-320", "Federal Taxation", 3], ["ACCT-321", "Intermediate Accounting I", 3], ["ACCT-322", "Intermediate Accounting II", 3], ["ACCT-331", "Cost Accounting", 3], ["ACCT-430", "Accounting Information Systems", 3], ["ACCT-431", "Auditing and Assurance Services", 3], ["ACCT-450", "Accounting Theory and Practice", 3]], "slots": [3]}, "BAIS": {"req": [["ISOM-130", "Introduction to Business Analytics", 3], ["ISOM-316", "Coding for Business", 3], ["ISOM-319", "Operations Management", 3], ["ISOM-323", "Database Management", 3]], "slots": [3, 3, 3, 3]}, "ECON": {"req": [["EC-312", "Intermediate Macro Theory", 4], ["EC-350", "Data Analytics for Economics and Business", 3], ["EC-432", "Managerial Economics", 4], ["EC-450", "Applied Econometrics", 4], ["EC-490", "Senior Seminar in Economics", 4]], "slots": [4, 3]}, "CAF": {"req": [["ACCT-202", "Accounting for Decision Making II", 3], ["ACCT-321", "Intermediate Accounting I", 3], ["ACCT-322", "Intermediate Accounting II", 3], ["ACCT-331", "Cost Accounting", 3], ["ACCT-440", "Corporate Accounting and Financial Management", 3], ["FIN-311", "Intermediate Finance", 3], ["FIN-415", "Capital Budgeting", 3], ["FIN-417", "Multinational Financial Management", 3]], "slots": [3]}, "ENT": {"req": [["ENT-201", "Creating Value", 3], ["ENT-319", "Measuring Value", 3], ["ENT-419", "Delivering Value", 3]], "slots": [3, 3, 3]}, "FIN": {"req": [["FIN-311", "Intermediate Finance", 3], ["FIN-315", "Principles of Investments", 3], ["FIN-417", "Multinational Financial Management", 3], ["FIN-419", "Applied Financial Strategy", 3]], "slots": [3, 3, 3]}, "FPLAN": {"req": [["ACCT-320", "Federal Taxation", 3], ["FIN-313", "General Insurance", 3], ["FIN-315", "Principles of Investments", 3], ["FIN-401", "Practical Financial Planning", 3], ["FIN-424", "Retirement and Estate Planning", 3], ["FIN-475", "Case Studies in Financial Planning", 3]], "slots": [3]}, "IB": {"req": [["SIB-101", "Globalization", 3], ["SIB-321", "Introduction to International Business", 3], ["SIB-419", "Global Business Theory and Practice", 3]], "slots": [3, 3, 3]}, "IBS": {"req": [["Advanced Course 1", "Customized Program of Study (2+ disciplines)", 3], ["Advanced Course 2", "Customized Program of Study (2+ disciplines)", 3], ["Advanced Course 3", "Customized Program of Study (2+ disciplines)", 3], ["Advanced Course 4", "Customized Program of Study (2+ disciplines)", 3], ["Advanced Course 5", "Customized Program of Study (2+ disciplines)", 3], ["Advanced Course 6", "Customized Program of Study (2+ disciplines)", 3]], "slots": []}, "MGT": {"req": [["MGT-305", "Negotiations", 3], ["MGT-360", "Leadership 360 Practicum", 3], ["MGT-419", "Management Consulting Project", 3]], "slots": [3, 3, 3]}, "MKT": {"req": [["MKT-317", "Consumer Behavior", 3], ["MKT-320", "Marketing Research Methods and Tools in the Age of Generative AI", 3], ["MKT-322", "Marketing Analytics", 3], ["MKT-419", "Marketing Policies and Strategies", 3]], "slots": [3, 3, 3]}, "SPMT": {"req": [["BLE-324", "Sports Ethics & Law", 3], ["ENT-211", "The Sports Institute: Opportunities in the Sports Industry", 3], ["MKT-426", "Sports Marketing", 3], ["SPMT-419", "Sports Management Capstone", 3]], "slots": [3, 3, 3]}, "SCM": {"req": [["ISOM-319", "Operations Management", 3], ["ISOM-351", "Supply Chain Management", 3], ["ISOM-440", "ERP Systems and Intelligent Business Process Transformation", 3], ["MKT-427", "Global Supply Chain Relationships", 3], ["SIB-321", "Introduction to International Business", 3], ["SCM-520", "Supply Chain Management Internship", 3]], "slots": [3, 3, 3]}};
    const MINOR_PLANS = {"ACCT": {"req": [["ACCT-202", "Accounting for Decision Making II", 3], ["ACCT-321", "Intermediate Accounting I", 3], ["ACCT-322", "Intermediate Accounting II", 3], ["ACCT-331", "Cost Accounting", 3]], "slots": []}, "BLE": {"req": [], "slots": [3, 3, 3]}, "AI": {"req": [["ISOM-260", "Artificial Intelligence for Business", 3], ["ISOM-360", "Building AI Agents for Business Applications", 3]], "slots": [3]}, "BA": {"req": [["ISOM-130", "Introduction to Business Analytics", 3], ["ISOM-230", "Big Data, Business Intelligence and Analytics", 3], ["ISOM-330", "Machine Learning for Business Analytics", 3]], "slots": []}, "IS": {"req": [], "slots": [3, 3, 3]}, "CYBER": {"req": [["ISOM-240", "Data Privacy and Digital Forensics", 3], ["ISOM-340", "Cybersecurity Fundamentals", 3]], "slots": [3]}, "ECON": {"req": [["EC-101", "Applied Microeconomics", 3], ["EC-102", "Global Macroeconomics", 3], ["STATS-250", "Applied Statistics", 4], ["EC-312 / EC-432", "Intermediate Macro Theory or Managerial Economics (choose 1)", 4]], "slots": [4, 3]}, "ENT": {"req": [], "slots": [3, 3, 3]}, "RE": {"req": [["ENT-317", "Real Estate Development and Public Policy", 3], ["FIN-317", "Real Estate Finance", 3]], "slots": [3]}, "FIN": {"req": [], "slots": [3, 3, 3]}, "INV": {"req": [["FIN-411", "Futures and Options", 3], ["FIN-409 / FIN-413", "Securities Analysis or Investment Analysis and Portfolio Management (choose 1)", 3]], "slots": [3]}, "CFIN": {"req": [["FIN-410", "Analysis of Financial Statements", 3], ["FIN-415", "Capital Budgeting", 3]], "slots": [3]}, "FINST": {"req": [["FIN-319", "Money and Capital Markets", 3], ["FIN-432", "Risk Management and Financial Institutions", 3]], "slots": [3]}, "FINTECH": {"req": [["ISOM-316", "Coding for Business", 3], ["FIN-330", "Introduction to FinTech", 3], ["FIN-430 / ISOM-215", "The Blockchain Revolution or Mobile App Development (choose 1)", 3]], "slots": [3]}, "INNOV": {"req": [["SIB-330", "Technical Innovation Strategy", 3], ["SIB-340", "Global Innovation", 3]], "slots": [3]}, "IB": {"req": [["SIB-321", "Introduction to International Business", 3]], "slots": [3, 3]}, "DEI": {"req": [["MGT-322", "Managing Across Differences", 3], ["MGT-341", "Managing a Global Workforce", 3]], "slots": [3]}, "LDR": {"req": [["MGT-360", "Leadership 360 Practicum", 3], ["MGT-560", "Leadership Journey Experience", 0]], "slots": [3, 3]}, "MGT": {"req": [], "slots": [3, 3, 3]}, "SOC": {"req": [["ENT-350", "Social Entrepreneurship", 3]], "slots": [3, 3]}, "MKT": {"req": [], "slots": [3, 3, 3]}, "DMKT": {"req": [], "slots": [3, 3, 3]}, "GMKT": {"req": [], "slots": [3, 3, 3]}, "PIBM": {"req": [], "slots": [3, 3, 3]}, "SMKT": {"req": [], "slots": [3, 3, 3]}, "HSI": {"req": [["HLTH-301", "Healthcare in the United States", 3], ["HLTH-307", "Innovative Healthcare Models", 3]], "slots": [3]}, "NPM": {"req": [["PAD-325", "Nonprofit Management", 3], ["PAD-330", "Fundraising for Nonprofits", 3]], "slots": [3]}, "PSV": {"req": [["PAD-310", "Introduction to Public Service", 3]], "slots": [3, 3]}, "SPMT": {"req": [], "slots": [3, 3, 3]}};

    // Courses eligible as electives for each major ("M:") and minor ("m:"), used to detect double-counting
    const ELECTIVE_LISTS = {"M:ACCT": ["ACCT-310", "ACCT-415", "ACCT-520", "ACCT-550", "SEED-383"], "M:BAIS": ["ISOM-211", "ISOM-215", "ISOM-230", "ISOM-232", "ISOM-240", "ISOM-260", "ISOM-313", "ISOM-330", "ISOM-340", "ISOM-341", "ISOM-360", "ISOM-424", "ISOM-440", "ISOM-510", "ISOM-550"], "M:ECON": ["EC-131", "EC-141", "EC-151", "EC-261", "EC-311", "EC-402", "EC-420", "EC-421", "EC-430", "EC-442", "EC-443", "EC-445", "EC-451", "EC-460", "EC-483", "EC-503", "EC-510"], "M:CAF": ["ACCT-310", "ACCT-320", "ACCT-415", "ACCT-430", "ACCT-431", "FIN-315", "FIN-319", "FIN-411", "FIN-413", "FIN-419", "FIN-432"], "M:ENT": ["ENT-211", "ENT-241", "ENT-333", "ENT-336", "ENT-337", "ENT-350", "ENT-352", "ENT-353", "ENT-354", "ENT-355", "ENT-367", "ENT-377", "ENT-399", "ENT-510", "ENT-521", "ENT-550", "MGT-305", "SIB-550", "SEED-380", "SEED-381", "SEED-382", "SEED-383", "SEED-384"], "M:FIN": ["FIN-313", "FIN-317", "FIN-319", "FIN-330", "FIN-350", "FIN-401", "FIN-409", "FIN-410", "FIN-411", "FIN-413", "FIN-415", "FIN-424", "FIN-430", "FIN-432", "FIN-445", "FIN-475", "FIN-480", "FIN-510", "FIN-550", "SEED-381"], "M:FPLAN": ["FIN-330", "FIN-409", "FIN-411", "FIN-413", "FIN-480"], "M:IB": ["SIB-340", "SIB-400", "SIB-510", "SIB-520", "SIB-540", "SIB-550", "ACCT-310", "BLE-317", "BLE-325", "CJN-482", "EC-430", "EC-442", "EC-445", "ENT-354", "FIN-417", "ISOM-340", "MGT-313", "MGT-322", "MGT-341", "MKT-421", "CJN-470", "POLS-310", "POLS-367", "POLS-382", "POLS-387", "POLS-389", "POLS-411", "POLS-463", "POLS-509", "SPAN-315"], "M:IBS": [], "M:MGT": ["MGT-310", "MGT-313", "MGT-322", "MGT-341", "MGT-350", "MGT-385", "MGT-411", "MGT-520", "ENT-355", "HLTH-301", "ISOM-341", "P.AD-325", "SIB-550"], "M:MKT": ["MKT-310", "MKT-315", "MKT-360", "MKT-415", "MKT-418", "MKT-420", "MKT-421", "MKT-423", "MKT-424", "MKT-426", "MKT-427", "MKT-428", "MKT-429", "MKT-440", "MKT-442", "MKT-444", "MKT-450", "MKT-456", "MKT-499", "MKT-510", "MKT-520", "MKT-530", "MKT-550"], "M:SPMT": ["ADPR-458", "CJN-302", "EC-320", "ISOM-232", "MGT-305", "MKT-424", "MKT-428", "MKT-429", "SPMT-410", "SPMT-510", "SPMT-520", "SPMT-521", "SPMT-530", "SPMT-550"], "M:SCM": ["ACCT-331", "BLE-315", "BLE-317", "BLE-325", "EC-430", "ENT-354", "ISOM-230", "ISOM-240", "ISOM-260", "ISOM-330", "ISOM-340", "ISOM-341", "MGT-305", "MKT-423", "SCM-550", "SIB-340"], "m:ACCT": [], "m:BA": [], "m:BLE": ["BLE-315", "BLE-316", "BLE-317", "BLE-321", "BLE-324", "BLE-550", "SEED-386"], "m:AI": ["ISOM-211", "ISOM-215", "ISOM-230", "ISOM-240", "ISOM-313", "ISOM-330", "ISOM-340", "ISOM-341", "ISOM-424", "ISOM-440", "ISOM-510", "ACCT-150", "BLE-321"], "m:CYBER": ["ISOM-211", "ISOM-215", "ISOM-230", "ISOM-260", "ISOM-313", "ISOM-330", "ISOM-341", "ISOM-360", "ISOM-424", "ISOM-440", "ISOM-510", "ACCT-150", "BLE-321"], "m:IS": ["ISOM-130", "ISOM-211", "ISOM-215", "ISOM-230", "ISOM-232", "ISOM-240", "ISOM-260", "ISOM-313", "ISOM-316", "ISOM-323", "ISOM-330", "ISOM-340", "ISOM-341", "ISOM-360", "ISOM-424", "ISOM-440", "ISOM-510"], "m:ECON": ["EC-131", "EC-141", "EC-151", "EC-261", "EC-311", "EC-402", "EC-420", "EC-421", "EC-430", "EC-442", "EC-443", "EC-445", "EC-451", "EC-460", "EC-483", "EC-503", "EC-510"], "m:ENT": ["ENT-201", "ENT-211", "ENT-241", "ENT-319", "ENT-336", "ENT-337", "ENT-350", "ENT-352", "ENT-353", "ENT-354", "ENT-355", "ENT-367", "ENT-377", "ENT-419", "ENT-550", "MGT-305", "SIB-550", "SEED-380", "SEED-381", "SEED-382", "SEED-383", "SEED-384"], "m:RE": ["ENT-316", "ENT-333", "ENT-521"], "m:FIN": ["FIN-311", "FIN-313", "FIN-315", "FIN-317", "FIN-319", "FIN-330", "FIN-350", "FIN-401", "FIN-409", "FIN-410", "FIN-411", "FIN-413", "FIN-415", "FIN-417", "FIN-419", "FIN-424", "FIN-430", "FIN-432", "FIN-445", "FIN-475", "FIN-480", "FIN-550"], "m:INV": ["FIN-317", "FIN-319", "FIN-330", "FIN-350", "FIN-409", "FIN-410", "FIN-413", "FIN-430", "FIN-445", "FIN-480"], "m:CFIN": ["FIN-317", "FIN-330", "FIN-350", "FIN-411", "FIN-430"], "m:FINST": ["FIN-313", "FIN-330", "FIN-350", "FIN-430"], "m:FINTECH": ["FIN-350", "FIN-430", "FIN-432", "FIN-445", "FIN-480", "ISOM-215", "ISOM-240", "ISOM-260", "ISOM-313", "ISOM-340", "ISOM-360"], "m:INNOV": ["SIB-510", "SIB-520", "ENT-353", "FIN-330", "MKT-440", "MGT-341"], "m:IB": ["SIB-340", "SIB-400", "SIB-419", "SIB-510", "SIB-520", "SIB-540", "SIB-560", "ACCT-310", "BLE-317", "BLE-325", "CJN-482", "EC-430", "EC-442", "EC-445", "ENT-354", "FIN-417", "ISOM-340", "MGT-313", "MGT-322", "MGT-341", "MKT-421", "CJN-470", "POLS-310", "POLS-367", "POLS-382", "POLS-387", "POLS-389", "POLS-411", "POLS-463", "POLS-509", "SPAN-315"], "m:DEI": ["MGT-313", "MGT-385", "BLE-325", "SIB-550"], "m:LDR": ["MGT-305", "MGT-310", "MGT-313", "MGT-322", "MGT-385", "MGT-411"], "m:MGT": ["MGT-305", "MGT-310", "MGT-313", "MGT-322", "MGT-341", "MGT-350", "MGT-360", "MGT-385", "MGT-411"], "m:SOC": ["MGT-305", "ENT-352", "MGT-322", "MGT-520", "SIB-550"], "m:MKT": ["MKT-310", "MKT-315", "MKT-317", "MKT-320", "MKT-322", "MKT-360", "MKT-415", "MKT-418", "MKT-419", "MKT-420", "MKT-421", "MKT-423", "MKT-424", "MKT-426", "MKT-427", "MKT-428", "MKT-429", "MKT-440", "MKT-442", "MKT-444", "MKT-450", "MKT-456", "MKT-499", "MKT-550"], "m:DMKT": ["MKT-310", "MKT-360", "MKT-415", "MKT-418", "MKT-429", "MKT-444", "MKT-450", "MKT-456"], "m:GMKT": ["MKT-418", "MKT-421", "MKT-423", "MKT-427", "MKT-442", "MKT-450"], "m:PIBM": ["MKT-310", "MKT-315", "MKT-360", "MKT-415", "MKT-418", "MKT-423", "MKT-440", "MKT-442", "MKT-444", "MKT-450", "MKT-499"], "m:SMKT": ["MKT-360", "MKT-424", "MKT-426", "MKT-428", "MKT-429", "MKT-450"], "m:HSI": ["ACCT-415", "ENT-350", "MGT-305", "ISOM-230", "ISOM-260", "ISOM-330", "PAD-325", "PAD-329", "BIO-273", "EC-103", "HLTH-550"], "m:NPM": ["ACCT-415", "POLS-224", "POLS-309", "HLTH-301", "HST-236", "MGT-301", "MGT-305", "PAD-327", "PAD-329", "PAD-410", "PSYCH-346", "SOC-228", "THETR-281"], "m:PSV": ["PAD-201", "PAD-312", "PAD-322", "PAD-325", "PAD-326", "PAD-361", "PAD-540"], "m:SPMT": ["ADPR-458", "BLE-324", "CJN-302", "EC-320", "ENT-211", "ISOM-232", "MGT-305", "MKT-424", "MKT-426", "MKT-428", "MKT-429", "SPMT-410", "SPMT-510", "SPMT-520", "SPMT-521", "SPMT-530", "SPMT-550"]};

    // Number the remaining free electives 1, 2, 3... in chronological order so the total count is easy to see
    const renumberFreeElectives = (plan) => {
      let n = 0;
      Object.keys(plan).sort().forEach(y => ["fall", "spring", "summer"].forEach(s => {
        (plan[y][s] || []).forEach(c => { if (c.type === "elective") { n += 1; c.name = `Free Elective ${n}`; c.fullName = "Any approved course"; } });
      }));
      return plan;
    };

    // Order in which free electives are replaced: chronological, then list order within a semester
    const PLAN_SEMESTERS = [["year1","fall"],["year1","spring"],["year2","fall"],["year2","spring"],["year3","fall"],["year3","spring"],["year4","fall"],["year4","spring"]];

    // Internal planning knowledge (not shown in the UI under any name): preferred default course choices for certain
    // major/minor combinations. A rule applies when every program in `when` is selected. `code` is the one course that
    // is used as the (single) double count: it belongs to program A in role `roleA` and also counts toward program B
    // in role `roleB`. Rules are checked in order; combinations without a rule fall back to the first overlap found.
    // To be refined, improved and updated.
    const STREAMLINED_PATHS = [
      { when: ["M:ENT", "M:IB"],   code: "ENT-354", A: "M:ENT",  roleA: "elective", B: "M:IB",  roleB: "elective" }, // Global Entrepreneurship
      { when: ["M:ENT", "M:SPMT"], code: "ENT-211", A: "M:SPMT", roleA: "required", B: "M:ENT", roleB: "elective" }, // The Sports Institute
      { when: ["M:ENT", "M:MGT"],  code: "MGT-305", A: "M:MGT",  roleA: "required", B: "M:ENT", roleB: "elective" }, // Negotiations
    ];

    // Build a plan for a selection. Free elective slots (the last four semesters) are given, in a balanced way, to the
    // required courses and elective slots of each additional major, and then of each minor: required courses are
    // spread one (or two) per semester over up to four semesters, paired with one elective of the same program.
    // ONE course may double count toward two programs (e.g. a minor's required course that is also on a major's
    // elective list); it is shown as a two-colour card and the other program needs one course fewer.
    const buildPlan = (majorIdxs, minorIdxs) => {
      const plan = JSON.parse(JSON.stringify(initialCourseData));
      Object.values(plan).forEach(y => Object.values(y).forEach(l => l.forEach(c => { c.taken = false; c.transferred = false; }))); // nothing is completed or transferred until the student ticks the boxes
      const cards = () => Object.values(plan).flatMap(y => Object.values(y).flat());
      const majorCodes = majorIdxs.map(i => majors[i].code);

      // The generic plan is built around ENT; tag those cards, and release them if ENT is not selected
      cards().forEach(c => {
        if (c.type === "major" || c.type === "majorElective") {
          if (majorCodes.includes("ENT")) { c.programs = ["M:ENT"]; c.rank = majorCodes.indexOf("ENT"); }
          else { c.type = "elective"; c.name = "Free Elective"; c.fullName = "Any approved course"; }
        }
      });
      // A selected major may name the Business Area course (the first such major selected decides).
      // It is set before the plan is built so the major's own copy of that course attaches to this SBS Core box.
      const bizCourse = majorCodes.map(code => BIZ_AREA_BY_MAJOR[code]).find(Boolean);
      if (bizCourse) {
        const biz = cards().find(c => c.id === "bizarea");
        if (biz) { biz.name = bizCourse; biz.fullName = COURSE_TITLES[bizCourse] || bizCourse; biz.mandated = true; }
      }
      const existing = {};
      cards().forEach(c => { existing[c.name] = c; });
      const plain = new Set(Object.keys(existing).filter(k => !(existing[k].programs || []).length)); // GenEd / SBS Core / free electives

      const programs = [];
      majorCodes.forEach((code, rank) => programs.push({ key: "M:" + code, kind: "major", code, rank, tpl: MAJOR_PLANS[code], base: code === "ENT" }));
      minorIdxs.forEach((mi, rank) => programs.push({ key: "m:" + minors[mi].code, kind: "minor", code: minors[mi].code, rank, tpl: MINOR_PLANS[minors[mi].code], base: false }));
      const reqType = (pr) => pr.kind === "major" ? "major" : "minor";
      const elType = (pr) => pr.kind === "major" ? "majorElective" : "minorElective";
      const label = (pr) => `${pr.code} ${pr.kind}`;
      const elecOf = (pr) => ELECTIVE_LISTS[pr.key] || [];

      // --- find overlaps: a required course of A that is also required by B, or eligible as one of B's electives
      const candidates = [];
      programs.forEach((A, ia) => A.tpl.req.forEach(([r]) => {
        if (plain.has(r)) return;
        programs.forEach((B, ib) => {
          if (A === B) return;
          if (B.tpl.req.some(q => q[0] === r)) { if (ia < ib) candidates.push({ code: r, A, B, kind: "req" }); }
          else if (B.tpl.slots.length && elecOf(B).includes(r)) candidates.push({ code: r, A, B, kind: "elec" });
        });
      }));
      candidates.forEach(c => { c.roleA = "required"; });
      // a streamlined-path rule, when one matches the selection, decides which course double counts
      const rule = STREAMLINED_PATHS.find(r => r.when.every(k => programs.some(p => p.key === k)));
      const ruleDc = rule ? { code: rule.code, A: programs.find(p => p.key === rule.A), B: programs.find(p => p.key === rule.B), kind: rule.roleB === "elective" ? "elec" : "req", roleA: rule.roleA } : null;
      // A course can double count toward two programs. With two majors selected, up to TWO courses may double count;
      // with one major, one. The streamlined-path rule (if any) is taken first, then the other overlaps in order.
      const maxDc = majorIdxs.length >= 2 ? 2 : 1;
      const dcs = [];
      const useDc = (d) => {
        if (!d || dcs.length >= maxDc || dcs.some(x => x.code === d.code)) return;
        // a double count uses up one of B's elective slots, so B needs one left
        if (d.kind === "elec" && dcs.filter(x => x.kind === "elec" && x.B === d.B).length >= d.B.tpl.slots.length) return;
        dcs.push(d);
      };
      useDc(ruleDc);
      candidates.forEach(useDc);
      const roleBOf = (d) => (d.kind === "elec" ? "elective" : "required");
      const dcNoteOf = (d) => `Counts toward: ${label(d.A)} (${d.roleA}) and ${label(d.B)} (${roleBOf(d)})`;
      const markDual = (card, d) => {
        if (!card) return;
        if (!(card.programs || []).includes(d.B.key)) card.programs = [...(card.programs || []), d.B.key];
        card.dual = { type: d.kind === "elec" ? elType(d.B) : reqType(d.B), rank: d.B.rank, program: d.B.key, note: dcNoteOf(d) };
      };

      const claimed = {}, cardOf = {};
      programs.filter(p => p.base).forEach(p => p.tpl.req.forEach(([r]) => { claimed[r] = p; cardOf[r] = existing[r]; }));
      const entElectiveCards = () => cards().filter(c => c.type === "majorElective" && (c.programs || []).includes("M:ENT"));
      const unusedEntElective = () => entElectiveCards().find(c => !c.dual && !c.orig); // an ENT elective not yet given a double count
      dcs.filter(d => d.A.base).forEach(d => {
        if (d.roleA === "required") markDual(existing[d.code], d);
        else { // the double-counted course becomes one of the electives of the generic ENT major
          const first = unusedEntElective();
          if (first) { first.orig = { name: first.name, fullName: first.fullName }; first.name = d.code; first.fullName = COURSE_TITLES[d.code] || d.code; markDual(first, d); }
        }
      });
      // each double count frees one of B's elective slots: release an ENT elective card if B is the generic ENT major
      dcs.filter(d => d.kind === "elec" && d.B.base && !d.A.base).forEach(() => {
        const first = unusedEntElective();
        if (first) { first.type = "elective"; first.programs = []; first.rank = undefined; first.name = "Free Elective"; first.fullName = "Any approved course"; }
      });

      // Semesters that still have free elective slots, in chronological order
      const free = PLAN_SEMESTERS
        .map(([y, s]) => ({ y, s, idxs: plan[y][s].map((c, i) => (c.type === "elective" && !c.taken ? i : -1)).filter(i => i >= 0) }))
        .filter(f => f.idxs.length > 0);
      const overflow = [], substitutes = [];
      const place = (item, pref) => {
        for (let k = 0; k < free.length; k++) {
          const f = free[(pref + k) % free.length];
          if (f.idxs.length) { plan[f.y][f.s][f.idxs.shift()] = item; return; }
        }
        overflow.push(item);
      };

      programs.filter(p => !p.base).forEach(pr => {
        const reqItems = [];
        pr.tpl.req.forEach(([code, title, cr]) => {
          if (plain.has(code)) { existing[code].programs = [...(existing[code].programs || []), pr.key]; return; } // already in the plan (core)
          if (claimed[code]) {
            const dReq = dcs.find(d => d.kind === "req" && d.code === code && d.B === pr);
            if (dReq) { markDual(cardOf[code], dReq); return; } // an allowed double count
            substitutes.push({ code, by: claimed[code], pr });
            reqItems.push({ id: `${pr.key}-sub-${code}`, name: "Substitute", fullName: `Replaces ${code} (already counted for ${label(claimed[code])})`, credits: cr, type: reqType(pr), programs: [pr.key], rank: pr.rank, taken: false, transferred: false });
            return;
          }
          const item = { id: `${pr.key}-${code}`, name: code, fullName: title, credits: cr, type: reqType(pr), programs: [pr.key], rank: pr.rank, taken: false, transferred: false };
          claimed[code] = pr; cardOf[code] = item;
          const dElecA = dcs.find(d => d.kind === "elec" && d.A === pr && d.code === code);
          if (dElecA) markDual(item, dElecA);
          reqItems.push(item);
        });
        const n = free.length, R = reqItems.length, K = Math.min(n, R);
        let at = 0;
        for (let sem = 0; sem < K; sem++) {
          const count = Math.floor(R / K) + (sem < R % K ? 1 : 0);
          for (let j = 0; j < count; j++) place(reqItems[at++], sem);
        }
        const nSlots = pr.tpl.slots.length - dcs.filter(d => d.kind === "elec" && d.B === pr).length;
        const aElectives = dcs.filter(d => d.roleA === "elective" && d.A === pr);
        pr.tpl.slots.slice(0, nSlots).forEach((cr, i) => {
          if (aElectives[i]) { // streamlined path: a double-counted course is one of this program's electives
            const d = aElectives[i];
            const item = { id: `${pr.key}-${d.code}`, name: d.code, fullName: COURSE_TITLES[d.code] || d.code, credits: cr, type: elType(pr), programs: [pr.key], rank: pr.rank, taken: false, transferred: false };
            markDual(item, d); place(item, i % Math.max(n, 1)); return;
          }
          place({ id: `${pr.key}-el${i + 1}`, name: `${pr.code} ${pr.kind === "major" ? "Elective" : "Minor Elective"}`,
            fullName: `${pr.kind === "major" ? "Major" : "Minor"} elective (${i + 1}/${pr.tpl.slots.length})`, credits: cr, type: elType(pr), programs: [pr.key], rank: pr.rank, taken: false, transferred: false },
            i % Math.max(n, 1));
        });
      });

      overflow.forEach(item => { plan.year3.summer.push(item); });
      Object.values(plan).forEach(y => Object.keys(y).forEach(s => { y[s] = sortCoursesByType(y[s]); }));
      renumberFreeElectives(plan);

      const notes = [];
      dcs.forEach(d => notes.push(`Double count: ${d.code} counts toward both the ${label(d.A)} (${d.roleA}) and the ${label(d.B)} (${roleBOf(d)}). Up to ${maxDc} course${maxDc > 1 ? "s" : ""} may double count.`));
      if (dcs.length) {
        const others = candidates.filter(c => !dcs.some(d => d.code === c.code)).map(c => `${c.code} (${label(c.A)} required / ${label(c.B)} ${c.kind === "elec" ? "elective" : "required"})`);
        if (others.length) notes.push(`Other overlaps not applied (${maxDc > 1 ? `only ${maxDc} double counts are` : "only one double count is"} allowed): ${[...new Set(others)].slice(0, 4).join(", ")}.`);
      }
      substitutes.forEach(s => notes.push(`${s.code} is required by both the ${label(s.by)} and the ${label(s.pr)} but cannot double count again, so a substitute course is shown for the ${label(s.pr)}.`));
      if (overflow.length) {
        const cr = overflow.reduce((sum, c) => sum + c.credits, 0);
        notes.push(`${overflow.length} course${overflow.length > 1 ? "s" : ""} (${cr} credits) did not fit in the free-elective slots of the regular semesters and ${overflow.length > 1 ? "were" : "was"} placed in Year 3, Summer: ${overflow.map(c => c.name).join(", ")}.`);
      }
      return { courseData: plan, notice: notes.join("\n") };
    };

    const planSignature = (majorIdxs, minorIdxs) => [...majorIdxs].sort((a, b) => a - b).join(",") + "|" + [...minorIdxs].sort((a, b) => a - b).join(",");

    // Shorter display titles so each course title fits on one line (full title shown on hover)
    const SHORT_TITLES = {"ACCT-201": "Acct. for Decision Making", "ISOM-210": "Mgmt Information Systems", "SCGP": "Social, Cultural & Global", "STE": "Science, Tech & Engineering", "ACCT-202": "Acct. for Decision Making II", "ACCT-430": "Accounting Info Systems", "ACCT-431": "Auditing & Assurance Services", "ACCT-450": "Accounting Theory & Practice", "ISOM-130": "Intro to Business Analytics", "EC-350": "Data Analytics for Econ & Bus", "ACCT-440": "Corp. Acct. & Financial Mgmt", "FIN-417": "Multinational Financial Mgmt", "FIN-424": "Retirement & Estate Planning", "FIN-475": "Case Studies in Fin. Planning", "SIB-321": "Intro to Intl Business", "SIB-419": "Global Bus. Theory & Practice", "MGT-419": "Mgmt Consulting Project", "MKT-320": "Marketing Research Methods", "MKT-419": "Mktg Policies & Strategies", "ENT-211": "The Sports Institute", "ISOM-440": "ERP & Process Transformation", "MKT-427": "Global Supply Chain Relations", "SCM-520": "Supply Chain Mgmt Internship", "ISOM-260": "AI for Business", "ISOM-360": "Building AI Agents", "ISOM-230": "Big Data, BI & Analytics", "ISOM-330": "Machine Learning & Analytics", "ISOM-240": "Data Privacy & Forensics", "EC-312 / EC-432": "Macro Theory / Managerial Econ", "ENT-317": "Real Estate Development", "FIN-409 / FIN-413": "Securities or Invest. Analysis", "FIN-410": "Fin. Statement Analysis", "FIN-432": "Risk Mgmt & Fin. Institutions", "FIN-430 / ISOM-215": "Blockchain or Mobile App Dev.", "HLTH-301": "Healthcare in the U.S.", "PAD-310": "Intro to Public Service", "Advanced Course 1": "Customized Program of Study", "Advanced Course 2": "Customized Program of Study", "Advanced Course 3": "Customized Program of Study", "Advanced Course 4": "Customized Program of Study", "Advanced Course 5": "Customized Program of Study", "Advanced Course 6": "Customized Program of Study", "Business Area": "EC-102, ACCT-202 or ISOM-319", "FIN-315": "Principles of Investments", "FIN-313": "General Insurance"};

    const majorTheme = {
      btn: "bg-orange-100 border-orange-300 text-orange-700 focus:ring-orange-400",
      chip: "bg-orange-200 text-orange-700",
      hover: "hover:bg-orange-50",
      check: "accent-orange-600",
      sel: "bg-orange-50",
    };
    const minorTheme = {
      btn: "bg-teal-100 border-teal-300 text-teal-700 focus:ring-teal-400",
      chip: "bg-teal-200 text-teal-800",
      hover: "hover:bg-teal-50",
      check: "accent-teal-600",
      sel: "bg-teal-50",
    };

    // Dropdown with checkboxes so several items can be picked at once
    const MultiSelect = ({ options, selected, onToggle, theme, placeholder, minSelected = 0, maxSelected = 99, renderMeta }) => {
      const [open, setOpen] = useState(false);
      const ref = useRef(null);
      useEffect(() => {
        const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
      }, []);
      const names = selected.map(i => options[i].name).join(", ");
      return (
        <div ref={ref} className="relative mt-1">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`w-full px-3 py-2 border rounded-lg font-semibold text-sm text-left flex items-center justify-between gap-2 focus:outline-none focus:ring-2 ${theme.btn}`}
          >
            <span className="truncate">{selected.length ? names : placeholder}</span>
            <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute z-30 mt-1 w-full min-w-[16rem] bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto py-1">
              {options.map((opt, idx) => {
                const checked = selected.includes(idx);
                const locked = checked ? selected.length <= minSelected : selected.length >= maxSelected;
                return (
                  <label key={idx} className={`flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 cursor-pointer ${theme.hover} ${checked ? theme.sel : ""}`}>
                    <input type="checkbox" checked={checked} disabled={locked} onChange={() => onToggle(idx)} className={`w-4 h-4 ${theme.check}`} />
                    <span className="flex-1">{opt.name}</span>
                    {renderMeta && <span className="text-xs text-gray-400">{renderMeta(opt)}</span>}
                  </label>
                );
              })}
              {maxSelected < 99 && (
                <div className="px-3 py-1.5 text-xs text-gray-400 border-t border-gray-100">Choose up to {maxSelected}</div>
              )}
            </div>
          )}
        </div>
      );
    };

    const typeStyles = {
      gened: { bg: "bg-gray-200", border: "border-gray-500", text: "text-gray-800", textDull: "text-gray-500/70", dot: "bg-gray-600", dotDull: "bg-gray-400/60", tag: "bg-gray-200 text-gray-800" },
      core: { bg: "bg-blue-100", border: "border-blue-400", text: "text-blue-700", textDull: "text-blue-500/70", dot: "bg-blue-600", dotDull: "bg-blue-400/60", tag: "bg-blue-100 text-blue-700" },
      major: { bg: "bg-orange-100", border: "border-orange-400", text: "text-orange-700", textDull: "text-orange-500/70", dot: "bg-orange-600", dotDull: "bg-orange-400/60", tag: "bg-orange-100 text-orange-700" },
      majorElective: { bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-700", textDull: "text-yellow-600/70", dot: "bg-yellow-500", dotDull: "bg-yellow-400/60", tag: "bg-yellow-100 text-yellow-700" },
      major_2: { bg: "bg-[#f3e3d3]", border: "border-[#d6b79a]", text: "text-[#8a4b1e]", textDull: "text-[#8a4b1e]/60", dot: "bg-[#b98a63]", dotDull: "bg-[#d6b79a]", tag: "bg-[#f3e3d3] text-[#8a4b1e]" },
      majorElective_2: { bg: "bg-[#f1eecf]", border: "border-[#cfc78a]", text: "text-[#6b6320]", textDull: "text-[#6b6320]/60", dot: "bg-[#bdb36a]", dotDull: "bg-[#cfc78a]", tag: "bg-[#f1eecf] text-[#6b6320]" },
      minor_2: { bg: "bg-[#dcebe8]", border: "border-[#9cbdb8]", text: "text-[#3d6660]", textDull: "text-[#3d6660]/60", dot: "bg-[#6f9a93]", dotDull: "bg-[#9cbdb8]", tag: "bg-[#dcebe8] text-[#3d6660]" },
      minorElective_2: { bg: "bg-[#dde8ec]", border: "border-[#9db7c1]", text: "text-[#41606c]", textDull: "text-[#41606c]/60", dot: "bg-[#7f9fac]", dotDull: "bg-[#9db7c1]", tag: "bg-[#dde8ec] text-[#41606c]" },
      minor: { bg: "bg-teal-100", border: "border-teal-400", text: "text-teal-700", textDull: "text-teal-500/70", dot: "bg-teal-600", dotDull: "bg-teal-400/60", tag: "bg-teal-100 text-teal-700" },
      minorElective: { bg: "bg-cyan-100", border: "border-cyan-400", text: "text-cyan-800", textDull: "text-cyan-600/70", dot: "bg-cyan-500", dotDull: "bg-cyan-400/60", tag: "bg-cyan-100 text-cyan-800" },
      elective: { bg: "bg-purple-100", border: "border-purple-400", text: "text-purple-700", textDull: "text-purple-500/70", dot: "bg-purple-600", dotDull: "bg-purple-400/60", tag: "bg-purple-100 text-purple-700" },
    };

    const STYLE_HEX = {
      gened: ["#e5e7eb", "#6b7280"], core: ["#dbeafe", "#60a5fa"], major: ["#ffedd5", "#fb923c"], majorElective: ["#fef9c3", "#facc15"],
      minor: ["#ccfbf1", "#2dd4bf"], minorElective: ["#cffafe", "#22d3ee"], elective: ["#f3e8ff", "#c084fc"],
      major_2: ["#f3e3d3", "#d6b79a"], majorElective_2: ["#f1eecf", "#cfc78a"], minor_2: ["#dcebe8", "#9cbdb8"], minorElective_2: ["#dde8ec", "#9db7c1"],
    };
    const styleKeyOf = (type, rank) => (rank === 1 && typeStyles[type + "_2"]) ? type + "_2" : type;

    const takenStyles = {
      bg: "bg-gray-100",
      border: "border-gray-300",
      text: "text-gray-500",
      dot: "bg-gray-400",
    };

    const CourseCard = ({ course, yearKey, semester, onDragStart, onDragEnd, isDragging, isFirst, isLast, locked }) => {
      const move = React.useContext(MoveContext);
      const openSelect = React.useContext(SelectContext);
      const toggleCompleted = React.useContext(CompletedContext);
      const toggleTransferredCard = React.useContext(TransferredContext);
      const gray = !!locked; // completed or locked: grayed out and not editable
      // A course that double counts has ONE colour: that of the major where it is required, or, when it is an
      // elective in both, that of the first major. Both programs are named in the text lines under the title.
      const dualWins = !!course.dual && /Elective$/.test(course.type) && !/Elective$/.test(course.dual.type);
      const baseKey = dualWins ? styleKeyOf(course.dual.type, course.dual.rank) : styleKeyOf(course.type, course.rank);
      const baseStyle = typeStyles[baseKey];
      const style = gray ? takenStyles : baseStyle;
      const showCategory = course.type !== "gened" && course.type !== "core"; // GenEd and SBS Core: colour and legend are enough
      const categories = categoryLines(course);

      // For taken courses, use dull version of category color for course name
      const courseNameColor = gray ? baseStyle.textDull : baseStyle.text;
      
      return (
        <div 
          draggable={!gray}
          onDragStart={(e) => !gray && onDragStart(e, course, yearKey, semester)}
          onDragEnd={onDragEnd}
          title={course.dual ? course.dual.note : undefined}
          className={`relative ${style.bg} ${style.border} border rounded-xl px-3.5 py-2 mb-2 flex justify-between items-center shadow-sm transition-all group ${
            gray 
              ? 'cursor-default opacity-90' 
              : 'hover:shadow-md cursor-grab active:cursor-grabbing'
          } ${isDragging ? 'opacity-50 scale-95' : ''}`}
        >
          <div className="min-w-0 flex-1 relative">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className={`font-semibold shrink-0 ${courseNameColor}`}>{course.name}</span>
              <span className={`truncate ${gray ? 'text-gray-400' : 'text-gray-500'}`} title={course.fullName}>{course.manual ? course.fullName : (SHORT_TITLES[course.name] || course.fullName)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-1 min-w-0">
              {/* GenEd and SBS Core are recognised by their colour and the legend, so they carry no category text */}
              {showCategory && (
                <span className={`flex flex-col min-w-0 text-xs leading-snug ${gray ? 'text-gray-300' : 'text-gray-400'}`}>
                  {categories.map(line => <span key={line} className="truncate" title={line}>{line}</span>)}
                </span>
              )}
              {hasSelection(course) && (
                <button type="button" disabled={gray}
                  onClick={(e) => { e.stopPropagation(); openSelect && openSelect(e.currentTarget.getBoundingClientRect(), course.id, yearKey, semester); }}
                  className="shrink-0 px-1.5 py-0.5 rounded-md border border-gray-300 bg-white/80 text-xs font-medium text-gray-600 hover:bg-white hover:text-gray-800 disabled:opacity-50 disabled:cursor-default">
                  Select
                </button>
              )}
              {/* the two check boxes stay together if the row has to wrap */}
              <span className="shrink-0 inline-flex items-center gap-x-1.5">
              <label className={`shrink-0 inline-flex items-center gap-1 text-xs select-none ${gray || course.transferred ? 'text-gray-300' : 'text-gray-500 cursor-pointer'}`} title={course.transferred ? "Transfer credit counts as completed" : "Tick when the course is completed; its credits count toward your degree progress"}>
                <input type="checkbox" checked={!!course.taken} disabled={gray || !!course.transferred}
                  onChange={() => toggleCompleted && toggleCompleted(yearKey, semester, course.id)}
                  className="w-3.5 h-3.5 rounded border-gray-300 accent-orange-500" />
                Completed?
              </label>
              <label className={`shrink-0 inline-flex items-center gap-1 text-xs select-none ${gray ? 'text-gray-300' : 'text-gray-500 cursor-pointer'}`} title="Tick if you earned the credit at another institution. Transfer credit also counts as completed">
                <input type="checkbox" checked={!!course.transferred} disabled={gray}
                  onChange={() => toggleTransferredCard && toggleTransferredCard(yearKey, semester, course.id)}
                  className="w-3.5 h-3.5 rounded border-gray-300 accent-orange-500" />
                Transferred
              </label>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`relative whitespace-nowrap ${style.text}`}>
              <span className="text-lg font-bold">{course.credits}</span>
              <span className="text-sm font-medium ml-1 opacity-80">{course.credits === 1 ? "credit" : "credits"}</span>
              {course.transferred && <span className="text-sm font-medium text-gray-400 ml-1">(T)</span>}
            </div>
            {!gray && move && (
              <div className="flex flex-col opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity -my-1">
                <button type="button" title="Move up" aria-label={`Move ${course.name} up`} disabled={isFirst}
                  onClick={(e) => { e.stopPropagation(); move(yearKey, semester, course.id, -1); }}
                  className="p-0.5 rounded text-gray-400 hover:text-gray-700 hover:bg-black/5 disabled:opacity-30 disabled:cursor-default">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button type="button" title="Move down" aria-label={`Move ${course.name} down`} disabled={isLast}
                  onClick={(e) => { e.stopPropagation(); move(yearKey, semester, course.id, 1); }}
                  className="p-0.5 rounded text-gray-400 hover:text-gray-700 hover:bg-black/5 disabled:opacity-30 disabled:cursor-default">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };

    // Pop-up menu for a course box's "Select" button: reset, manual entry where allowed, then the courses for the box's category
    const CourseMenu = ({ menu, course, usedNames, onClose, onReset, onEnter, onChoose }) => {
      const [manual, setManual] = useState(false);
      const [mCode, setMCode] = useState("");
      const [mTitle, setMTitle] = useState("");
      useEffect(() => { setManual(false); }, [menu]); // each opening starts with the plain menu
      useEffect(() => {
        const esc = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", esc); return () => window.removeEventListener("keydown", esc);
      }, []);
      if (!menu || !course) return null;
      const list = menuCourses(course);
      const canEnterManually = allowsManualEntry(course);
      const below = menu.rect.bottom + 300 < window.innerHeight;
      const pos = { left: Math.max(8, Math.min(menu.rect.left, window.innerWidth - 392)), ...(below ? { top: menu.rect.bottom + 4 } : { bottom: window.innerHeight - menu.rect.top + 4 }) };
      return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50" onClick={onClose}>
          <div role="menu" onClick={(e) => e.stopPropagation()} style={pos}
            className="menu-font fixed w-96 max-h-72 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-xl py-1 text-[15px]">
            <button type="button" role="menuitem" onClick={onReset}
              className="w-full flex items-center gap-2 px-3 py-2 text-left font-medium text-gray-800 hover:bg-gray-50">
              <span className="w-4 shrink-0 text-center">{!course.orig ? "\u2713" : ""}</span>Select
            </button>
            {!canEnterManually ? null : !manual ? (
              <button type="button" role="menuitem" onClick={() => { setMCode(course.manual ? course.name : ""); setMTitle(course.manual ? course.fullName : ""); setManual(true); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left font-medium text-gray-800 hover:bg-gray-50">
                <span className="w-4 shrink-0 text-center">{course.manual ? "\u2713" : ""}</span>Enter manually…
              </button>
            ) : (
              <form className="px-3 py-2 space-y-2 bg-gray-50 border-y border-gray-100"
                onSubmit={(e) => { e.preventDefault(); if (mCode.trim()) onEnter(mCode.trim(), mTitle.trim()); }}>
                <input autoFocus value={mCode} onChange={(e) => setMCode(e.target.value)} placeholder="Course code, e.g. ENT-201" aria-label="Course code"
                  className="w-full px-2 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input value={mTitle} onChange={(e) => setMTitle(e.target.value)} placeholder="Course title" aria-label="Course title"
                  className="w-full px-2 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setManual(false)} className="px-2 py-1 rounded-md text-xs text-gray-600 hover:bg-gray-200">Cancel</button>
                  <button type="submit" disabled={!mCode.trim()} className="px-3 py-1 rounded-md text-xs font-medium bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-40">Apply</button>
                </div>
              </form>
            )}
            {list.length > 0 && <div className="my-1 border-t border-gray-100"></div>}
            {list.map(it => {
              const current = it.code === course.name, used = usedNames.has(it.code) && !current;
              return (
                <button key={it.code} type="button" role="menuitem" disabled={used} onClick={() => onChoose(it)}
                  className={`w-full flex items-baseline gap-2 px-3 py-1.5 text-left ${used ? 'text-gray-300 cursor-default' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <span className="w-4 shrink-0 text-center text-gray-500">{current ? "\u2713" : ""}</span>
                  <span className="font-semibold shrink-0 text-left" style={{ width: "10.5ch" }}>{it.code}</span>
                  <span className="truncate text-left min-w-0" title={it.title}>{it.title}</span>
                </button>
              );
            })}
            {list.length === 0 && canEnterManually && <div className="px-3 py-1.5 text-xs text-gray-400">No course list for this category</div>}
          </div>
        </div>, document.body);
    };

    const SemesterColumn = ({ title, courses, semesterType, yearKey, onDragStart, onDragEnd, onDrop, onDragEnter, isDropTarget, draggingCourse, isYearCompleted, onCollapse }) => {
      const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
      const isEmpty = courses.length === 0;
      const isSummer = semesterType === 'summer';
      const isOverWarning = totalCredits >= 17;
      const isAtLimit = totalCredits > 20;
      
      // A semester is completed if all courses are taken, or if it's part of a completed year
      const naturallyDone = false; // every semester is editable until the student locks it
      const { locks, toggle } = React.useContext(LockContext);
      const locked = !naturallyDone && !!locks[`${yearKey}.${semesterType}`];
      const isCompleted = naturallyDone || locked;
      
      const handleDragOver = (e) => {
        if (locked) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      };

      const handleDragEnter = (e) => {
        if (locked) return;
        e.preventDefault();
        if (onDragEnter) {
          onDragEnter(yearKey, semesterType);
        }
      };

      const handleDrop = (e) => {
        if (locked) return;
        e.preventDefault();
        onDrop(yearKey, semesterType);
      };

      // Check if this is being dragged from (to show as source)
      const isSource = draggingCourse && courses.some(c => c.id === draggingCourse.id);

      // Determine credit badge styling
      const getCreditBadgeStyle = () => {
        if (isCompleted) return 'bg-gray-400 text-white';
        if (isSummer) return 'bg-gray-200 text-gray-600';
        if (isAtLimit) return 'bg-red-500 text-white';
        if (isOverWarning) return 'bg-amber-500 text-white';
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      };

      // Determine header styling
      const getHeaderStyle = () => {
        if (isCompleted) return 'bg-gray-100 border-gray-200';
        if (isSummer) return 'bg-gray-100/50 border-gray-200';
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100';
      };

      // Determine container styling
      const getContainerStyle = () => {
        if (isCompleted) return 'bg-gray-50/80 border-gray-200';
        if (isSummer) return 'bg-gray-50/50 border-gray-200';
        return 'bg-white border-gray-100';
      };
      
      return (
        <div className={`flex-1 min-w-[280px] ${isSummer ? 'max-w-[240px]' : ''}`}>
          <div 
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            className={`rounded-2xl border ${getContainerStyle()} shadow-sm overflow-hidden h-full flex flex-col transition-all duration-200 ${isDropTarget && !isSource ? 'ring-2 ring-amber-400 ring-offset-2 border-amber-300 bg-amber-50/30' : ''}`}
          >
            <div className={`px-5 py-4 border-b ${getHeaderStyle()}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${isCompleted ? 'text-gray-500' : isSummer ? 'text-gray-600' : 'text-gray-800'}`}>{title}</h3>
                  {naturallyDone && (
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {!naturallyDone && (
                    <button type="button" onClick={() => toggle(yearKey, semesterType)}
                      title={locked ? "Unlock this semester to edit it" : "Lock this semester (mark it as final)"}
                      className={`ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-medium transition-colors ${locked ? 'bg-gray-200 border-gray-300 text-gray-600 hover:bg-gray-300' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {locked
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14v10H5V11zm3 0V7a4 4 0 118 0v4" />
                          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14v10H5V11zm3 0V7a4 4 0 017.5-2" />}
                      </svg>
                      {locked ? "Unlock" : "Lock"}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                {onCollapse && isEmpty && (
                  <button type="button" onClick={onCollapse} aria-label="Hide summer" title="Hide this summer (it reopens when you click the Summer tab)"
                    className="px-2 py-0.5 rounded-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    Hide
                  </button>
                )}
                <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${getCreditBadgeStyle()}`}>
                  {isOverWarning && !isSummer && !isCompleted && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  {totalCredits} cr
                </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex-1 min-h-[200px]">
              {isEmpty && !isDropTarget ? (
                <div className={`h-full flex flex-col items-center justify-center py-8 ${isCompleted ? 'text-gray-300' : 'text-gray-400'}`}>
                  {isCompleted ? (
                    <>
                      <svg className="w-10 h-10 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                      </svg>
                      <div className="text-sm text-center">No courses taken</div>
                    </>
                  ) : (
                    <>
                      <svg className="w-10 h-10 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="text-sm text-center">No courses planned<br/>Drag courses here</div>
                    </>
                  )}
                </div>
              ) : isEmpty && isDropTarget ? (
                <div className="h-full flex flex-col items-center justify-center text-amber-500 py-8 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/50">
                  <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div className="text-sm text-center font-medium">Drop course here</div>
                </div>
              ) : (
                <>
                  {courses.map((course, idx) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      yearKey={yearKey}
                      semester={semesterType}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      isDragging={draggingCourse?.id === course.id}
                      locked={locked}
                      isFirst={idx === 0}
                      isLast={idx === courses.length - 1}
                    />
                  ))}
                  {isDropTarget && !isSource && (
                    <div className="border-2 border-dashed border-amber-300 rounded-xl p-4 text-center text-amber-500 font-medium bg-amber-50/50">
                      Drop here
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      );
    };

    const YearRow = ({ yearNum, yearData, yearKey, onDragStart, onDragEnd, onDrop, onDragEnter, dropTarget, draggingCourse }) => {
      const yearCredits = Object.values(yearData).flat().reduce((sum, c) => sum + c.credits, 0);
      const allCourses = Object.values(yearData).flat();

      // Summer is a slim vertical tab until the student opens it. A summer that has courses always stays open.
      const [summerOpen, setSummerOpen] = useState(false);
      const summerHasCourses = yearData.summer.length > 0;
      const showSummer = summerHasCourses || summerOpen;
      const summerIsDropTarget = dropTarget?.yearKey === yearKey && dropTarget?.semester === 'summer';

      // A year is completed if it has courses and all of them are taken
      const isYearCompleted = false; // years are never grayed out on their own
      
      return (
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`px-4 py-2 rounded-xl flex items-center justify-center text-white shadow-lg ${
              isYearCompleted 
                ? 'bg-gray-400' 
                : 'bg-gradient-to-r from-amber-500 to-orange-600'
            }`}>
              {isYearCompleted ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold">Year {yearNum}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <span className="font-bold">Year {yearNum}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-bold ${isYearCompleted ? 'text-gray-500' : 'text-gray-800'}`}>
                  {yearNum === 1 ? 'Freshman' : yearNum === 2 ? 'Sophomore' : yearNum === 3 ? 'Junior' : 'Senior'}
                </h2>
                {isYearCompleted && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full">
                    Completed
                  </span>
                )}
              </div>
              <p className={`${isYearCompleted ? 'text-gray-400' : 'text-gray-500'}`}>{yearCredits} credits {isYearCompleted ? 'earned' : 'planned'}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <SemesterColumn 
              title={`Year ${yearNum}, Fall`}
              courses={yearData.fall} 
              semesterType="fall" 
              yearKey={yearKey}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDrop={onDrop}
              onDragEnter={onDragEnter}
              isDropTarget={dropTarget?.yearKey === yearKey && dropTarget?.semester === 'fall'}
              draggingCourse={draggingCourse}
              isYearCompleted={isYearCompleted}
            />
            <SemesterColumn 
              title={`Year ${yearNum}, Spring`}
              courses={yearData.spring} 
              semesterType="spring" 
              yearKey={yearKey}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDrop={onDrop}
              onDragEnter={onDragEnter}
              isDropTarget={dropTarget?.yearKey === yearKey && dropTarget?.semester === 'spring'}
              draggingCourse={draggingCourse}
              isYearCompleted={isYearCompleted}
            />
            {showSummer ? (
              <SemesterColumn
                title={`Year ${yearNum}, Summer`}
                courses={yearData.summer}
                semesterType="summer"
                yearKey={yearKey}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                isDropTarget={summerIsDropTarget}
                draggingCourse={draggingCourse}
                isYearCompleted={isYearCompleted}
                onCollapse={() => setSummerOpen(false)}
              />
            ) : (
              <button
                type="button"
                aria-expanded="false"
                aria-label={`Show Year ${yearNum} summer`}
                title="Show summer. You can also drop a course here."
                onClick={() => setSummerOpen(true)}
                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                onDragEnter={(e) => { e.preventDefault(); onDragEnter && onDragEnter(yearKey, 'summer'); }}
                onDrop={(e) => { e.preventDefault(); onDrop(yearKey, 'summer'); }}
                className={`flex-shrink-0 w-12 rounded-2xl border shadow-sm flex flex-col items-center justify-center gap-3 py-4 transition-all duration-200 ${
                  summerIsDropTarget
                    ? 'ring-2 ring-amber-400 ring-offset-2 border-amber-300 bg-amber-50 text-amber-700'
                    : draggingCourse
                      ? 'border-dashed border-amber-300 bg-amber-50/60 text-amber-700'
                      : 'border-gray-200 bg-gray-50/80 text-gray-500 hover:bg-white hover:text-amber-700 hover:border-amber-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                <span className="text-sm font-semibold tracking-wide" style={{ writingMode: 'vertical-rl' }}>
                  {draggingCourse ? 'Drop for summer' : 'Summer +'}
                </span>
              </button>
            )}
          </div>
        </div>
      );
    };

    const ProgressRing = ({ progress, size = 80, strokeWidth = 8 }) => {
      const radius = (size - strokeWidth) / 2;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (progress / 100) * circumference;
      
      return (
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
          <circle 
            cx={size/2} cy={size/2} r={radius} 
            stroke="url(#progressGradientDesktop)" strokeWidth={strokeWidth} fill="none"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="progressGradientDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      );
    };

    // Student details shown in the header (editable by the student; nothing is saved or sent anywhere).
    // The start term will later drive which curriculum version applies.
    const DEFAULT_NAME = "[Your Name]";
    const NAME_MAX = 30;
    const DEFAULT_START_TERM = "Fall 2026";
    const FIRST_START_YEAR = 2022; // earliest year offered in the "Started" list
    const LAST_START_YEAR = 2028;  // latest year offered in the "Started" list
    const SEMESTERS_TO_GRADUATE = 7; // Fall/Spring semesters after the starting one (Fall 2026 -> Spring 2030)

    // Starting terms are Fall or Spring only. Position in the Spring/Fall sequence: Spring = even, Fall = odd.
    const termToSlot = (t) => { const [s, y] = t.split(" "); return Number(y) * 2 + (s === "Fall" ? 1 : 0); };
    const slotToTerm = (n) => `${n % 2 ? "Fall" : "Spring"} ${Math.floor(n / 2)}`;
    const defaultGradTerm = (start) => slotToTerm(termToSlot(start) + SEMESTERS_TO_GRADUATE);

    const START_TERMS = [];
    for (let y = FIRST_START_YEAR; y <= LAST_START_YEAR; y++) START_TERMS.push(`Spring ${y}`, `Fall ${y}`);

    // Graduation can also be in the Summer, so this list has Spring, Summer and Fall.
    const gradTermOptions = (start) => {
      const order = { Spring: 0, Summer: 1, Fall: 2 };
      const key = (t) => { const [s, y] = t.split(" "); return Number(y) * 3 + order[s]; };
      const startYear = Number(start.split(" ")[1]);
      const out = [];
      for (let y = startYear; y <= startYear + 8; y++) for (const s of ["Spring", "Summer", "Fall"]) out.push(`${s} ${y}`);
      return out.filter(t => key(t) >= key(start));
    };

    // Left navigation menu entries (level 2 = indented under the item above). Each id matches a section on the page.
    const NAV_ITEMS = [
      { id: "overview", label: "Overview", level: 1 },
      { id: "requirements", label: "BSBA Graduation Requirements", level: 1 },
      { id: "plans", label: "All Years", level: 1 },
      { id: "year-1", label: "Year 1", level: 2, year: 1 },
      { id: "year-2", label: "Year 2", level: 2, year: 2 },
      { id: "year-3", label: "Year 3", level: 2, year: 3 },
      { id: "year-4", label: "Year 4", level: 2, year: 4 },
    ];

    // Initials for the round badge: "[Your Name]" -> "YN", "Jane Smith" -> "JS"
    const initialsOf = (name) => {
      const words = name.replace(/[\[\]]/g, "").trim().split(/\s+/).filter(Boolean);
      if (words.length === 0) return "?";
      const first = words[0][0], last = words.length > 1 ? words[words.length - 1][0] : "";
      return (first + last).toUpperCase();
    };

    function App() {
      const entIdx = majors.findIndex(m => m.code === "ENT");
      const [tabs, setTabs] = useState(() => [{ id: "base", majors: [entIdx], minors: [], ...buildPlan([entIdx], []) }]);
      const [activeTabId, setActiveTabId] = useState("base");
      const [newTabId, setNewTabId] = useState(null); // tab that was just added: shown with a brief spotlight
      const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
      const selectedMajors = activeTab.majors;
      const selectedMinors = activeTab.minors;
      const courseData = activeTab.courseData;
      const setCourseData = (updater) => setTabs(prev => prev.map(t => t.id === activeTab.id ? { ...t, courseData: updater(t.courseData) } : t));

      // Choosing a new combination of majors/minors opens a new plan tab (or switches to the one that already exists)
      const goToSelection = (majorIdxs, minorIdxs) => {
        const sig = planSignature(majorIdxs, minorIdxs);
        const found = tabs.find(t => planSignature(t.majors, t.minors) === sig);
        if (found) { setActiveTabId(found.id); return; }
        const id = "tab" + Date.now();
        setTabs(prev => [...prev, { id, majors: majorIdxs, minors: minorIdxs, ...buildPlan(majorIdxs, minorIdxs) }]);
        setNewTabId(id);
        setTimeout(() => setNewTabId(cur => (cur === id ? null : cur)), 1800);
        setActiveTabId(id);
      };
      const toggleMajor = (idx) => {
        const next = selectedMajors.includes(idx) ? (selectedMajors.length > 1 ? selectedMajors.filter(i => i !== idx) : selectedMajors) : (selectedMajors.length < 2 ? [...selectedMajors, idx] : selectedMajors);
        if (next !== selectedMajors) goToSelection(next, selectedMinors);
      };
      const toggleMinor = (idx) => {
        const next = selectedMinors.includes(idx) ? selectedMinors.filter(i => i !== idx) : (selectedMinors.length < 2 ? [...selectedMinors, idx] : selectedMinors);
        if (next !== selectedMinors) goToSelection(selectedMajors, next);
      };
      const closeTab = (id) => {
        setTabs(prev => prev.filter(t => t.id !== id));
        if (activeTabId === id) setActiveTabId("base");
      };
      const tabLabel = (t) => {
        const base = t.majors.map(i => majors[i].code).join(" + ");
        const mins = t.minors.length ? ` · Minor: ${t.minors.map(i => minors[i].code).join(", ")}` : "";
        return base + mins;
      };
      const majorLabel = selectedMajors.map(i => majors[i].code).join(" + ");
      const minorLabel = selectedMinors.map(i => minors[i].code).join(" + ");
      const [activeYear, setActiveYear] = useState(null); // null = show all years
      const [draggingCourse, setDraggingCourse] = useState(null);
      const [dragSource, setDragSource] = useState(null);
      const [dropTarget, setDropTarget] = useState(null);
      const [showCreditWarning, setShowCreditWarning] = useState(false);
      const [showHelp, setShowHelp] = useState(false);
      const [studentName, setStudentName] = useState(DEFAULT_NAME);
      const [startTerm, setStartTerm] = useState(DEFAULT_START_TERM);
      const [gradTerm, setGradTerm] = useState(defaultGradTerm(DEFAULT_START_TERM));
      // Picking a starting term resets the expected graduation term to its default (still editable afterwards)
      const changeStartTerm = (t) => { setStartTerm(t); setGradTerm(defaultGradTerm(t)); };
      const [isOverCreditLimit, setIsOverCreditLimit] = useState(false);

      // Drag handlers
      const handleDragStart = (e, course, yearKey, semester) => {
        setDraggingCourse(course);
        setDragSource({ yearKey, semester });
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', course.id);
      };

      // Move a course up (-1) or down (+1) within its semester; completed courses stay where they are
      const locks = activeTab.locks || {};
      const [menu, setMenu] = useState(null); // {rect, id, yearKey, semester}
      const menuCourse = menu ? (courseData[menu.yearKey][menu.semester].find(c => c.id === menu.id) || null) : null;
      const updateCard = (fn) => setCourseData(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        const list = next[menu.yearKey][menu.semester]; const i = list.findIndex(c => c.id === menu.id);
        if (i >= 0) list[i] = fn(list[i]);
        return next;
      });
      const toggleCompleted = (yearKey, semester, id) => {
        if (locks[`${yearKey}.${semester}`]) return;
        setCourseData(prev => {
          const next = JSON.parse(JSON.stringify(prev));
          const c = next[yearKey][semester].find(x => x.id === id);
          if (c) c.taken = !c.taken;
          return next;
        });
      };
      // "Transferred" check box: transfer credit also counts as completed. Unticking goes back to the earlier Completed state.
      const toggleTransferredCard = (yearKey, semester, id) => {
        if (locks[`${yearKey}.${semester}`]) return;
        setCourseData(prev => {
          const next = JSON.parse(JSON.stringify(prev));
          const c = next[yearKey][semester].find(x => x.id === id);
          if (!c) return prev;
          if (c.transferred) { c.transferred = false; c.taken = !!c.takenBefore; delete c.takenBefore; }
          else { c.transferred = true; c.takenBefore = c.taken; c.taken = true; }
          return next;
        });
      };
      // "Select": back to the initial format (no chosen course). Completed and Transferred are left as they are.
      const resetCourse = () => {
        updateCard(c => (c.orig ? { ...c, ...c.orig, orig: undefined, manual: undefined } : { ...c }));
        setMenu(null);
      };
      const enterCourse = (code, title) => {
        updateCard(c => ({ ...c, orig: c.orig || { name: c.name, fullName: c.fullName, dual: c.dual }, name: code, fullName: title, manual: true, dual: undefined }));
        setMenu(null);
      };
      const chooseCourse = (it) => {
        updateCard(c => it.code === c.name ? c : { ...c, orig: c.orig || { name: c.name, fullName: c.fullName, dual: c.dual }, name: it.code, fullName: it.title || it.code, manual: undefined, dual: undefined });
        setMenu(null);
      };
      const usedNames = new Set(Object.values(courseData).flatMap(y => Object.values(y).flat()).map(c => c.name));
      const toggleLock = (yearKey, semester) => setTabs(prev => prev.map(t => t.id === activeTab.id
        ? { ...t, locks: { ...(t.locks || {}), [`${yearKey}.${semester}`]: !(t.locks || {})[`${yearKey}.${semester}`] } } : t));
      const moveCourse = (yearKey, semester, id, dir) => {
        if (locks[`${yearKey}.${semester}`]) return;
        setCourseData(prev => {
          const newData = JSON.parse(JSON.stringify(prev));
          const list = newData[yearKey][semester];
          const i = list.findIndex(c => c.id === id), j = i + dir;
          if (i < 0 || j < 0 || j >= list.length) return prev;
          [list[i], list[j]] = [list[j], list[i]];
          return newData;
        });
      };

      const handleDragEnd = () => {
        setDraggingCourse(null);
        setDragSource(null);
        setDropTarget(null);
      };

      const handleDrop = (targetYearKey, targetSemester) => {
        if (!draggingCourse || !dragSource) return;
        if (locks[`${targetYearKey}.${targetSemester}`] || locks[`${dragSource.yearKey}.${dragSource.semester}`]) { handleDragEnd(); return; }
        
        // Don't do anything if dropping in the same place
        if (dragSource.yearKey === targetYearKey && dragSource.semester === targetSemester) {
          handleDragEnd();
          return;
        }

        // Calculate current credits in target semester
        const targetSemesterCourses = courseData[targetYearKey][targetSemester];
        const currentCredits = targetSemesterCourses.reduce((sum, c) => sum + c.credits, 0);
        const newTotalCredits = currentCredits + draggingCourse.credits;

        // Check if over 21 credits - reject the move
        if (newTotalCredits > 20) {
          setIsOverCreditLimit(true);
          setShowCreditWarning(true);
          handleDragEnd();
          return;
        }

        // Check if between 17-20 credits - allow but show warning
        if (newTotalCredits >= 17 && newTotalCredits <= 20) {
          setIsOverCreditLimit(false);
          setShowCreditWarning(true);
        }

        setCourseData(prev => {
          const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
          
          // Remove from source
          const sourceList = newData[dragSource.yearKey][dragSource.semester];
          const courseIndex = sourceList.findIndex(c => c.id === draggingCourse.id);
          if (courseIndex > -1) {
            sourceList.splice(courseIndex, 1);
          }
          
          // Add to target and sort
          newData[targetYearKey][targetSemester] = insertByType(newData[targetYearKey][targetSemester], draggingCourse);
          renumberFreeElectives(newData);
          
          return newData;
        });

        handleDragEnd();
      };

      // Track drop target for visual feedback
      const handleDragOverSemester = (yearKey, semester) => {
        if (draggingCourse && (dragSource?.yearKey !== yearKey || dragSource?.semester !== semester)) {
          setDropTarget({ yearKey, semester });
        }
      };

      const handleDragEnter = (yearKey, semester) => {
        if (draggingCourse) {
          setDropTarget({ yearKey, semester });
        }
      };

      const handleCloseWarning = () => {
        setShowCreditWarning(false);
        setIsOverCreditLimit(false);
      };

      const allCourses = Object.values(courseData).flatMap(year => Object.values(year).flat());
      const completedCredits = allCourses.filter(c => c.taken).reduce((sum, c) => sum + c.credits, 0);
      const totalPlannedCredits = allCourses.reduce((sum, c) => sum + c.credits, 0);
      const progress = Math.round((completedCredits / 124) * 100);

      // Print: save the plan in the CURRENT tab as a one-page PDF. The PDF code is only downloaded when this is first used.
      const [printing, setPrinting] = useState(false);
      const printPlan = async () => {
        setPrinting(true);
        try {
          const { makePlanPdf } = await import("./planPdf.js");
          const yearNames = ["Freshman", "Sophomore", "Junior", "Senior"];
          const toPdfCourse = (c) => ({
            code: c.name,
            title: c.manual ? c.fullName : (SHORT_TITLES[c.name] || c.fullName),
            // same colour rule as the cards on screen: a double-counting course takes the colour of the major where it is required
            type: (c.dual && /Elective$/.test(c.type) && !/Elective$/.test(c.dual.type)) ? c.dual.type : c.type,
            credits: c.credits, taken: !!c.taken, transferred: !!c.transferred,
          });
          makePlanPdf({
            planLabel: tabLabel(activeTab),
            majors: activeTab.majors.map(i => majors[i].name),
            minors: activeTab.minors.map(i => minors[i].name),
            studentName: studentName.trim() === DEFAULT_NAME ? "" : studentName.trim(),
            startTerm, gradTerm,
            totalCredits: totalPlannedCredits, completedCredits, progress,
            notes: activeTab.notice ? activeTab.notice.split("\n") : [],
            url: "https://profhuvaj.github.io/CourseCoach/",
            years: [1, 2, 3, 4].map(n => {
              const y = courseData[`year${n}`];
              return {
                number: n, label: yearNames[n - 1],
                credits: Object.values(y).flat().reduce((s, c) => s + c.credits, 0),
                semesters: { fall: y.fall.map(toPdfCourse), spring: y.spring.map(toPdfCourse), summer: y.summer.map(toPdfCourse) },
                locked: { fall: !!locks[`year${n}.fall`], spring: !!locks[`year${n}.spring`], summer: !!locks[`year${n}.summer`] },
              };
            }),
          });
        } catch (err) {
          console.error(err);
          window.alert("Sorry, the PDF could not be created. Please try again.");
        }
        setPrinting(false);
      };

      const sumCredits = (pred) => allCourses.filter(pred).reduce((sum, c) => sum + c.credits, 0);
      const isMajorType = (c) => c.type === "major" || c.type === "majorElective";
      const isMinorType = (c) => c.type === "minor" || c.type === "minorElective";
      const typeOf = (c) => isMajorType(c) ? "major" : isMinorType(c) ? "minor" : c.type;
      const KEYS = ["gened", "core", "major", "minor", "elective"];
      const byKey = (pred) => Object.fromEntries(KEYS.map(k => [k, sumCredits(c => typeOf(c) === k && pred(c))]));
      const requiredCredits = byKey(() => true);
      const transferredCredits = byKey(c => c.taken && c.transferred);
      const suffolkCredits = byKey(c => c.taken && !c.transferred);
      // Credits for one specific major or minor, using the courses tagged to it in this plan
      const programStats = (key) => {
        const mine = allCourses.filter(c => (c.programs || []).includes(key));
        const sum = (pred) => mine.filter(pred).reduce((s, c) => s + c.credits, 0);
        return { total: sum(() => true), transfer: sum(c => c.taken && c.transferred), suffolk: sum(c => c.taken && !c.transferred) };
      };

      const reqThemes = {
        gened: { box: "bg-gray-200 border-gray-300", text: "text-gray-800", fill: "bg-gray-700", track: "bg-gray-300" },
        core: { box: "bg-blue-100 border-blue-200", text: "text-blue-700", fill: "bg-blue-600", track: "bg-blue-200" },
        major: { box: "bg-orange-100 border-orange-200", text: "text-orange-700", fill: "bg-orange-600", track: "bg-orange-200" },
        elective: { box: "bg-purple-100 border-purple-200", text: "text-purple-700", fill: "bg-purple-600", track: "bg-purple-200" },
        major2: { box: "bg-[#f3e3d3] border-[#d6b79a]", text: "text-[#8a4b1e]", fill: "bg-[#b98a63]", track: "bg-[#e6cdb4]" },
        minor2: { box: "bg-[#dcebe8] border-[#9cbdb8]", text: "text-[#3d6660]", fill: "bg-[#6f9a93]", track: "bg-[#bcd6d1]" },
        minor: { box: "bg-teal-100 border-teal-200", text: "text-teal-700", fill: "bg-teal-600", track: "bg-teal-200" },
      };

      // The sections of the "BSBA Graduation Requirements" bar, left to right: GenEd, SBS Core, major(s), minor(s), Free Electives.
      // Each section is as wide as its share of the plan's credits. The plan's courses are split between the sections
      // so that every course counts once (a course shared by two programs belongs to the first), so the widths always add up
      // to the whole bar. The numbers inside a section are the usual requirement figures (for example 0/18 for a major).
      const requirementSegments = (() => {
        const detail = (taken, total, transfer) => `${taken} of ${total} credits completed${transfer > 0 ? ` (${transfer} transferred)` : ""}`;
        const segs = [];
        const fromKey = (key, label, title, lines, theme) => {
          const total = requiredCredits[key];
          if (total <= 0) return;
          const taken = transferredCredits[key] + suffolkCredits[key];
          segs.push({ key, label, grow: total, taken, total, transfer: transferredCredits[key], suffolk: suffolkCredits[key], theme, tipTitle: title, tipLines: [...lines, detail(taken, total, transferredCredits[key])] });
        };
        fromKey("gened", "GenEd", "General Education (GenEd)", [`${requiredCredits.gened} credits`], reqThemes.gened);
        fromKey("core", "SBS Core", "Sawyer Business School Core", [`${requiredCredits.core} credits`], reqThemes.core);
        const programSegments = (kind, picks, list, themes) => picks.forEach((mi, n) => {
          const item = list[mi];
          const key = (kind === "major" ? "M:" : "m:") + item.code;
          const st = programStats(key);
          // credits of this program's own courses in the plan (shared courses are counted once, with the first program)
          const own = allCourses.filter(c => typeOf(c) === kind && ((c.programs || [])[0] || (kind === "major" ? "M:" + majors[selectedMajors[0]].code : "")) === key).reduce((s, c) => s + c.credits, 0);
          if (own <= 0 && st.total <= 0) return;
          const word = kind === "major" ? "Major" : "Minor";
          const label = `${picks.length > 1 ? `${word} ${n + 1}` : word}: ${item.code}`;
          const lines = kind === "major" ? [`${item.required} required + ${item.elective} electives`, `${st.total} credits`] : [`${st.total} credits`];
          segs.push({ key: kind + "-" + mi, label, shortLabel: item.code, href: item.url, grow: own || st.total, taken: st.transfer + st.suffolk, total: st.total, transfer: st.transfer, suffolk: st.suffolk,
            theme: n === 1 ? themes[1] : themes[0], tipTitle: `${word}: ${item.name}`, tipLines: [...lines, detail(st.transfer + st.suffolk, st.total, st.transfer), "Click the name to open the catalog page"] });
        });
        programSegments("major", selectedMajors, majors, [reqThemes.major, reqThemes.major2]);
        programSegments("minor", selectedMinors, minors, [reqThemes.minor, reqThemes.minor2]);
        fromKey("elective", "Free Electives", "Free Electives", ["Any approved courses"], reqThemes.elective);
        return segs;
      })();

      const yearsToShow = activeYear === null
        ? [1, 2, 3, 4]
        : [activeYear];

      // Total credits across all four years of the active plan (shown under the "All Years" heading)
      const allYearsCredits = Object.values(courseData).flatMap(y => Object.values(y).flat()).reduce((sum, c) => sum + c.credits, 0);

      // Left navigation menu: which section is highlighted, and what a click does
      const [activeSection, setActiveSection] = useState("overview");
      useEffect(() => {
        // Highlight the section near the top of the screen. A year wins over "All Years" because years sit inside it.
        const ids = NAV_ITEMS.map(i => i.id);
        const visible = new Set();
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
          const year = ids.find(id => id.startsWith("year-") && visible.has(id));
          const pick = year || ids.find(id => visible.has(id));
          if (pick) setActiveSection(pick);
        }, { rootMargin: "-110px 0px -55% 0px" });
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
      }, [activeYear]);
      const goToSection = (item) => (e) => {
        e.preventDefault();
        // If a single year is showing, switch back to all years first so the target exists
        const needsAll = activeYear !== null && (item.id === "plans" || (item.year && item.year !== activeYear));
        if (needsAll) setActiveYear(null);
        setActiveSection(item.id);
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setTimeout(() => {
          const el = document.getElementById(item.id);
          if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }, needsAll ? 60 : 0);
      };

      return (
        <div className="min-h-screen">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:pr-[41px] py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-stretch gap-3 flex-shrink-0">
                  <BrandBadge />
                  <BrandBlock asHeading />
                </div>
                <div className="flex flex-1 items-center justify-end gap-3 min-w-0 ml-4">
                  {/* Legend: one line, fills the space between the title and the student details */}
                  <div
                    role="group"
                    aria-label="Legend"
                    title="Legend: what the card colors and symbols mean"
                    className={`hidden lg:flex flex-1 min-w-0 items-center justify-between gap-x-1 gap-y-1 px-2 py-2 bg-gray-50 rounded-xl whitespace-nowrap ${
                      // Two majors or two minors add too many entries for one line: wrap those cases
                      selectedMajors.length === 2 || selectedMinors.length === 2 ? "flex-wrap" : "flex-nowrap overflow-hidden"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-gray-700"></div>
                      <span className="text-[11px] text-gray-600">GenEd</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-blue-600"></div>
                      <span className="text-[11px] text-gray-600">SBS Core</span>
                    </div>
                    {selectedMajors.length === 1 ? (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-orange-600"></div>
                          <span className="text-[11px] text-gray-600">Major (Required)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-yellow-400"></div>
                          <span className="text-[11px] text-gray-600">Major (Elective)</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-orange-600"></div><div className="w-2.5 h-2.5 rounded bg-yellow-400"></div>
                          <span className="text-[11px] text-gray-600">Major 1: {majors[selectedMajors[0]].code}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-[#b98a63]"></div><div className="w-2.5 h-2.5 rounded bg-[#bdb36a]"></div>
                          <span className="text-[11px] text-gray-600">Major 2: {majors[selectedMajors[1]].code}</span>
                        </div>
                      </>
                    )}
                    {selectedMinors.length === 1 && (
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded bg-teal-600"></div><div className="w-2.5 h-2.5 rounded bg-cyan-500"></div>
                        <span className="text-[11px] text-gray-600">Minor: {minors[selectedMinors[0]].code}</span>
                      </div>
                    )}
                    {selectedMinors.length === 2 && (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-teal-600"></div><div className="w-2.5 h-2.5 rounded bg-cyan-500"></div>
                          <span className="text-[11px] text-gray-600">Minor 1: {minors[selectedMinors[0]].code}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-[#6f9a93]"></div><div className="w-2.5 h-2.5 rounded bg-[#7f9fac]"></div>
                          <span className="text-[11px] text-gray-600">Minor 2: {minors[selectedMinors[1]].code}</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-purple-600"></div>
                      <span className="text-[11px] text-gray-600">Free Elective</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-gray-300 pl-2">
                      <div className="w-4 h-4 rounded bg-gray-300 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[11px] text-gray-600">Completed</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-gray-300 pl-2">
                      <span className="text-sm font-medium text-gray-500">(T)</span>
                      <span className="text-[11px] text-gray-600">Transfer</span>
                    </div>
                  </div>
                  {/* Help (small version for narrow screens; on wide screens Help is at the bottom of the left menu) */}
                  <button
                    onClick={() => setShowHelp(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-sm font-semibold hover:bg-amber-100 whitespace-nowrap"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">?</span>
                    Help
                  </button>
                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end gap-0.5 whitespace-nowrap">
                      <input
                        type="text"
                        value={studentName}
                        maxLength={NAME_MAX}
                        aria-label="Your name or alias (up to 30 characters)"
                        title="Click to type your name or an alias"
                        onChange={(e) => setStudentName(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        onBlur={() => { if (!studentName.trim()) setStudentName(DEFAULT_NAME); }}
                        style={{ width: `calc(${Math.min(Math.max(studentName.length, 11), 18) + 2}ch + 14px)` }}
                        className="max-w-full text-sm text-right font-semibold text-gray-800 bg-transparent rounded-md px-1.5 py-0.5 border border-transparent hover:border-gray-300 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-gray-500">
                        Started:
                        <select
                          value={startTerm}
                          onChange={(e) => changeStartTerm(e.target.value)}
                          className="text-xs text-gray-700 bg-transparent rounded-md px-1 py-0.5 border border-transparent hover:border-gray-300 focus:border-amber-400 focus:bg-white focus:outline-none cursor-pointer"
                        >
                          {START_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-gray-500">
                        Expected Grad.:
                        <select
                          value={gradTerm}
                          onChange={(e) => setGradTerm(e.target.value)}
                          className="text-xs text-gray-700 bg-transparent rounded-md px-1 py-0.5 border border-transparent hover:border-gray-300 focus:border-amber-400 focus:bg-white focus:outline-none cursor-pointer"
                        >
                          {gradTermOptions(startTerm).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </label>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md" aria-hidden="true">
                      {initialsOf(studentName)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-6 py-8 flex items-start gap-6">
          {/* Left navigation menu (sticks to the screen while the page scrolls) */}
          <nav aria-label="Page sections" className="hidden lg:block w-48 flex-shrink-0 sticky top-28 self-start">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-3">On this page</div>
            <ul className="border-l border-gray-200 space-y-0.5">
              {NAV_ITEMS.map(item => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={"#" + item.id}
                      onClick={goToSection(item)}
                      aria-current={active ? "location" : undefined}
                      className={`block -ml-px border-l-2 py-1.5 pr-2 text-sm transition-colors ${item.level === 2 ? "pl-7 text-[13px]" : "pl-3 font-medium"} ${active ? "border-amber-500 text-amber-700 bg-amber-50/80 font-semibold" : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-white/70"}`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            {/* Help: large and prominent at the end of the menu */}
            <button
              type="button"
              onClick={() => setShowHelp(true)}
              className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-lg font-bold shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-200 transition-shadow"
            >
              <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-base">?</span>
              Help
            </button>
          </nav>

          <main className="flex-1 min-w-0">
            {/* Overview section: majors, minors, degree progress */}
            <section id="overview" className="scroll-mt-28 bg-slate-200/70 rounded-xl p-4 shadow-sm border border-slate-300 mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_250px] gap-4">
              {/* Major(s) Selector */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Selected Major(s)</label>
                <MultiSelect
                  options={majors}
                  selected={selectedMajors}
                  onToggle={toggleMajor}
                  theme={majorTheme}
                  placeholder="Select major(s)"
                  minSelected={1}
                  maxSelected={2}
                  renderMeta={(m) => `${m.credits} cr`}
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedMajors.map((i, n) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${n === 1 ? "bg-[#ecd5bd] text-[#8a4b1e]" : majorTheme.chip}`}>
                      {majors[i].code}: {majors[i].required} required + {majors[i].elective} electives
                    </span>
                  ))}
                </div>
              </div>

              {/* Minor(s) Selector */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Selected Minor(s)</label>
                <MultiSelect
                  options={minors}
                  selected={selectedMinors}
                  onToggle={toggleMinor}
                  theme={minorTheme}
                  placeholder="Select minor(s)"
                  maxSelected={2}
                  renderMeta={(m) => `${m.credits} cr`}
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedMinors.length === 0 ? (
                    <span className="text-xs text-gray-400">No minor selected</span>
                  ) : selectedMinors.map((i, n) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${n === 1 ? "bg-[#cfe3df] text-[#3d6660]" : minorTheme.chip}`}>{minors[i].name}</span>
                  ))}
                </div>
              </div>

              {/* Progress Ring */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Degree Progress</label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="relative">
                    <ProgressRing progress={progress} size={60} strokeWidth={6} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base font-bold text-gray-800">{progress}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">{completedCredits} <span className="text-sm font-normal text-gray-500">/ 124</span></div>
                    <div className="text-xs text-gray-500">credits completed</div>
                  </div>
                </div>
              </div>

            </div>
            </section>

            {/* BSBA Graduation Requirements section */}
            <section id="requirements" className="scroll-mt-28 bg-slate-200/70 rounded-xl p-4 shadow-sm border border-slate-300 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">BSBA Graduation Requirements <span className="normal-case font-medium text-gray-500 tracking-normal">(min. 124 credits)</span></h2>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-2 bg-gray-500 rounded-sm" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 2px, transparent 2px 4px)" }}></div>
                    <span>Transfer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-2 bg-gradient-to-r from-blue-500 via-orange-500 to-purple-500 rounded-sm"></div>
                    <span>Suffolk</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-2 bg-gray-200 rounded-sm border border-gray-300"></div>
                    <span>Remaining</span>
                  </div>
                </div>
              </div>
              {/* One bar: GenEd, SBS Core, major(s), minor(s), Free Electives, each as wide as its share of the credits */}
              <RequirementsBar segments={requirementSegments} />
            </section>

            {/* Plans section: plan tabs, year filter, year rows */}
            <section id="plans" className="scroll-mt-28">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Plans</h2>
            {/* Plan tabs: one per major/minor combination */}
            <div className="mb-4">
              <div className="flex items-end gap-1 flex-wrap border-b border-gray-200">
                {tabs.map(t => {
                  const isActive = t.id === activeTab.id;
                  return (
                    <div key={t.id} className={`${t.id === newTabId ? "tab-spotlight " : ""}flex items-center rounded-t-lg border border-b-0 -mb-px ${isActive ? "bg-white border-orange-300 text-orange-700" : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <button onClick={() => setActiveTabId(t.id)} className={`pl-4 ${t.id === "base" ? "pr-4" : "pr-2"} py-2 text-sm ${isActive ? "font-bold" : "font-medium"}`}>
                        {tabLabel(t)}{t.id === "base" && <span className="ml-2 text-xs font-normal text-gray-400">base plan</span>}
                      </button>
                      {t.id !== "base" && (
                        <button onClick={() => closeTab(t.id)} aria-label="Close plan tab" title="Close this plan" className="pr-3 pl-1 py-2 text-gray-400 hover:text-gray-700 text-base leading-none">&times;</button>
                      )}
                    </div>
                  );
                })}
              </div>
              {activeTab.notice && (
                <div className="mt-3 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800 space-y-1">
                  {activeTab.notice.split("\n").map((line, i) => <div key={i}>{line}</div>)}
                </div>
              )}
            </div>

            {/* Year Filter Tabs */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-semibold text-gray-500 mr-2">View:</span>
              <button
                onClick={() => setActiveYear(null)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeYear === null 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                All Years
              </button>
              {[1, 2, 3, 4].map(year => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeYear === year 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Year {year}
                </button>
              ))}
              {/* Print: saves the plan in the current tab as a one-page PDF */}
              <button
                type="button"
                onClick={printPlan}
                disabled={printing}
                aria-label="Save this plan as a one-page PDF"
                title="Save this plan as a one-page PDF"
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 shadow-md hover:from-purple-700 hover:to-purple-900 disabled:opacity-60 disabled:cursor-wait transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                {printing ? "Preparing…" : "Print"}
              </button>
            </div>

            {/* Year Rows */}
            <LockContext.Provider value={{ locks, toggle: toggleLock }}>
            <CompletedContext.Provider value={toggleCompleted}>
            <TransferredContext.Provider value={toggleTransferredCard}>
            <SelectContext.Provider value={(rect, id, yearKey, semester) => setMenu({ rect, id, yearKey, semester })}>
            <MoveContext.Provider value={moveCourse}>
            {activeYear === null && (
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 serif">All Years</h3>
                <p className="text-sm text-gray-500">{allYearsCredits} credits planned across four years</p>
              </div>
            )}
            <div className="space-y-8">
              {yearsToShow.map(yearNum => (
                <div key={yearNum} id={`year-${yearNum}`} className="scroll-mt-28">
                <YearRow
                  yearNum={yearNum}
                  yearData={courseData[`year${yearNum}`]}
                  yearKey={`year${yearNum}`}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  onDragEnter={handleDragEnter}
                  dropTarget={dropTarget}
                  draggingCourse={draggingCourse}
                />
                </div>
              ))}
            </div>
            </MoveContext.Provider>
            </SelectContext.Provider>
            </TransferredContext.Provider>
            </CompletedContext.Provider>
            <CourseMenu menu={menu} course={menuCourse} usedNames={usedNames} onClose={() => setMenu(null)} onEnter={enterCourse} onReset={resetCourse} onChoose={chooseCourse} />
            </LockContext.Provider>
            </section>
          </main>
          </div>

          {/* Footer */}
          <footer className="mt-8 py-6 border-t border-gray-200 bg-white/50">
            <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
              <div>©2025 Nesij Huvaj. All rights reserved.</div>
              <div className="mt-1">
                This work is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="text-amber-600 hover:text-amber-700 underline" target="_blank">CC BY-NC-SA</a>.
              </div>
            </div>
          </footer>

          {/* Quick-start help pop-up */}
          <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />

          {/* Credit Warning Modal */}
          <CreditWarningModal 
            isOpen={showCreditWarning} 
            onClose={handleCloseWarning}
            isOverLimit={isOverCreditLimit}
          />
        </div>
      );
    }


createRoot(document.getElementById('root')).render(<App />);
