// Шаг 4: Управление классами через classList
// Теория по этой теме подробно описана в файле README.md в этой папке.

const firstLink = document.querySelector('.nav-link');

if (firstLink) {
  console.log('Есть ли класс active у первой ссылки?', firstLink.classList.contains('active'));

  // Удаляем класс:
  firstLink.classList.remove('active');
  console.log('Удалили класс active:', firstLink.classList.contains('active'));

  // Добавляем класс обратно:
  firstLink.classList.add('active');
  console.log('Добавили класс active:', firstLink.classList.contains('active'));
}
