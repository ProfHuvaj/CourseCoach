<#
.SYNOPSIS
  Run this after you merge a pull request on GitHub. Brings your computer up to date and tidies old branches.
#>
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

$old = git branch --show-current
git checkout main
git pull
if ($old -and $old -ne 'main') {
    git branch -d $old 2>$null
    if ($LASTEXITCODE -ne 0) { Write-Host "Kept branch '$old' (it has changes not yet merged)." -ForegroundColor Yellow }
}
Write-Host "`nUp to date on main. Live site: https://profhuvaj.github.io/CourseCoach/" -ForegroundColor Green
