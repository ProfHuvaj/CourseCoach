<#
.SYNOPSIS
  Commit all changes and push to GitHub, which triggers the automatic Pages deploy.
.EXAMPLE
  .\scripts\publish.ps1 "Update spring course list"
#>
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Message
)

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

git status --short
if (-not (git status --porcelain)) {
    Write-Host "Nothing to publish: no changes." -ForegroundColor Yellow
    exit 0
}

# Safety net: refuse to publish if obvious sensitive patterns appear in tracked/new files.
$hits = git grep -n -I -E "(api[_-]?key|secret|password)\s*[:=]\s*['""][^'""]+['""]" -- . 2>$null
if ($hits) {
    Write-Host "Possible secret found. Review before publishing:" -ForegroundColor Red
    $hits
    exit 1
}

git add -A
git commit -m $Message
git push
Write-Host "`nPushed. Deploy status: https://github.com/profhuvaj/CourseCoach/actions" -ForegroundColor Green
Write-Host "Live site:            https://profhuvaj.github.io/CourseCoach/" -ForegroundColor Green
