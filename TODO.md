# CourseCoach: to-do list (for Nesij)

Tasks to come back to later. Tick them off as you finish.

- [ ] **Write the contents of the Help page.** The current text in `src/helpContent.jsx` is a first draft that feeds both the quick-start pop-up and the full help page (`/CourseCoach/help.html`). Revise it in your own words.
- [ ] **Decide what happens when different starting years or semesters are chosen.** Today the "Started" list (Spring/Fall 2022 to 2028) only changes the "Expected Grad." default (seven semesters later). It does not change the plan itself, which is still built around a Fall start. Settings live near the top of `src/main.jsx` (`FIRST_START_YEAR`, `LAST_START_YEAR`, `SEMESTERS_TO_GRADUATE`).
- [ ] **Cross-device compatibility checks.** Everything so far has been built and tested for a laptop screen. Check phones and tablets, touch-screen dragging, and the header (the name and term boxes are hidden on narrow screens).
- [ ] **"Use the boxes at the top. You can choose up to two majors and up to two minors. Each new combination opens its own plan tab, so you can compare options side by side." --> "Use the boxes at the top. You can choose up to two majors and up to two minors. Each new combination opens its own plan tab, so you can compare options side by side."**
- [ ] **create a "How to use this academic planning tool?" guide. this will be a quick tutorial that is different from the help/notice/reminder pop-up and page**
- [ ] **! add a prominent privacy and indemnification notice that needs to be clicked to proceed !**
- [ ] **links to majors' current curricula on the Suffolk web page (catalogue) that are bookmarked in my advising browser folder on Chrome**
- [ ] **Add a print/export button which would export the plan in the current tab as a *.docx file**
- [x] **Review and approve the proposed longer acronyms for majors and minors** (for example RealEst instead of RE). Done: the approved list from `acrony.xlsx` is applied. To change one later, edit `MAJOR_ACRONYM` or `MINOR_ACRONYM` near the top of `src/main.jsx`.
- [ ] **Provide the complete list of course prerequisites.** The prerequisite check is built and works, but only two courses are entered so far: SIB-429 (needs MKT-210, MGT-217, FIN-200, ISOM-319) and ENT-419 (needs ENT-201, ENT-319). Send me the rest, or add them yourself to the `PREREQUISITES` table near the top of `src/main.jsx` (one line per course).
- [ ] **Provide the template for the one-page printout.** The purple Print button already saves the current tab's plan as a one-page PDF (US Letter, landscape) using a first-draft layout. Send me your template and I will rebuild the layout to match it. The layout lives in one file, `src/planPdf.js`.

## Housekeeping reminders

- [ ] GitHub token expires about 90 days after it was created. Make a new classic token (scopes `repo` and `workflow`) when pushes start asking for a password.
