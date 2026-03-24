# Урок: Как работает аутентификация в Node.js с Passport.js

Привет! В этом уроке мы разберемся, как добавить регистрацию и вход на сайт (аутентификацию). Мы будем использовать популярную библиотеку **Passport.js**. 

Представь, что твой сервер — это закрытый клуб. Чтобы пустить туда человека, нам нужно:
1. Проверить его по списку (есть ли такой логин).
2. Спросить пароль (совпадает ли он с тем, что мы помним).
3. Выдать ему браслет гостя, чтобы не спрашивать пароль при каждом шаге (это называется **Сессия**).

Давай посмотрим, как это настроить в нашем проекте шаг за шагом!

---

## Подготовка: Установка пакетов

В файле `package.json` нашего проекта уже есть нужные библиотеки. Вот за что они отвечают:
* `express-session` — создает "браслеты" (сессии) для пользователей.
* `passport` — главный охранник клуба, управляет процессом входа.
* `passport-local` — инструкция для охранника: "проверяй людей по логину и паролю".
* `bcryptjs` — шифратор паролей. Мы **никогда не храним реальные пароли** в базе, только их зашифрованные копии (хеши).

---

## Шаг 1: Настройка сессий (app.js)

Открой файл `src/app.js`. Чтобы пользователи могли оставаться в системе после входа, мы подключаем **сессии**:

```javascript
const session = require('express-session');

app.use(session({
    secret: 'dev-secret-change-in-production', // Секретный ключ (пароль для самих браслетов)
    resave: false,
    saveUninitialized: false, // Не даем браслеты тем, кто еще не вошел
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // Браслет действует 24 часа
}));
```

Когда человек заходит на сайт, сервер отправляет ему маленькую печеньку (cookie) с ID сессии. Браузер сам будет прикладывать её к каждому следующему запросу.

---

## Шаг 2: Подключаем охранника Passport.js (app.js)

Теперь нужно включить Passport и сказать ему работать вместе с нашими сессиями:

```javascript
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); // Подключаем к сессиям
```

---

## Шаг 3: Как проверять логин и пароль? (LocalStrategy)

В том же `app.js` мы объясняем Passport, откуда брать данные для входа. Мы говорим ему: "Ищи логин в поле `email`, а пароль в поле `password`".

```javascript
const LocalStrategy = require('passport-local');
const userService = require('./services/user.service');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    userService.verifyUser // Это функция, которая реально проверит пароль
));
```

Заглянем в `src/services/user.service.js`, чтобы увидеть функцию `verifyUser`:

```javascript
exports.verifyUser = async (email, password, done) => {
    // 1. Ищем человека по email
    const user = await exports.findUser({ email });
    if (!user) return done(null, false, { message: 'Пользователь не найден' });

    // 2. Сравниваем введенный пароль с зашифрованным паролем из БД
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (isValidPassword) {
        return done(null, user); // Успех! Пускаем.
    } else {
        return done(null, false, { message: 'Неверный пароль' }); // Отказ.
    }
};
```
Функция `done` — это способ сказать Passport.js результат проверки. `done(null, user)` означает "ошибок нет, вот пользователь".

---

## Шаг 4: Сохранение пользователя (Сериализация)

Когда пользователь вошел, нужно сохранить данные о нем в сессию (в тот самый браслет). Чтобы не хранить лишнего, мы сохраняем только его `email`.

```javascript
// Сохраняем email в сессию при входе
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// Достаем пользователя из базы по email при каждом новом запросе
passport.deserializeUser(async (email, done) => {
    const user = await userService.findUser({ email });
    done(null, user);
});
```
*   `serializeUser` срабатывает один раз — при успешном входе (login).
*   `deserializeUser` срабатывает при **каждом** следующем открытии любой страницы сайта, пока сессия жива. Он кладет данные пользователя в `req.user`.

---

## Шаг 5: Регистрация (auth.controller.js)

Теперь посмотрим на файл `src/controllers/auth.controller.js`. Как регистрировать пользователей?
Главное правило: **шифруем пароль перед сохранением**.

```javascript
const bcrypt = require('bcryptjs');

exports.registration = async (req, res) => {
    const { name, email, password } = req.body;

    // Превращаем "12345" в абракадабру вроде "$2a$10$vI8aWBnD..."
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        name,
        email,
        password: hashedPassword, // Сохраняем только хеш!
        role: 'клиент'
    };

    await userService.insertUser(newUser);

    // Автоматически логиним пользователя после регистрации
    req.login(newUser, (err) => {
        res.json({ message: 'Регистрация успешна!' });
    });
};
```

---

## Шаг 6: Вход и Выход (Login / Logout)

В том же контроллере есть функция входа `login`:

```javascript
exports.login = (req, res, next) => {
    // Запускаем аутентификацию Passport
    passport.authenticate('local', (err, user, info) => {
        if (!user) {
            return res.status(401).json({ message: 'Неверный логин или пароль' });
        }

        // Авторизуем пользователя и создаем сессию
        req.login(user, (err) => {
            res.json({ message: 'Вход выполнен!' });
        });
    })(req, res, next);
};
```

А чтобы выйти из аккаунта (Logout), нужно просто попросить Passport удалить сессию:

```javascript
exports.logout = (req, res) => {
    req.logout((err) => {
        res.json({ message: 'Вы успешно вышли из системы' });
    });
};
```

---

## Итог 🎉
Теперь ты знаешь, как работает аутентификация:
1. Пользователь вводит данные.
2. `bcrypt` шифрует и проверяет переданный пароль.
3. `Passport.js` (с LocalStrategy) дает добро на вход.
4. `express-session` выдает cookie браузеру.
5. При следующем клике на сайте Passport находит cookie, узнает пользователя и помещает его в `req.user`.

Можешь запускать проект с помощью `npm run dev` и пробовать регистрироваться и входить!
