// Шаг 5: Выпадающий список select и событие change
// Теория по этой теме подробно описана в файле README.md в этой папке.

const sortSelect = document.getElementById('demoSort');

if (sortSelect) {
  // Событие change срабатывает, когда пользователь выбирает новый пункт из списка:
  sortSelect.addEventListener('change', function () {
    console.log('Выбран режим сортировки:', sortSelect.value);
  });
}
