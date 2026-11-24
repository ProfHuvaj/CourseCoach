# CourseCoach: to-do list (for Nesij)

Tasks to come back to later. Tick them off as you finish.

- [ ] **Write the contents of the Help page.** The current text in `src/helpContent.jsx` is a first draft that feeds both the quick-start pop-up and the full help page (`/CourseCoach/help.html`). Revise it in your own words.
- [ ] **Decide what happens when different starting years or semesters are chosen.** Today the "Started" list (Spring/Fall 2022 to 2028) only changes the "Expected Grad." default (seven semesters later). It does not change the plan itself, which is still built around a Fall start. Settings live near the top of `src/main.jsx` (`FIRST_START_YEAR`, `LAST_START_YEAR`, `SEMESTERS_TO_GRADUATE`).
- [ ] **Cross-device compatibility checks.** Everything so far has been built and tested for a laptop screen. Check phones and tablets, touch-screen dragging, and the header (the name and term boxes are hidden on narrow screens).
- [x] **"© 2025 the serious amateur dot com by Nesij Huvaj. All rights reserved." --> "©2025 Nesij Huvaj. All rights reserved."**
- [ ] **"Use the boxes at the top. You can choose up to two majors and up to two minors. Each new combination opens its own plan tab, so you can compare options side by side." --> "Use the boxes at the top. You can choose up to two majors and up to two minors. Each new combination opens its own plan tab, so you can compare options side by side."**
- [ ] **create a "How to use this academic planning tool?" guide. this will be a quick tutorial that is different from the help/notice/reminder pop-up and page**
- [ ] **! add a prominent privacy and indemnification notice that needs to be clicked to proceed !**
- [ ] **the "SU" text in the orange box on top left needs to be edited for visual consistency**
- [ ] **"Help" button needs to be larger and more prominent -- maybe moved to left on the page or some other place?**
- [ ] **think about the layout: 1990s old school web page style, permanent menu on the left?**
- [ ] **remove the summers block to make space, but find a way to invoke them when necessary**
- [ ] **links to majors' current curricula on the Suffolk web page (catalogue) that are bookmarked in my advising browser folder on Chrome**
- [ ] **Add a print/export button which would export the plan in the current tab as a *.docx file**

## Housekeeping reminders

- [ ] GitHub token expires about 90 days after it was created. Make a new classic token (scopes `repo` and `workflow`) when pushes start asking for a password.
