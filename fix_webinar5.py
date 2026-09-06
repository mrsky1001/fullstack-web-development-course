with open('build_webinar5_full.py', encoding='utf-8') as f:
    text = f.read()

# 1. Update CODE_TEXT definition
text = text.replace('CODE_TEXT = RGBColor(0xAB, 0xB2, 0xBF)', 'CODE_TEXT = RGBColor(0xD4, 0xD4, 0xD8)')

# 2. Update pill badge calculation
old_pill = """    pill_w = Pt(140)
    pill_h = Pt(22.6)
    pill_left = Pt(700) - pill_w
    pill_top = Pt(20.4)"""

new_pill = """    pill_w = Pt(max(140, len(category_text) * 7.8 + 24))
    pill_h = Pt(22.6)
    pill_left = Pt(700) - pill_w
    pill_top = Pt(20.4)"""

if old_pill in text:
    text = text.replace(old_pill, new_pill, 1)

# 3. Replace TEXT_PRIMARY inside slides_data with CODE_TEXT
start_marker = 'slides_data = ['
end_marker = 'print(f"Total content slides to generate:'
if start_marker in text and end_marker in text:
    p1, rest = text.split(start_marker, 1)
    p2, p3 = rest.split(end_marker, 1)
    p2_fixed = p2.replace('TEXT_PRIMARY', 'CODE_TEXT')
    text = p1 + start_marker + p2_fixed + end_marker + p3

# 4. Update result image path
text = text.replace('webinar5_result_exact.png', 'webinar5_catalog_exact.png')

# 5. Update Slide 1 title
text = text.replace('"РАБОТА С ДАННЫМИ: КАТАЛОГ И СТРАНИЦА КОМНАТЫ"', '"РАБОТА С ДИНАМИЧЕСКИМИ ДАННЫМИ"')

# 6. Update Slide 2 plan
old_plan = """plan_titles = {
    "TextBox 12": "1. Теоретический блок",
    "TextBox 15": "2. База данных проекта",
    "TextBox 18": "3. Динамический каталог",
    "TextBox 21": "4. Маршрутизация с параметрами",
    "TextBox 24": "5. Результат и итоги",
}
plan_subtitles = {
    "TextBox 13": "Массивы объектов в JS, модель данных и метод map()",
    "TextBox 16": "Создание data.js: структура сущности и характеристики комнат",
    "TextBox 19": "Рендеринг карточек через шаблонные строки и innerHTML",
    "TextBox 22": "Чтение URLSearchParams и поиск комнаты через find()",
    "TextBox 25": "Сборка страницы деталей, разбор ошибок и чек-лист",
}"""

new_plan = """plan_titles = {
    "TextBox 12": "1. Структуры данных",
    "TextBox 15": "2. Генерация контента",
    "TextBox 18": "3. Подготовка mock-данных",
    "TextBox 21": "4. Практика: Отрисовка каталога",
    "TextBox 24": "5. Результат и итоги",
}
plan_subtitles = {
    "TextBox 13": "Объекты и массивы в JavaScript: моделирование сущностей",
    "TextBox 16": "Циклы, условия и метод map() для создания интерфейса",
    "TextBox 19": "Создание файла js/data.js с массивом офисных комнат",
    "TextBox 22": "Автоматическая отрисовка каталога на основе массива объектов",
    "TextBox 25": "Функциональная страница каталога, разбор ошибок и чек-лист",
}"""

if old_plan in text:
    text = text.replace(old_plan, new_plan, 1)

# 7. Update Slide 24 Result text
old_res = 'r_res.text = "Результат: Динамический каталог офисов и детальная страница комнаты по ID"'
new_res = 'r_res.text = "Результат: Функциональная страница каталога с динамическим рендерингом"'
text = text.replace(old_res, new_res)

with open('build_webinar5_full.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated build_webinar5_full.py successfully!')
