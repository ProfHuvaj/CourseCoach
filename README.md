# CourseCoach

An academic advising web app for the Sawyer Business School (Suffolk University).

**Live site:** https://profhuvaj.github.io/CourseCoach/

## Folder layout

```
CourseCoach/
├── src/
│   ├── main.jsx            <- the app (React)
│   ├── guideContent.jsx    <- student guide wording: quick-start pop-up AND full guide page
│   ├── guide.jsx           <- layout of the full guide page
│   └── index.css           <- styles (Tailwind + custom CSS)
├── public/                 <- files copied as-is: favicon.svg, og-image.png (link-preview image)
├── index.html              <- page shell for the planner: title, description, link-preview tags
├── guide.html              <- page shell for the student guide (published at /CourseCoach/guide.html)
├── scripts/
│   ├── publish.ps1         <- branch + build + commit + push, then prints the pull-request link
│   └── after-merge.ps1     <- run after merging: updates your computer
├── .github/workflows/      <- GitHub Actions: build on every pull request, deploy when merged to main
├── package.json, vite.config.js, tailwind.config.js, postcss.config.js   <- build setup
└── README.md
```

`dist/` and `node_modules/` are created on your computer when you build or install. They are git-ignored.

## Everyday workflow (branch + review)

1. Edit files in `C:\Dev\CourseCoach\src\` (or `public\`, `index.html`).
2. Preview live while you work:
   ```powershell
   npm run dev
   ```
   Then open the address it prints (it ends in `/CourseCoach/`). Press Ctrl+C to stop.
3. Send it to GitHub for review:
   ```powershell
   .\scripts\publish.ps1 "Short description of what changed"
   ```
4. Open the link it prints, click **Create pull request**, wait for the green check (GitHub builds the site), then click **Merge pull request**. The live site updates in about a minute.
5. Back in PowerShell:
   ```powershell
   .\scripts\after-merge.ps1
   ```

First time on a new computer: install Node.js, clone the repo, run `npm install`.

## Practices

- **Public means public.** Everything committed, including past versions, is visible. Use only sample or fictional student data. Never commit real student names, IDs, grades, or advising notes.
- **Nothing goes live without a merge.** The green build check on the pull request means the site compiled; still skim the change before merging.
- **Small, frequent changes** with clear messages make mistakes easy to undo. To roll back, open the merged pull request on GitHub and click **Revert**.
- **Stay outside OneDrive.** This folder lives in `C:\Dev` because OneDrive syncing can corrupt `.git`. GitHub is the backup.
- **Token:** pushes use a GitHub personal access token (classic, scopes `repo` and `workflow`). It expires; create a new one at github.com/settings/tokens when asked.
- **Keep drafts out of the repo** in `drafts/` or `scratch/` (git-ignored).
- **Changing the repo name?** Update `base` in `vite.config.js` and the URLs in `index.html`.
