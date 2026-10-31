// ==========================================================================
// СмартОфис — Вебинар 09: Модуль живого поиска и фильтрации (filters.js)
// ==========================================================================

function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');

  if (!searchInput && !sortSelect && !sortAscBtn && !sortDescBtn) return;

  let currentSort = 'default';

  function applyFilters() {
    let result = [...OFFICE_ROOMS];

    // Поиск по названию
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(q));
    }

    // Сортировка по цене
    if (currentSort === 'price-asc') {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (currentSort === 'price-desc') {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    renderCatalog(result);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentSort = sortSelect.value;
      applyFilters();
    });
  }

  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', function () {
      currentSort = 'price-asc';
      if (sortSelect) sortSelect.value = 'price-asc';
      applyFilters();
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', function () {
      currentSort = 'price-desc';
      if (sortSelect) sortSelect.value = 'price-desc';
      applyFilters();
    });
  }
}
