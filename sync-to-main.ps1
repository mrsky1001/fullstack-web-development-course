<#
.SYNOPSIS
    Автоматическая синхронизация:
    1. Пушит всю текущую работу (агент, скрипты, презентации, код) в ветку agent-workspace.
    2. Переносит только чистые учебные материалы в ветку main и пушит её в GitHub.
    3. Возвращает вас в ветку agent-workspace.
#>

param (
    [string]$Message = "chore: update course materials"
)

Write-Host ">>> [1/4] Сохранение изменений в ветке agent-workspace..." -ForegroundColor Cyan
git add -A
$status = git status --porcelain
if ($status) {
    git commit -m $Message
}
git push origin agent-workspace

Write-Host ">>> [2/4] Переключение на ветку main..." -ForegroundColor Cyan
git checkout main

Write-Host ">>> [3/4] Перенос только учебных папок из agent-workspace..." -ForegroundColor Cyan
# Переносим только учебные папки курса
git checkout agent-workspace -- "01. frontend" "02. frontend-course-advanced" "03. backend" "04. full-stack-store-app" "05. step by step 2026 & 2027" "README.md" 2>$null

$mainStatus = git status --porcelain
if ($mainStatus) {
    git add -A
    git commit -m $Message
    git push origin main
    Write-Host ">>> [OK] Ветка main успешно обновлена и запушена!" -ForegroundColor Green
} else {
    Write-Host ">>> [INFO] В учебных материалах нет новых изменений для main." -ForegroundColor Yellow
}

Write-Host ">>> [4/4] Возврат в рабочую ветку agent-workspace..." -ForegroundColor Cyan
git checkout agent-workspace
Write-Host ">>> Готово! Вы находитесь в ветке agent-workspace." -ForegroundColor Green
