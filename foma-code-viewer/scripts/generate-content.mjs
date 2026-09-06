// Generate .md content files from existing .ts lesson data
// Run: node scripts/generate-content.mjs

import { writeFileSync } from 'fs';

const lessons = [
  { id: 2, dir: '02-markup', title: 'Основы разметки и стилизации' },
  { id: 3, dir: '03-flexbox', title: 'Flexbox-сетка и карточки' },
  { id: 4, dir: '04-js-dom', title: 'JavaScript: DOM и навигация' },
  { id: 5, dir: '05-catalog', title: 'Работа с данными: Каталог' },
  { id: 6, dir: '06-forms', title: 'Валидация форм' },
  { id: 7, dir: '07-slider', title: 'Слайдер и таймеры' },
  { id: 8, dir: '08-search', title: 'Поиск, сортировка и калькулятор' },
  { id: 9, dir: '09-final', title: 'Итоговая сборка' },
];

for (const l of lessons) {
  writeFileSync(`content/lessons/${l.dir}/_lesson.yml`, `id: ${l.id}\ntitle: "${l.title}"\n`);
}

console.log('Generated _lesson.yml files for all lessons');
