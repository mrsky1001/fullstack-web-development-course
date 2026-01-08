# Урок 07: CSS Grid

## 🎯 Цели урока

- Понимать концепцию **CSS Grid**
- Создавать **сетки** любой сложности
- Использовать **grid-template** свойства
- Размещать элементы с **grid-area**

---

## 📊 Основы Grid

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 3 равные колонки */
    grid-template-rows: 100px 200px;
    gap: 20px;
}
```

---

## 📐 Определение сетки

```css
.container {
    /* Колонки */
    grid-template-columns: 200px 1fr 2fr;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    
    /* Строки */
    grid-template-rows: 100px auto 100px;
    
    /* Промежутки */
    gap: 20px;
    column-gap: 20px;
    row-gap: 10px;
}
```

---

## 📍 Размещение элементов

```css
.item {
    grid-column: 1 / 3;     /* с 1 по 3 линию */
    grid-row: 1 / 2;
    
    /* Или span */
    grid-column: span 2;    /* занять 2 колонки */
}
```

---

## 🗺 Grid Areas

```css
.container {
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

---

## 📁 Структура урока

```
07-css-grid/
├── README.md
├── examples/
│   ├── 01-basic-grid/
│   ├── 02-template-areas/
│   └── 03-responsive-grid/
└── practice/
```
