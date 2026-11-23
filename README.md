# CourseCoach

An academic advising web app for the Sawyer Business School (Suffolk University).

**Live site:** https://profhuvaj.github.io/CourseCoach/

## Folder layout

```
CourseCoach/
├── site/                  <- everything here is published to the web
│   └── index.html         <- the app (single-file React + Tailwind)
├── scripts/publish.ps1    <- one-command commit + push
├── .github/workflows/     <- GitHub Actions: auto-deploy to Pages on push to main
├── .gitignore             <- keeps private/scratch files out of the repo
└── README.md
```

Only `site/` is deployed. Put new pages, images, and data files for the site inside `site/`.

## Everyday workflow

1. Edit files in `C:\Dev\CourseCoach\site\`.
2. Preview locally: open `site\index.html` in a browser (or run `python -m http.server 8000 --directory site` and visit http://localhost:8000).
3. Publish:
   ```powershell
   .\scripts\publish.ps1 "Short description of what changed"
   ```
4. Wait about a minute; the live site updates automatically. Progress is under the repo's **Actions** tab.

## Practices

- **Public means public.** Everything committed, including past versions, is visible. Use only sample or fictional student data. Never commit real student names, IDs, grades, or advising notes.
- **Small, frequent commits** with clear messages make it easy to undo mistakes (`git revert <commit>`).
- **Keep drafts out of the repo**: use `drafts/` or `scratch/` (git-ignored).
- **Stay outside OneDrive.** This folder lives in `C:\Dev` because OneDrive syncing can corrupt `.git`. GitHub is the backup.
- **Roll back a bad publish:** `git revert HEAD` then `.\scripts\publish.ps1 "Revert last change"`.

## Known improvements to consider

- The app loads React, Babel, and Tailwind from CDNs in development mode. It works, but is slower than a built version.
