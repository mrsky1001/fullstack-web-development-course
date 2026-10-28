// Шаг 1: Событие input (живой поиск)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const searchInput = document.getElementById('demoSearch');

if (searchInput) {
  // Событие input срабатывает сразу при вводе каждой отдельной буквы:
  searchInput.addEventListener('input', function () {
    console.log('Введено в поле поиска:', searchInput.value);
  });
}
