<#
.SYNOPSIS
  Save your work and send it to GitHub for review, the safe way.

.DESCRIPTION
  - If you are on main, creates a new branch for you (named from the message).
  - Builds the site first; stops if the build fails.
  - Commits everything and pushes the branch.
  - Prints the link where you click "Create pull request", then "Merge" to go live.

.EXAMPLE
  .\scripts\publish.ps1 "Update spring course list"
#>
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Message
)

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (git status --porcelain)) {
    Write-Host "Nothing to publish: no changes." -ForegroundColor Yellow
    exit 0
}

# Safety net: refuse to continue if obvious secrets appear in changed files.
$hits = git grep -n -I -E "(api[_-]?key|secret|password)\s*[:=]\s*['""][^'""]+['""]" -- . ':!package-lock.json' 2>$null
if ($hits) {
    Write-Host "Possible secret found. Review before publishing:" -ForegroundColor Red
    $hits
    exit 1
}

# Never work directly on main: make a branch.
$branch = git branch --show-current
if ($branch -eq 'main') {
    $slug = ($Message.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
    if ($slug.Length -gt 40) { $slug = $slug.Substring(0, 40).Trim('-') }
    $branch = "update-$(Get-Date -Format 'yyyyMMdd-HHmm')-$slug"
    git checkout -b $branch
}

Write-Host "Building to make sure the site works..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Fix the errors above, then run this again." -ForegroundColor Red
    exit 1
}

git add -A
git commit -m $Message
git push -u origin $branch

Write-Host "`nPushed branch '$branch'." -ForegroundColor Green
Write-Host "Next: open the link below, click 'Create pull request', wait for the green check, then 'Merge pull request'." -ForegroundColor Green
Write-Host "https://github.com/ProfHuvaj/CourseCoach/compare/main...$branch?expand=1" -ForegroundColor Green
Write-Host "`nAfter merging, run:  .\scripts\after-merge.ps1" -ForegroundColor Cyan
