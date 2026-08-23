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

  // 3. Изображения переговорных комнат (300x200, светлая тема, детализированная векторная графика)
  const rooms = [
    {
      name: 'room-1.svg',
      title: 'Мини-офис Focus',
      badge: '1-2 чел.',
      type: 'Кабинет для звонков',
      icon: '<rect x="130" y="55" width="40" height="28" rx="3" fill="#007bff"/><line x1="140" y1="83" x2="160" y2="83" stroke="#007bff" stroke-width="3"/><circle cx="150" cy="50" r="8" fill="#eaf2ff" stroke="#007bff" stroke-width="2"/>'
    },
    {
      name: 'room-2.svg',
      title: 'Конференц-зал Alpha',
      badge: 'до 12 чел.',
      type: 'Большая переговорная',
      icon: '<rect x="115" y="48" width="70" height="35" rx="4" fill="#007bff"/><circle cx="100" cy="65" r="6" fill="#222222"/><circle cx="200" cy="65" r="6" fill="#222222"/><line x1="130" y1="58" x2="170" y2="58" stroke="#ffffff" stroke-width="2"/>'
    },
    {
      name: 'room-3.svg',
      title: 'Опенспейс Hub',
      badge: 'Индивидуально',
      type: 'Рабочее место',
      icon: '<rect x="120" y="60" width="60" height="24" rx="2" fill="#eaf2ff" stroke="#007bff" stroke-width="2"/><rect x="135" y="45" width="30" height="18" rx="2" fill="#007bff"/><circle cx="150" cy="72" r="4" fill="#222222"/>'
    },
    {
      name: 'room-4.svg',
      title: 'Переговорная Solo',
      badge: '1-4 чел.',
      type: 'Звукоизолированная',
      icon: '<rect x="125" y="50" width="50" height="34" rx="6" fill="#ffffff" stroke="#007bff" stroke-width="2"/><circle cx="140" cy="67" r="5" fill="#007bff"/><circle cx="160" cy="67" r="5" fill="#007bff"/>'
    },
    {
      name: 'room-5.svg',
      title: 'Премиум Сьют Executive',
      badge: 'до 8 чел.',
      type: 'VIP Пространство',
      icon: '<rect x="110" y="45" width="80" height="40" rx="6" fill="#222222"/><path d="M125 65H175" stroke="#007bff" stroke-width="3"/><circle cx="150" cy="55" r="5" fill="#ffffff"/>'
    },
    {
      name: 'room-6.svg',
      title: 'Творческая студия Design',
      badge: 'до 6 чел.',
      type: 'Креативная зона',
      icon: '<rect x="120" y="45" width="60" height="38" rx="4" fill="#eaf2ff" stroke="#222222" stroke-width="2"/><circle cx="140" cy="62" r="6" fill="#007bff"/><circle cx="160" cy="62" r="6" fill="#0056b3"/>'
    }
  ];

  rooms.forEach(r => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <rect width="300" height="200" fill="#f8f9fa"/>
  <rect x="10" y="10" width="280" height="180" rx="6" fill="#ffffff" stroke="#dddddd" stroke-width="1.5"/>
  <g>${r.icon}</g>
  <text x="150" y="125" fill="#222222" font-size="14" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">${r.title}</text>
  <text x="150" y="145" fill="#666666" font-size="11" font-family="Arial, sans-serif" text-anchor="middle">${r.type}</text>
  <rect x="105" y="155" width="90" height="20" rx="10" fill="#eaf2ff"/>
  <text x="150" y="169" fill="#007bff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">${r.badge}</text>
</svg>`;
    fs.writeFileSync(path.join(targetDir, r.name), svg);
  });

  // 4. Слайды (800x400)
  const slides = [
    { title: 'Современные переговорные комнаты', sub: 'Оснащены 4K экранами и скоростным интернетом', tag: 'SMART SPACES' },
    { title: 'Индивидуальные тихие капсулы', sub: 'Идеальная звукоизоляция для важных звонков', tag: 'FOCUS ZONE' },
    { title: 'Просторный коворкинг оупенспейс', sub: 'Гибкие тарифы от 1 часа без долгосрочных договоров', tag: 'OPEN HUB' },
    { title: 'Премиум кабинеты для команд', sub: 'Полный сервис, кофе-поинт и переговорные включены', tag: 'TEAM SUITE' }
  ];

  slides.forEach((s, idx) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
  <rect width="800" height="400" fill="#f8f9fa"/>
  <rect x="30" y="30" width="740" height="340" rx="8" fill="#ffffff" stroke="#dddddd" stroke-width="2"/>
  <rect x="60" y="70" width="130" height="26" rx="4" fill="#007bff"/>
  <text x="125" y="87" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">${s.tag}</text>
  <text x="60" y="155" fill="#222222" font-size="26" font-family="Arial, sans-serif" font-weight="bold">${s.title}</text>
  <text x="60" y="195" fill="#666666" font-size="15" font-family="Arial, sans-serif">${s.sub}</text>
  <line x1="60" y1="240" x2="740" y2="240" stroke="#eeeeee" stroke-width="1.5"/>
  <circle cx="70" cy="280" r="4" fill="#007bff"/>
  <text x="85" y="284" fill="#007bff" font-size="13" font-family="Arial, sans-serif" font-weight="bold">СмартОфис • Бронирование рабочих пространств</text>
</svg>`;
    fs.writeFileSync(path.join(targetDir, `slider-${idx + 1}.svg`), svg);
  });
}

module.exports = { createSvgAssets };

if (require.main === module) {
  const base = process.argv[2] || '.';
  createSvgAssets(base);
  console.log('Generated images + placeholder in ' + base);
}
