# Практическое задание: Галерея изображений

## 🎯 Цель

Создать интерактивную галерею с использованием DOM и событий.

---

## 📋 Задание

### Функционал:

1. **Сетка миниатюр** (thumbnails)
2. **Большое изображение** — по клику на миниатюру
3. **Модальное окно** с увеличенным фото
4. **Закрытие** по клику на фон или кнопку
5. **Навигация** — стрелки влево/вправо
6. **Клавиатура** — Escape для закрытия, стрелки для навигации

---

## ✅ Критерии

- [ ] Клик по миниатюре открывает модальное окно
- [ ] Отображается увеличенное изображение
- [ ] Закрытие по клику на overlay
- [ ] Навигация между фото
- [ ] Поддержка клавиатуры (бонус)

---

## 💡 Подсказка

```javascript
const images = [
    { src: 'img1.jpg', alt: 'Описание 1' },
    { src: 'img2.jpg', alt: 'Описание 2' },
    // ...
];

let currentIndex = 0;

function openModal(index) {
    currentIndex = index;
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImage();
}

// Клавиатура
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});
```
