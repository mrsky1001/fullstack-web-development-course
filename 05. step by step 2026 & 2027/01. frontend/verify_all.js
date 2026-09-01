const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
let errors = 0;
let checks = 0;

function assert(condition, message) {
  checks++;
  if (!condition) {
    console.error('❌ FAIL: ' + message);
    errors++;
  } else {
    console.log('✅ PASS: ' + message);
  }
}

console.log('=== STARTING FULL VALIDATION ===\n');

// 1. Проверяем наличие всех 9 папок вебинаров и README
for (let i = 1; i <= 9; i++) {
  const wDirName = 'webinar-0' + i;
  const wDir = fs.readdirSync(ROOT).find(f => f.startsWith(wDirName));
  assert(Boolean(wDir), 'Found directory for ' + wDirName + ' (' + wDir + ')');
  if (wDir) {
    const rPath = path.join(ROOT, wDir, 'README.md');
    assert(fs.existsSync(rPath) && fs.statSync(rPath).size > 100, 'README.md exists and valid in ' + wDir);
  }
}

// 2. Проверяем синтаксис всех JS файлов
console.log('\n--- Checking JS Syntax ---');
function checkJsFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      checkJsFiles(full);
    } else if (f.endsWith('.js')) {
      try {
        execSync(`node -c "${full}"`);
        assert(true, 'JS syntax valid: ' + path.relative(ROOT, full));
      } catch (err) {
        assert(false, 'JS syntax error in: ' + path.relative(ROOT, full) + ': ' + err.message);
      }
    }
  });
}
checkJsFiles(ROOT);

// 3. Проверяем целостность картинок и SVG в каждом вебинаре (со 2 по 9)
console.log('\n--- Checking Assets in Webinars ---');
for (let i = 2; i <= 9; i++) {
  const wDir = fs.readdirSync(ROOT).find(f => f.startsWith('webinar-0' + i));
  ['basic', 'with-comments'].forEach(type => {
    const imgDir = path.join(ROOT, wDir, type, 'img');
    assert(fs.existsSync(imgDir), 'img dir exists in ' + wDir + '/' + type);
    const requiredImages = [
      'logo.svg', 'no-image.svg',
      'room-1.jpg', 'room-2.jpg', 'room-3.jpg', 'room-4.jpg', 'room-5.jpg', 'room-6.jpg',
      'slider-1.jpg', 'slider-2.jpg', 'slider-3.jpg', 'slider-4.jpg'
    ];
    requiredImages.forEach(img => {
      const p = path.join(imgDir, img);
      assert(fs.existsSync(p) && fs.statSync(p).size > 0, img + ' exists in ' + wDir + '/' + type);
    });
  });
}

// 4. Проверяем наличие ключевых страниц в вебинарах 5..9
console.log('\n--- Checking Room Details in Webinars 5..9 ---');
for (let i = 5; i <= 9; i++) {
  const wDir = fs.readdirSync(ROOT).find(f => f.startsWith('webinar-0' + i));
  ['basic', 'with-comments'].forEach(type => {
    const fp = path.join(ROOT, wDir, type, 'pages', 'room-details.html');
    assert(fs.existsSync(fp) && fs.statSync(fp).size > 0, 'room-details.html exists in ' + wDir + '/' + type);
  });
}

// 5. Проверяем наличие ключевых страниц в вебинаре 9 (итоговая сборка 7 страниц)
console.log('\n--- Checking Webinar 9 Pages (7 pages) ---');
const w9Dir = fs.readdirSync(ROOT).find(f => f.startsWith('webinar-09'));
['basic', 'with-comments'].forEach(type => {
  const base = path.join(ROOT, w9Dir, type);
  const pages = [
    'index.html',
    'pages/catalog.html',
    'pages/room-details.html',
    'pages/booking.html',
    'pages/my-bookings.html',
    'pages/register.html',
    'pages/login.html',
    'css/style.css',
    'js/data.js',
    'js/main.js'
  ];
  pages.forEach(p => {
    const fp = path.join(base, p);
    assert(fs.existsSync(fp) && fs.statSync(fp).size > 0, 'Page exists in webinar-09/' + type + ': ' + p);
  });
});

console.log('\n=== SUMMARY ===');
console.log(`Total checks: ${checks}, Errors: ${errors}`);
if (errors === 0) {
  console.log('🎉 ALL CHECKS PASSED PERFECTLY!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
