---
title: "Панель поиска (HTML)"
highlight: html
---

# Создание панели инструментов

Мы находимся на странице каталога (`pages/catalog.html`). Сейчас там выводится просто список всех комнат. 
Давайте добавим удобную панель: поле для поиска комнаты по названию и две кнопки для сортировки (от дешевых к дорогим и наоборот).

## 🛠 Задание
Откройте вкладку `html` (считаем, что это наш файл `catalog.html`).
Между подзаголовком каталога и контейнером `rooms-grid` вставьте этот блок HTML разметки.

```html:start
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>

      
      
      <div class="rooms-grid" id="catalogContainer"></div>
```

```html:solution
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>

      <div class="catalog-toolbar">
        <input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию офиса...">
        <div class="sort-actions">
          <button id="sortAsc" class="btn btn-outline">Цена: по возрастанию ↑</button>
          <button id="sortDesc" class="btn btn-outline">Цена: по убыванию ↓</button>
        </div>
      </div>

      <div class="rooms-grid" id="catalogContainer"></div>
```
