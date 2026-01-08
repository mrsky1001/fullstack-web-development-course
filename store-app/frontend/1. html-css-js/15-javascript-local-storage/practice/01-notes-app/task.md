# Практическое задание: Заметки с сохранением

## 🎯 Цель

Создать приложение заметок с сохранением в localStorage.

---

## 📋 Задание

### Функционал:

1. **Создание заметки** — заголовок + текст
2. **Отображение списка** заметок
3. **Редактирование** заметки
4. **Удаление** заметки
5. **Сохранение** — все заметки сохраняются в localStorage
6. **Поиск** по заголовку/тексту (бонус)

### Структура данных:

```javascript
const notes = [
    {
        id: 1,
        title: 'Первая заметка',
        text: 'Текст заметки...',
        createdAt: '2024-01-15T10:30:00'
    }
];
```

---

## ✅ Критерии

- [ ] CRUD операции (создание, чтение, обновление, удаление)
- [ ] Сохранение в localStorage
- [ ] Загрузка при открытии страницы
- [ ] Отображение даты создания
- [ ] Поиск (бонус)

---

## 💡 Подсказка

```javascript
const STORAGE_KEY = 'notes';

function getNotes() {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function createNote(title, text) {
    const notes = getNotes();
    const newNote = {
        id: Date.now(),
        title,
        text,
        createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    saveNotes(notes);
    renderNotes();
}

function deleteNote(id) {
    const notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    renderNotes();
}
```
