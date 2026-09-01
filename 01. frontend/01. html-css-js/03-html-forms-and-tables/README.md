# Урок 03: Формы и таблицы HTML

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Создавать **HTML-формы** с различными типами полей
- Использовать **валидацию** форм на стороне клиента
- Понимать **атрибуты** элементов форм
- Создавать **таблицы** с правильной семантикой
- Объединять ячейки таблиц (**colspan, rowspan**)
- Делать формы и таблицы **доступными**

---

## 📚 Формы (Forms)

### Базовая структура формы

```html
<form action="/submit" method="POST">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name">
    
    <button type="submit">Отправить</button>
</form>
```

### Атрибуты формы

| Атрибут | Описание | Пример |
|---------|----------|--------|
| `action` | URL для отправки данных | `/api/submit` |
| `method` | HTTP-метод | `GET`, `POST` |
| `enctype` | Кодировка данных | `multipart/form-data` |
| `autocomplete` | Автозаполнение | `on`, `off` |
| `novalidate` | Отключить валидацию | (булевый) |

### Типы input

```html
<!-- Текстовые поля -->
<input type="text" placeholder="Обычный текст">
<input type="email" placeholder="email@example.com">
<input type="password" placeholder="Пароль">
<input type="tel" placeholder="+7 (999) 123-45-67">
<input type="url" placeholder="https://example.com">
<input type="search" placeholder="Поиск...">

<!-- Числовые поля -->
<input type="number" min="0" max="100" step="5">
<input type="range" min="0" max="100" value="50">

<!-- Дата и время -->
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">

<!-- Выбор -->
<input type="checkbox" id="agree">
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">

<!-- Файлы и цвета -->
<input type="file" accept="image/*">
<input type="color" value="#ff0000">

<!-- Скрытое поле -->
<input type="hidden" name="csrf_token" value="abc123">

<!-- Кнопки -->
<input type="submit" value="Отправить">
<input type="reset" value="Сбросить">
<input type="button" value="Кнопка">
```

### Атрибуты input

| Атрибут | Описание | Пример |
|---------|----------|--------|
| `required` | Обязательное поле | `<input required>` |
| `disabled` | Отключено | `<input disabled>` |
| `readonly` | Только чтение | `<input readonly>` |
| `placeholder` | Подсказка | `placeholder="Введите..."` |
| `value` | Значение по умолчанию | `value="Иван"` |
| `minlength` | Мин. длина | `minlength="3"` |
| `maxlength` | Макс. длина | `maxlength="50"` |
| `pattern` | Регулярное выражение | `pattern="[A-Za-z]+"` |
| `min/max` | Для чисел/дат | `min="0" max="100"` |
| `step` | Шаг | `step="0.5"` |
| `autofocus` | Фокус при загрузке | `<input autofocus>` |

### Label — Подпись поля

```html
<!-- Способ 1: for + id (рекомендуется) -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Способ 2: Вложенный input -->
<label>
    Email:
    <input type="email" name="email">
</label>
```

### Textarea — Многострочный текст

```html
<label for="message">Сообщение:</label>
<textarea 
    id="message" 
    name="message" 
    rows="5" 
    cols="40"
    placeholder="Введите ваше сообщение..."
></textarea>
```

### Select — Выпадающий список

```html
<label for="country">Страна:</label>
<select id="country" name="country">
    <option value="">Выберите страну</option>
    <option value="ru">Россия</option>
    <option value="kz">Казахстан</option>
    <option value="by">Беларусь</option>
</select>

<!-- С группами -->
<select id="car" name="car">
    <optgroup label="Немецкие">
        <option value="bmw">BMW</option>
        <option value="audi">Audi</option>
    </optgroup>
    <optgroup label="Японские">
        <option value="toyota">Toyota</option>
        <option value="honda">Honda</option>
    </optgroup>
</select>

<!-- Множественный выбор -->
<select id="skills" name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="react">React</option>
</select>
```

### Datalist — Список подсказок

```html
<label for="browser">Браузер:</label>
<input list="browsers" id="browser" name="browser">

<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>
```

### Fieldset и Legend — Группировка

