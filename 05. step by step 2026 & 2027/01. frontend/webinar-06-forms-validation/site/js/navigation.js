// ==========================================================================
// СмартОфис — Вебинар 06: Модуль навигации (navigation.js)
// ==========================================================================

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.toLowerCase();

  navLinks.forEach(function (link) {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href) {
      const pageName = href.split('/').pop().toLowerCase();
      if (pageName && currentPath.endsWith(pageName)) {
        link.classList.add('active');
      } else if (currentPath.includes('room-details') && pageName.includes('catalog')) {
        link.classList.add('active');
      }
    }

    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  const hasActive = document.querySelector('.nav-link.active');
  if (!hasActive && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  // Обновляем кнопку в шапке, если пользователь авторизован
  updateAuthStatus();
}

// Отображение статуса авторизации в шапке
function updateAuthStatus() {
  const authBtn = document.getElementById('authNavBtn');
  if (!authBtn) return;

  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      const name = user.name || user.login || 'Пользователь';
      authBtn.textContent = 'Выйти (' + name + ')';
      authBtn.href = '#';
      authBtn.onclick = function (e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showToast('Вы вышли из системы.');
        setTimeout(function () {
          window.location.reload();
        }, 800);
      };
    } catch (e) {}
  }
}

// Простейшее всплывающее уведомление (Toast) сверху справа
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  if (window._toastTimeout) {
    clearTimeout(window._toastTimeout);
  }
  window._toastTimeout = setTimeout(function () {
    toast.classList.remove('show');
  }, 2800);
}
window.showToast = showToast;
