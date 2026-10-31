// ==========================================================================
// СмартОфис — Вебинар 08: Модуль живого поиска и фильтрации (filters.js)
// ==========================================================================

function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');

  if (!searchInput && !sortSelect && !sortAscBtn && !sortDescBtn) return;

  let currentSort = 'default';

  function applyFilters() {
    // Создаём поверхностную копию исходного массива через спред-оператор [...]
    // чтобы не мутировать оригинальную базу данных
    let result = [...OFFICE_ROOMS];

    // Шаг А: Фильтрация по поисковой строке
    if (searchInput && searchInput.value.trim()) {
      const query = searchInput.value.trim().toLowerCase();
      // Метод .filter() оставляет только те элементы, которые возвращают true
      result = result.filter(function (room) {
        return room.title.toLowerCase().includes(query);
      });
    }

    // Шаг Б: Сортировка по стоимости аренды
    if (currentSort === 'price-asc') {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (currentSort === 'price-desc') {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    // Отрисовываем отфильтрованный результат
    renderCatalog(result);
  }

  // Событие 'input' срабатывает мгновенно при каждом нажатии клавиши
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Событие 'change' срабатывает при выборе нового пункта в select
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentSort = sortSelect.value;
      applyFilters();
    });
  }

  // Кнопка быстрой сортировки по возрастанию цены
  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', function () {
      currentSort = 'price-asc';
      if (sortSelect) sortSelect.value = 'price-asc';
      applyFilters();
    });
  }

  // Кнопка быстрой сортировки по убыванию цены
  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', function () {
      currentSort = 'price-desc';
      if (sortSelect) sortSelect.value = 'price-desc';
      applyFilters();
    });
  }
}
