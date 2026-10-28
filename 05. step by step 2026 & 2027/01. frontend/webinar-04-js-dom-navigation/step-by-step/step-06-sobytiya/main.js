// Шаг 6: События и клики
const loginBtn = document.querySelector('.nav-btn');

if (loginBtn) {
  loginBtn.addEventListener('click', function (event) {
    event.preventDefault(); // предотвращаем переход по пустой ссылке #
    alert('Вы нажали на кнопку «Войти»!');
    console.log('Клик по кнопке входа зафиксирован!');
  });
}
