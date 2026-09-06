param (
    [string]$Message = "chore: update course materials"
)

Write-Host ">>> [1/4] Saving changes in agent-workspace..." -ForegroundColor Cyan
git add -A
$status = git status --porcelain
if ($status) {
    git commit -m "$Message"
}
git push origin agent-workspace

Write-Host ">>> [2/4] Switching to main branch..." -ForegroundColor Cyan
git checkout main

Write-Host ">>> [3/4] Syncing course folders from agent-workspace..." -ForegroundColor Cyan
$courseFolders = @(
    "00. resources",
    "01. frontend",
    "02. databases",
    "03. backend",
    "04. full-stack-store-app",
    "05. step by step 2026 & 2027",
    "docs",
    "README.md"
)

foreach ($folder in $courseFolders) {
    if (Test-Path $folder) {
        git checkout agent-workspace -- "$folder" 2>$null
    }
}

$mainStatus = git status --porcelain
if ($mainStatus) {
    git add -A
    git commit -m "$Message"
    git push origin main
    Write-Host ">>> [OK] Branch main updated and pushed!" -ForegroundColor Green
} else {
    Write-Host ">>> [INFO] No new course changes for main branch." -ForegroundColor Yellow
}

Write-Host ">>> [4/4] Returning to agent-workspace..." -ForegroundColor Cyan
git checkout agent-workspace
Write-Host ">>> Done! You are on branch agent-workspace." -ForegroundColor Green