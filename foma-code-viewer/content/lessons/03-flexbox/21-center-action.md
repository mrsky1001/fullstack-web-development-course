---
title: "Финальная кнопка"
highlight: html
---

# Финальная кнопка

Карточки стоят красивой сеткой! Но мы забыли одну маленькую деталь. 
Под всей сеткой карточек должна быть кнопка "Больше офисов". Мы сверстали для неё прозрачный класс с синей рамкой `.btn-outline`, но еще не использовали.

Чтобы кнопка стояла ровно по центру экрана под сеткой, мы обернем её в `<div class="center-action">` и зададим выравнивание текста по центру.

## 🛠 Задание

1. В `index.html` найдите закрывающий тег сетки `</div>` (он идет сразу после вашей третьей карточки, но перед закрывающим тегом `</section>`).
2. Между ними добавьте разметку из решения: `<div class="center-action"><a href="..." class="btn btn-outline">Больше офисов</a></div>`.
3. В `style.css` (в самом низу) добавьте класс `.center-action` со свойствами: `text-align: center;` и `margin-top: 20px;`.

Поздравляю! Мы полностью закончили третий вебинар. Вы научились работать с сетками, карточками и создавать переиспользуемые элементы дизайна (кнопки, заголовки).

```html:start
          <!-- Тут закрывается третья карточка -->
          </div>
        </div>

      </section>
```

```css:start
.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

```

```html:solution
          <!-- Тут закрывается третья карточка -->
          </div>
        </div>

        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>
```

```css:solution
.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center-action {
  text-align: center;
  margin-top: 20px;
}
```
