# CourseCoach: to-do list (for Nesij)

Tasks to come back to later. Tick them off as you finish.

- [ ] **Write the contents of the Help page.** The current text in `src/helpContent.jsx` is a first draft that feeds both the quick-start pop-up and the full help page (`/CourseCoach/help.html`). Revise it in your own words.
- [ ] **Decide what happens when different starting years or semesters are chosen.** Today the "Started" list (Spring/Fall 2022 to 2028) only changes the "Expected Grad." default (seven semesters later). It does not change the plan itself, which is still built around a Fall start. Settings live near the top of `src/main.jsx` (`FIRST_START_YEAR`, `LAST_START_YEAR`, `SEMESTERS_TO_GRADUATE`).
- [ ] **Cross-device compatibility checks.** Everything so far has been built and tested for a laptop screen. Check phones and tablets, touch-screen dragging, and the header (the name and term boxes are hidden on narrow screens).

## Housekeeping reminders

- [ ] GitHub token expires about 90 days after it was created. Make a new classic token (scopes `repo` and `workflow`) when pushes start asking for a password.
