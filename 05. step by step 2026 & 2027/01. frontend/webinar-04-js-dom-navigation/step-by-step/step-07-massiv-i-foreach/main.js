// Шаг 7: Обход списка элементов через метод forEach
// Теория по этой теме подробно описана в файле README.md в этой папке.

const navLinks = document.querySelectorAll('.nav-link');

// Метод forEach перебирает каждый элемент списка по очереди:
navLinks.forEach(function (link, index) {
  console.log(`Ссылка №${index + 1}: ${link.textContent.trim()}`);
});
