// Шаг 1: Событие input (живой поиск)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const searchInput = document.getElementById('searchInput');

if (searchInput) {
  // Событие input срабатывает мгновенно при вводе каждого символа:
  searchInput.addEventListener('input', function () {
    console.log('Пользователь ищет:', searchInput.value);
  });
}