```html
<fieldset>
    <legend>Персональные данные</legend>
    
    <label for="fname">Имя:</label>
    <input type="text" id="fname" name="fname">
    
    <label for="lname">Фамилия:</label>
    <input type="text" id="lname" name="lname">
</fieldset>
```

---

## 📊 Таблицы (Tables)

### Базовая структура

```html
<table>
    <thead>
        <tr>
            <th>Заголовок 1</th>
            <th>Заголовок 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Данные 1</td>
            <td>Данные 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Итого</td>
            <td>100</td>
        </tr>
    </tfoot>
</table>
```

### Элементы таблицы

| Тег | Описание |
|-----|----------|
| `<table>` | Контейнер таблицы |
| `<thead>` | Шапка таблицы |
| `<tbody>` | Тело таблицы |
| `<tfoot>` | Подвал таблицы |
| `<tr>` | Строка (table row) |
| `<th>` | Ячейка заголовка (table header) |
| `<td>` | Ячейка данных (table data) |
| `<caption>` | Заголовок таблицы |
| `<colgroup>` | Группа столбцов |
| `<col>` | Столбец (для стилизации) |

### Объединение ячеек

```html
<table>
    <tr>
        <!-- colspan — объединение по горизонтали -->
        <th colspan="2">Имя и Фамилия</th>
        <th>Возраст</th>
    </tr>
    <tr>
        <td>Иван</td>
        <td>Иванов</td>
        <!-- rowspan — объединение по вертикали -->
        <td rowspan="2">25</td>
    </tr>
    <tr>
        <td>Мария</td>
        <td>Иванова</td>
    </tr>
</table>
```

### Доступность таблиц

```html
<table>
    <!-- Описание таблицы -->
    <caption>Список сотрудников отдела продаж</caption>
    
    <thead>
        <tr>
            <!-- scope указывает область заголовка -->
            <th scope="col">Имя</th>
            <th scope="col">Должность</th>
            <th scope="col">Зарплата</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <!-- headers связывает ячейку с заголовком -->
            <th scope="row">Иван</th>
            <td>Менеджер</td>
            <td>50 000 ₽</td>
        </tr>
    </tbody>
</table>
```

---

## ✅ Валидация форм

### Встроенная валидация

```html
<form>
    <!-- Обязательное поле -->
    <input type="text" required>
    
    <!-- Проверка email -->
    <input type="email">
    
    <!-- Паттерн (RegExp) -->
    <input type="text" pattern="[A-Za-z]{3,}">
    
    <!-- Ограничения -->
    <input type="number" min="18" max="100">
    <input type="text" minlength="2" maxlength="50">
</form>
```

### CSS-псевдоклассы валидации

```css
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}

input:required {
    border-left: 3px solid orange;
}
```

---

## 📁 Структура урока

```
03-html-forms-and-tables/
│
├── README.md                  # Этот файл
├── examples/
│   ├── 01-basic-form/         # Простая форма
│   ├── 02-input-types/        # Типы input
│   ├── 03-validation/         # Валидация
│   ├── 04-basic-table/        # Простая таблица
│   └── 05-complex-table/      # Сложная таблица
├── practice/
│   ├── 01-registration-form/  # Форма регистрации
│   └── 02-price-table/        # Таблица цен
└── assets/
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Form** | Контейнер для сбора данных от пользователя |
| **Input** | Поле ввода данных |
| **Label** | Подпись к полю ввода |
| **Validation** | Проверка корректности данных |
| **Table** | Структура для табличных данных |
| **Row** | Строка таблицы |
| **Cell** | Ячейка таблицы |

---

## ✅ Чек-лист

- [ ] Могу создать форму с различными типами полей
- [ ] Знаю основные атрибуты input
- [ ] Понимаю связь label и input
- [ ] Умею создавать select и textarea
- [ ] Могу использовать встроенную валидацию
- [ ] Умею создавать таблицы с thead, tbody, tfoot
- [ ] Знаю, как объединять ячейки (colspan, rowspan)

---

## 🚀 Что дальше?

Следующий модуль — **Основы CSS**:

**[04-css-fundamentals](../04-css-fundamentals/)** — Селекторы, цвета, шрифты