// Шаг 7: Перебор элементов через forEach
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Находим все ссылки навигации
const navLinks = document.querySelectorAll('.nav-link');

console.log('Выводим список всех пунктов меню по очереди:');

// Метод forEach вызывает функцию для каждого элемента по очереди
navLinks.forEach(function (link, index) {
  const text = link.textContent.trim();
  console.log('Пункт номер ' + (index + 1) + ': ' + text);
});
