const fs = require('fs');
const path = require('path');

function createSvgAssets(targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  // 1. Логотип (Голубой + Белый)
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <rect width="32" height="32" rx="6" fill="#007bff"/>
  <path d="M8 22V10L16 6L24 10V22L16 26L8 22Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
  <path d="M16 6V26" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2"/>
  <path d="M8 10L16 14L24 10" stroke="#ffffff" stroke-width="2"/>
  <circle cx="16" cy="18" r="2.5" fill="#ffffff"/>
</svg>`;
  fs.writeFileSync(path.join(targetDir, 'logo.svg'), logo);

  // 2. Заглушка (Placeholder) если изображение не добавлено (300x200)
  const noImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <rect width="300" height="200" fill="#f8f9fa"/>
  <rect x="8" y="8" width="284" height="184" rx="6" fill="#ffffff" stroke="#dee2e6" stroke-width="1.5" stroke-dasharray="6 4"/>
  <g transform="translate(126, 55)" fill="none" stroke="#6c757d" stroke-width="2">
    <rect x="0" y="0" width="48" height="36" rx="4"/>
    <circle cx="16" cy="13" r="4"/>
    <path d="M4 32L18 18L30 30M24 24L32 16L44 28"/>
  </g>
  <text x="150" y="125" fill="#222222" font-size="14" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">Нет изображения</text>
  <text x="150" y="145" fill="#666666" font-size="12" font-family="Arial, sans-serif" text-anchor="middle">СмартОфис</text>
</svg>`;
  fs.writeFileSync(path.join(targetDir, 'no-image.svg'), noImage);

  // 3. Копируем реальные высококачественные фотографии комнат и слайдов из temp_images
  const tempDir = path.join(__dirname, 'temp_images');
  if (fs.existsSync(tempDir)) {
    const files = fs.readdirSync(tempDir);
    files.forEach(file => {
      fs.copyFileSync(path.join(tempDir, file), path.join(targetDir, file));
    });
  }
}

module.exports = { createSvgAssets };

if (require.main === module) {
  const base = process.argv[2] || '.';
  createSvgAssets(base);
  console.log('Generated realistic photo assets + SVG in ' + base);
}
