// Шаг 6: События и клики (addEventListener)
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Находим кнопку входа
const loginBtn = document.querySelector('.nav-btn');

if (loginBtn) {
  // Вешаем слушатель события клика мыши
  loginBtn.addEventListener('click', function (event) {
    // Отменяем стандартный переход по ссылке #
    event.preventDefault();

    // Выполняем нужное действие
    alert('Нажата кнопка Войти!');
    console.log('Событие клика успешно зафиксировано.');
  });
}
