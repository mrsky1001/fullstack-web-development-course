// Шаг 5: Выпадающий список select
const sortSelect = document.getElementById('demoSort');

if (sortSelect) {
  sortSelect.addEventListener('change', function () {
    console.log('Выбран режим сортировки:', sortSelect.value);
  });
}
