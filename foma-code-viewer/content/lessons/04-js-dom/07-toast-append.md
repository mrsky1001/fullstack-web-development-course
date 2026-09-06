---
title: "Показываем тост на экране"
highlight: js
---

# Показываем тост на экране

Мы создали тост (`toast`), задали ему классы и наполнили текстом. Но он, как и контейнер ранее, пока висит в оперативной памяти компьютера. На экране его нет!

Чтобы он появился, мы должны взять его и поместить внутрь нашего контейнера.

Мы уже знаем, как это делать: с помощью метода `appendChild` ("добавить ребенка"). Мы скажем нашему контейнеру: "Возьми этот тост и сделай его своим дочерним элементом".

## 🛠 Задание

Сразу после `toast.textContent = message;` напишите всего одну строчку, которая добавит тост в контейнер.

```js:start
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;
}
```

```js:solution
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;

  container.appendChild(toast);
}
```
