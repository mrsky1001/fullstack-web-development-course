// Шаг 6: Обработка событий клика (addEventListener)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const loginBtn = document.querySelector('.nav-btn');

if (loginBtn) {
  // Назначаем обработчик клика:
  loginBtn.addEventListener('click', function (event) {
    console.log('Пользователь нажал на кнопку «Войти» в шапке сайта!');
  });
}
