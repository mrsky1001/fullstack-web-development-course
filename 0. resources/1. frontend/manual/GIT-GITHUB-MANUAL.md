# 📚 Руководство по Git и GitHub

<div align="center">

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

**Полное руководство для начинающих**

*Как скачать курс и работать с системой контроля версий*

</div>

---

## 📋 Содержание

1. [Что такое Git и GitHub?](#-что-такое-git-и-github)
2. [Установка Git](#-установка-git)
3. [Как скачать этот курс](#-как-скачать-этот-курс)
4. [Основные команды Git](#-основные-команды-git)
5. [Работа с GitHub](#-работа-с-github)
6. [Типичные сценарии](#-типичные-сценарии)
7. [Шпаргалка](#-шпаргалка)

---

## 🤔 Что такое Git и GitHub?

### Git — Система контроля версий

**Git** — это программа, которая отслеживает изменения в файлах. Представьте, что вы можете:
- 💾 Сохранять "снимки" проекта в любой момент
- ⏪ Вернуться к любой предыдущей версии
- 🌿 Экспериментировать в отдельных ветках
- 👥 Работать над проектом командой

```
Без Git:                     С Git:
                             
project_v1/                  project/
project_v2/                    ├── .git/  ← История изменений
project_final/                 └── файлы
project_final_FINAL/           
project_REALLY_final/          git log → Все версии!
```

### GitHub — Хостинг для Git-репозиториев

**GitHub** — это веб-сервис для хранения Git-репозиториев в облаке:
- 🌐 Доступ к коду из любой точки мира
- 📦 Скачивание открытых проектов (как этот курс!)
- 👥 Совместная работа над проектами
- 📊 Просмотр истории изменений через браузер

---

## 💻 Установка Git

### Windows

**Способ 1: Официальный установщик**
1. Перейдите на [git-scm.com](https://git-scm.com/)
2. Нажмите "Download for Windows"
3. Запустите скачанный файл
4. В процессе установки оставьте все настройки по умолчанию
5. Нажимайте "Next" до завершения

**Способ 2: Через winget (Windows 10/11)**
```powershell
winget install Git.Git
```

### macOS

```bash
# Через Homebrew (рекомендуется)
brew install git

# Или установите Xcode Command Line Tools
xcode-select --install
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

### Проверка установки

Откройте терминал и выполните:

```bash
git --version
```

Ожидаемый результат:
```
git version 2.43.0
```

---

## 📥 Как скачать этот курс

### Способ 1: Через Git (рекомендуется)

Этот способ позволит вам легко получать обновления курса.

**Шаг 1: Откройте терминал**

| ОС | Как открыть |
|----|-------------|
| Windows | Нажмите `Win + R`, введите `cmd` или `powershell` |
| macOS | Откройте программу "Terminal" |
| Linux | Нажмите `Ctrl + Alt + T` |

**Шаг 2: Перейдите в нужную папку**

```bash
# Windows (PowerShell)
cd C:\Users\ВашеИмя\Documents

# macOS/Linux
cd ~/Documents
```

**Шаг 3: Склонируйте репозиторий**

```bash
git clone https://github.com/mrsky1001/fullstack-web-development-course.git
```

**Что происходит:**
```
📁 Documents/
   └── 📂 fullstack-web-development-course/  ← Курс скачан!
       ├── 📁 1. frontend/
       ├── 📁 2. databases/
       ├── 📁 3. backend/
       └── ...
```

**Шаг 4: Откройте в VS Code**

```bash
cd fullstack-web-development-course
code .
```

### Способ 2: Скачать ZIP-архив

Если не хотите устанавливать Git:

1. Откройте [github.com/mrsky1001/fullstack-web-development-course](https://github.com/mrsky1001/fullstack-web-development-course)
2. Нажмите зелёную кнопку **"Code"**
3. Выберите **"Download ZIP"**
4. Распакуйте архив в удобное место

> ⚠️ **Минус:** При обновлении курса придётся скачивать снова

---

## 🔄 Как получать обновления курса

Если вы скачали через `git clone`:

```bash
# Перейдите в папку курса
cd fullstack-web-development-course

# Получите последние изменения
git pull
```

**Что делает `git pull`:**
```
GitHub (облако)          Ваш компьютер
┌─────────────┐          ┌─────────────┐
│ Урок 10 ✨  │ ──────▶ │ Урок 10 ✨  │
│ Урок 9     │          │ Урок 9     │
│ Урок 8     │          │ Урок 8     │
└─────────────┘          └─────────────┘
    git pull скачивает новые уроки!
```

---

## 📝 Основные команды Git

### Первоначальная настройка

После установки Git настройте своё имя и email:

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"
```

### Базовые команды

| Команда | Описание | Пример |
|---------|----------|--------|
| `git clone <url>` | Скачать репозиторий | `git clone https://github.com/user/repo.git` |
| `git pull` | Получить обновления | `git pull` |
| `git status` | Статус файлов | `git status` |
| `git log` | История изменений | `git log --oneline` |

### Если вы хотите создать свой проект

```bash
# 1. Создайте папку проекта
mkdir my-project
cd my-project

# 2. Инициализируйте Git
git init

# 3. Создайте файлы
echo "# Мой проект" > Development Environment Setup Guide.md

# 4. Добавьте файлы в отслеживание
git add .

# 5. Сделайте первый коммит
git commit -m "Первый коммит"
```

### Цикл работы с Git

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   1. Измените файлы                                     │
│            ↓                                            │
│   2. git add .            (Добавить изменения)          │
│            ↓                                            │
│   3. git commit -m "..."  (Сохранить "снимок")          │
│            ↓                                            │
│   4. git push             (Отправить на GitHub)         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🌐 Работа с GitHub

### Создание аккаунта

1. Перейдите на [github.com](https://github.com/)
2. Нажмите "Sign up"
3. Введите email, пароль и username
4. Подтвердите email

### Создание нового репозитория

1. Нажмите "+" в правом верхнем углу → "New repository"
2. Введите имя репозитория
3. Выберите публичный или приватный
4. Нажмите "Create repository"

### Связывание локального проекта с GitHub

```bash
# После создания репозитория на GitHub:

# 1. Добавьте удалённый репозиторий
git remote add origin https://github.com/ваш-username/my-project.git

# 2. Отправьте код на GitHub
git push -u origin main
```

### Клонирование чужого репозитория

```bash
# Скопируйте URL с GitHub и используйте:
git clone https://github.com/username/repository-name.git
```

---

## 🎯 Типичные сценарии

### Сценарий 1: Скачать курс и учиться

```bash
# 1. Скачайте курс
git clone https://github.com/mrsky1001/fullstack-web-development-course.git

# 2. Откройте в VS Code
cd fullstack-web-development-course
code .

# 3. Периодически обновляйте
git pull
```

### Сценарий 2: Создать портфолио на GitHub

```bash
# 1. Создайте проект
mkdir my-portfolio
cd my-portfolio
git init

# 2. Создайте файлы
# ... создайте index.html, styles.css и т.д.

# 3. Добавьте все файлы
git add .

# 4. Сохраните
git commit -m "Создал портфолио"

# 5. Создайте репозиторий на GitHub, затем:
git remote add origin https://github.com/username/my-portfolio.git
git push -u origin main
```

### Сценарий 3: Внести изменения и сохранить

```bash
# 1. Посмотрите, что изменилось
git status

# 2. Посмотрите разницу
git diff

# 3. Добавьте изменения
git add .

# 4. Сохраните с описанием
git commit -m "Добавил страницу контактов"

# 5. Отправьте на GitHub
git push
```

### Сценарий 4: Отменить изменения

```bash
# Отменить изменения в файле (до add)
git checkout -- filename.txt

# Отменить add
git reset HEAD filename.txt

# Отменить последний коммит (сохранив файлы)
git reset --soft HEAD~1
```

---

## 🌿 Работа с ветками

Ветки позволяют работать над новыми функциями, не затрагивая основной код.

```
main:     A ─── B ─── C ─── D ─── E ─── F
                       \           /
feature:                X ─── Y ─┘
                        
Работаем в feature, потом сливаем в main
```

### Основные команды

```bash
# Создать новую ветку
git branch feature-login

# Переключиться на ветку
git checkout feature-login

# Или создать и переключиться одной командой
git checkout -b feature-login

# Посмотреть все ветки
git branch

# Вернуться в main
git checkout main

# Слить ветку в текущую
git merge feature-login

# Удалить ветку (после слияния)
git branch -d feature-login
```

---

## ❌ Типичные ошибки и их решение

### Ошибка: "git is not recognized"

**Причина:** Git не добавлен в PATH

**Решение (Windows):**
1. Перезапустите терминал
2. Или переустановите Git, выбрав опцию "Add to PATH"

### Ошибка: "fatal: not a git repository"

**Причина:** Вы не в Git-репозитории

**Решение:**
```bash
# Перейдите в папку с репозиторием
cd fullstack-web-development-course

# Или инициализируйте новый репозиторий
git init
```

### Ошибка: "Please tell me who you are"

**Причина:** Не настроено имя/email

**Решение:**
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "email@example.com"
```

### Ошибка при push: "rejected"

**Причина:** На GitHub есть изменения, которых нет у вас

**Решение:**
```bash
git pull
git push
```

### Конфликт слияния (merge conflict)

**Что делать:**
1. Откройте файл с конфликтом
2. Найдите метки `<<<<<<<`, `=======`, `>>>>>>>`
3. Выберите нужную версию кода
4. Удалите метки
5. Сохраните и закоммитьте:
   ```bash
   git add .
   git commit -m "Resolved merge conflict"
   ```

---

## 🗂️ Структура .gitignore

Файл `.gitignore` указывает, какие файлы Git должен игнорировать:

```gitignore
# Зависимости
node_modules/

# Переменные окружения (пароли!)
.env
.env.local

# Логи
*.log
logs/

# Системные файлы
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Сборка
dist/
build/
```

---

## 📋 Шпаргалка

### Работа с репозиторием

| Команда | Описание |
|---------|----------|
| `git clone <url>` | Скачать репозиторий |
| `git init` | Создать новый репозиторий |
| `git status` | Проверить статус |
| `git pull` | Получить обновления |
| `git push` | Отправить изменения |

### Работа с изменениями

| Команда | Описание |
|---------|----------|
| `git add .` | Добавить все файлы |
| `git add <file>` | Добавить конкретный файл |
| `git commit -m "сообщение"` | Сохранить изменения |
| `git diff` | Показать разницу |
| `git log --oneline` | История коммитов |

### Работа с ветками

| Команда | Описание |
|---------|----------|
| `git branch` | Список веток |
| `git branch <name>` | Создать ветку |
| `git checkout <name>` | Переключиться на ветку |
| `git checkout -b <name>` | Создать и переключиться |
| `git merge <name>` | Слить ветку |

### Отмена изменений

| Команда | Описание |
|---------|----------|
| `git checkout -- <file>` | Отменить изменения в файле |
| `git reset HEAD <file>` | Убрать из staging |
| `git reset --soft HEAD~1` | Отменить последний коммит |

---

## 🔗 Полезные ресурсы

### Официальная документация
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)

### Интерактивные курсы
- [Learn Git Branching](https://learngitbranching.js.org/) — Визуальный тренажёр
- [GitHub Skills](https://skills.github.com/) — Курсы от GitHub

### Шпаргалки
- [Git Cheat Sheet (PDF)](https://education.github.com/git-cheat-sheet-education.pdf)

---

## ⚡ Быстрый старт: Скачать курс за 2 минуты

```bash
# 1. Откройте терминал

# 2. Перейдите в папку Документы
cd ~/Documents        # macOS/Linux
cd C:\Users\ВашеИмя\Documents  # Windows

# 3. Скачайте курс
git clone https://github.com/mrsky1001/fullstack-web-development-course.git

# 4. Откройте в VS Code
cd fullstack-web-development-course
code .

# Готово! 🎉
```

---

<div align="center">

### 🎓 Удачи в изучении Git!

*Git — это must-have навык для любого разработчика*

**Совет:** Практикуйтесь каждый день, и через неделю Git станет вашим лучшим другом 💪

</div>
