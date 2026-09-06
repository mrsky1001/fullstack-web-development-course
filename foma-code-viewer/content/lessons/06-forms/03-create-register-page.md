---
title: "Страница регистрации"
highlight: html
---

# Создание страницы регистрации

Теперь представьте, что мы создали файл `pages/register.html`.
Он будет иметь точно такой же каркас, как и страница входа, но другой заголовок.

Страница регистрации нужна для создания нового аккаунта. Форма на этой странице будет намного больше: нам нужно будет спросить у пользователя ФИО, телефон, E-mail, и попросить ввести пароль дважды (для проверки на опечатки).

## 🛠 Задание

Изучите каркас страницы регистрации.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Регистрация — СмартОфис</title>
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <!-- ... шапка ... -->

  <main class="main">
    <div class="container">
      <h1 class="page-title">Создание аккаунта</h1>
      <p class="page-subtitle">Зарегистрируйтесь, чтобы получить доступ к бронированию</p>
      
      <!-- Место для формы регистрации -->

    </div>
  </main>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Регистрация — СмартОфис</title>
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <!-- ... шапка ... -->

  <main class="main">
    <div class="container">
      <h1 class="page-title">Создание аккаунта</h1>
      <p class="page-subtitle">Зарегистрируйтесь, чтобы получить доступ к бронированию</p>
      
      <!-- Место для формы регистрации -->

    </div>
  </main>
</body>
</html>
```
