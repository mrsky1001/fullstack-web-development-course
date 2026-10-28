// Шаг 1: Живой отклик на ввод текста
const searchInput = document.getElementById('demoSearch');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    console.log('Пользователь вводит:', searchInput.value);
  });
}
