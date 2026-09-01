# Урок 06: CSS Flexbox

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Понимать концепцию **flex-контейнера и flex-элементов**
- Управлять **направлением** и **выравниванием** элементов
- Использовать свойства **flex-grow, flex-shrink, flex-basis**
- Создавать **адаптивные макеты** с Flexbox
- Решать типичные задачи вёрстки

---

## 📚 Теоретическая часть

### Что такое Flexbox?

**Flexbox (Flexible Box Layout)** — это модуль CSS для создания гибких одномерных макетов. Он позволяет легко выравнивать и распределять элементы в контейнере.

> **Одномерность:** Flexbox работает либо в строку, либо в столбец. Для двумерных макетов используйте Grid.

### Основные понятия

```
┌─────────────────────────────────────────────────┐
│  FLEX-КОНТЕЙНЕР (display: flex)                 │
│                                                 │
│  ←──────── ГЛАВНАЯ ОСЬ (main axis) ──────────→  │
│                                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐            │
│  │  1  │  │  2  │  │  3  │  │  4  │  ↑         │
│  │     │  │     │  │     │  │     │  │         │
│  │FLEX │  │FLEX │  │FLEX │  │FLEX │  │ ПОПЕ-   │
│  │ITEM │  │ITEM │  │ITEM │  │ITEM │  │ РЕЧНАЯ  │
│  │     │  │     │  │     │  │     │  │ ОСЬ     │
│  └─────┘  └─────┘  └─────┘  └─────┘  ↓         │
│                                                 │
└─────────────────────────────────────────────────┘
```

| Понятие | Описание |
|---------|----------|
| **Flex-контейнер** | Родительский элемент с `display: flex` |
| **Flex-элементы** | Прямые потомки контейнера |
| **Главная ось** | Направление расположения элементов |
| **Поперечная ось** | Перпендикулярна главной |

---

## 🔧 Свойства контейнера

### display: flex

```css
.container {
    display: flex;       /* Блочный flex-контейнер */
    display: inline-flex; /* Строчный flex-контейнер */
}
```

### flex-direction — Направление

```css
.container {
    flex-direction: row;            /* → Слева направо (по умолчанию) */
    flex-direction: row-reverse;    /* ← Справа налево */
    flex-direction: column;         /* ↓ Сверху вниз */
    flex-direction: column-reverse; /* ↑ Снизу вверх */
}
```

### flex-wrap — Перенос строк

```css
.container {
    flex-wrap: nowrap;       /* Все в одну строку (по умолчанию) */
    flex-wrap: wrap;         /* Перенос на новую строку */
    flex-wrap: wrap-reverse; /* Перенос в обратном порядке */
}
```

### flex-flow — Сокращение

```css
.container {
    /* Объединяет flex-direction и flex-wrap */
    flex-flow: row wrap;
    flex-flow: column nowrap;
}
```

### justify-content — Выравнивание по главной оси

```css
.container {
    justify-content: flex-start;    /* В начало */
    justify-content: flex-end;      /* В конец */
    justify-content: center;        /* По центру */
    justify-content: space-between; /* Равные промежутки, края прижаты */
    justify-content: space-around;  /* Равные промежутки вокруг */
    justify-content: space-evenly;  /* Полностью равные промежутки */
}
```

```
flex-start:      [▮▮▮               ]
flex-end:        [               ▮▮▮]
center:          [       ▮▮▮        ]
space-between:   [▮       ▮       ▮ ]
space-around:    [  ▮    ▮    ▮    ]
space-evenly:    [   ▮   ▮   ▮   ]
```

### align-items — Выравнивание по поперечной оси

```css
.container {
    align-items: stretch;     /* Растянуть (по умолчанию) */
    align-items: flex-start;  /* В начало */
    align-items: flex-end;    /* В конец */
    align-items: center;      /* По центру */
    align-items: baseline;    /* По базовой линии текста */
}
```

### align-content — Выравнивание строк

```css
/* Работает только при flex-wrap: wrap и нескольких строках */
.container {
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
    align-content: stretch;
}
```

### gap — Промежутки

```css
.container {
    gap: 20px;              /* Одинаковые промежутки */
    gap: 20px 10px;         /* row-gap column-gap */
    row-gap: 20px;          /* Между строками */
    column-gap: 10px;       /* Между столбцами */
}
```

---

## 🔧 Свойства элементов

### flex-grow — Растяжение

```css
.item {
    flex-grow: 0; /* Не растягивается (по умолчанию) */
    flex-grow: 1; /* Занимает доступное пространство */
    flex-grow: 2; /* Занимает в 2 раза больше, чем flex-grow: 1 */
}
```

### flex-shrink — Сжатие

```css
.item {
    flex-shrink: 1; /* Сжимается при нехватке места (по умолчанию) */
    flex-shrink: 0; /* Не сжимается */
    flex-shrink: 2; /* Сжимается в 2 раза сильнее */
}
```

### flex-basis — Базовый размер

```css
.item {
    flex-basis: auto;   /* По содержимому (по умолчанию) */
    flex-basis: 200px;  /* Конкретный размер */
    flex-basis: 50%;    /* Процент от контейнера */
    flex-basis: 0;      /* Минимальный, для равного распределения */
}
```

### flex — Сокращение

```css
.item {
    /* flex: grow shrink basis */
    flex: 0 1 auto;    /* По умолчанию */
    flex: 1;           /* flex: 1 1 0 — равномерное распределение */
    flex: auto;        /* flex: 1 1 auto */
    flex: none;        /* flex: 0 0 auto — фиксированный размер */
    flex: 1 1 200px;   /* Базис 200px, может расти и сжиматься */
}
```

### align-self — Индивидуальное выравнивание

```css
.item {
    align-self: auto;       /* Наследует от align-items */
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: stretch;
}
```

### order — Порядок отображения

```css
.item {
    order: 0;   /* По умолчанию */
    order: -1;  /* Перед остальными */
    order: 1;   /* После элементов с order: 0 */
}
```

---

## 📋 Практические примеры

### Центрирование элемента

```css
/* Идеальное центрирование */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```

### Горизонтальное меню

```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 20px;
}
```

### Карточки в ряд

```css
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 300px; /* Мин. ширина 300px, растягивается */
    max-width: 400px;
}
```

### Прижать footer к низу

```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1; /* Занимает всё свободное место */
}
```

### Sidebar + Content

```css
.layout {
    display: flex;
}

.sidebar {
    flex: 0 0 250px; /* Фиксированная ширина */
}

.content {
    flex: 1; /* Занимает остальное */
}
```

---

## 📁 Структура урока

```
06-css-flexbox/
│
├── README.md                    # Этот файл
├── examples/
│   ├── 01-basic-flexbox/        # Основы
│   ├── 02-direction-wrap/       # Направление и перенос
│   ├── 03-alignment/            # Выравнивание
│   ├── 04-flex-items/           # Свойства элементов
│   └── 05-layouts/              # Практические макеты
├── practice/
│   ├── 01-navigation/           # Навигационное меню
│   ├── 02-card-layout/          # Сетка карточек
│   └── 03-holy-grail/           # Классический макет
└── assets/
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Flex Container** | Элемент с display: flex |
| **Flex Item** | Прямой потомок flex-контейнера |
| **Main Axis** | Главная ось (направление flex-direction) |
| **Cross Axis** | Поперечная ось (перпендикулярна главной) |
| **Flex Line** | Строка flex-элементов |

