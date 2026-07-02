# Руководство по настройке среды разработки

> 🌐 [English version](./Development%20Environment%20Setup%20Guide.md) | 📚 [Руководство Git & GitHub](./GIT-GITHUB-MANUAL.md)

Это руководство поможет вам настроить среду разработки для курса полного стека веб-разработки.

## 📋 Содержание

1. [Настройка редактора кода](#1-настройка-редактора-кода)
2. [Node.js и npm](#2-nodejs-и-npm)
3. [База данных MySQL](#3-база-данных-mysql)
4. [Система контроля версий Git](#4-система-контроля-версий-git)
5. [Браузер и DevTools](#5-браузер-и-devtools)
6. [Дополнительные инструменты](#6-дополнительные-инструменты)

> 💡 **Совет:** Подробное руководство по Git см. в [Руководство Git & GitHub](./GIT-GITHUB-MANUAL.md)

---

## 1. Настройка редактора кода

### Visual Studio Code (Рекомендуется)

**Скачивание и установка:**
- Перейдите на [code.visualstudio.com](https://code.visualstudio.com/)
- Скачайте версию для вашей операционной системы
- Запустите установщик

**Рекомендуемые расширения:**

Установите эти расширения для улучшения опыта разработки:

```
1. Live Server - Запуск локального сервера разработки
2. Prettier - Форматирование кода
3. ESLint - Линтер JavaScript
4. Auto Rename Tag - Автоматическое переименование парных HTML-тегов
5. Path Intellisense - Автодополнение имён файлов
6. GitLens - Расширенная интеграция с Git
7. MySQL - Управление базами данных
8. Thunder Client - Тестирование API (альтернатива Postman)
```

**Как установить расширения:**
1. Откройте VS Code
2. Нажмите на иконку расширений (Ctrl+Shift+X)
3. Найдите нужное расширение по названию
4. Нажмите "Установить"

**Рекомендуемые настройки:**

Создайте или отредактируйте `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "afterDelay",
  "liveServer.settings.donotShowInfoMsg": true
}
```

---

## 2. Node.js и npm

### Установка

**Windows:**
1. Перейдите на [nodejs.org](https://nodejs.org/)
2. Скачайте LTS (Long Term Support) версию
3. Запустите установщик с настройками по умолчанию
4. Проверьте установку:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
```bash
# С использованием Homebrew
brew install node

# Проверка
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# С использованием репозитория NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка
node --version
npm --version
```

### Настройка npm

**Установка настроек по умолчанию:**
```bash
npm config set init-author-name "Ваше Имя"
npm config set init-license "MIT"
```

**Глобальные пакеты для установки:**
```bash
npm install -g nodemon    # Автоматический перезапуск Node.js приложений
npm install -g npm-check  # Проверка устаревших пакетов
```

---

## 3. База данных MySQL

### Установка

**Windows:**
1. Перейдите на [dev.mysql.com/downloads/installer](https://dev.mysql.com/downloads/installer/)
2. Скачайте MySQL Installer
3. Выберите тип установки "Developer Default"
4. Установите пароль root (запомните его!)
5. Завершите установку

**macOS:**
```bash
# С использованием Homebrew
brew install mysql

# Запуск службы MySQL
brew services start mysql

# Безопасная настройка
mysql_secure_installation
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server

# Запуск службы MySQL
sudo systemctl start mysql

# Безопасная настройка
sudo mysql_secure_installation
```

### MySQL Workbench

**Установка MySQL Workbench:**
- Скачайте с [dev.mysql.com/downloads/workbench](https://dev.mysql.com/downloads/workbench/)
- Установите с настройками по умолчанию

**Создание подключения:**
1. Откройте MySQL Workbench
2. Нажмите "+" для добавления нового подключения
3. Имя подключения: "Локальная разработка"
4. Хост: `127.0.0.1`
5. Порт: `3306`
6. Имя пользователя: `root`
7. Проверьте подключение

### Проверка установки MySQL

```bash
# Подключение к MySQL
mysql -u root -p

# В оболочке MySQL
SHOW DATABASES;
SELECT VERSION();
EXIT;
```

---

## 4. Система контроля версий Git

### Установка

**Windows:**
1. Перейдите на [git-scm.com](https://git-scm.com/)
2. Скачайте Git для Windows
3. Запустите установщик (используйте настройки по умолчанию)

**macOS:**
```bash
# С использованием Homebrew
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

### Настройка

**Установите свою идентичность:**
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"
```

**Установите имя ветки по умолчанию:**
```bash
git config --global init.defaultBranch main
```

**Установите редактор по умолчанию:**
```bash
git config --global core.editor "code --wait"
```

**Проверка конфигурации:**
```bash
git config --list
```

### Аккаунт GitHub (Опционально)

1. Создайте аккаунт на [github.com](https://github.com/)
2. Настройте SSH-ключ (опционально, но рекомендуется)

---

## 5. Браузер и DevTools

### Рекомендуемые браузеры

**Основные:**
- **Google Chrome** - [google.com/chrome](https://www.google.com/chrome/)
- **Mozilla Firefox** - [mozilla.org/firefox](https://www.mozilla.org/firefox/)

**Для тестирования:**
- Microsoft Edge (встроен в Windows)
- Safari (только macOS)

### Chrome DevTools

**Открытие DevTools:**
- Windows/Linux: `F12` или `Ctrl+Shift+I`
- macOS: `Cmd+Option+I`

**Основные панели:**
- **Elements** - Просмотр и изменение HTML/CSS
- **Console** - Отладка JavaScript
- **Network** - Мониторинг запросов
- **Application** - Хранилище, cookies, кэш
- **Sources** - Отладка JavaScript

**Полезные расширения:**
- React Developer Tools
- Vue.js devtools
- JSON Formatter

---

## 6. Дополнительные инструменты

### Postman (Тестирование API)
- Скачать: [postman.com](https://www.postman.com/)
- Альтернатива: Thunder Client (расширение VS Code)

### Улучшения терминала

**Windows:**
- Windows Terminal (из Microsoft Store)
- Git Bash (входит в состав Git)

**macOS/Linux:**
- iTerm2 (macOS)
- Oh My Zsh (улучшение оболочки)

### Инструменты дизайна

- **Figma** - UI/UX дизайн (веб-приложение)
- **Draw.io** - Диаграммы и блок-схемы

---

## ✅ Контрольный список проверки

После настройки проверьте, что всё работает:

```bash
# Проверка Node.js
node --version
# Ожидается: v18.x.x или выше

# Проверка npm
npm --version
# Ожидается: 9.x.x или выше

# Проверка Git
git --version
# Ожидается: 2.x.x или выше

# Проверка MySQL
mysql --version
# Ожидается: 8.x.x или выше
```

---

## 🆘 Устранение неполадок

### Node.js не найден
- Перезапустите терминал/компьютер после установки
- Проверьте переменную окружения PATH

### MySQL — отказ в подключении
- Убедитесь, что служба MySQL запущена
- Проверьте, что порт 3306 не заблокирован

### Команды Git не работают
- Перезапустите терминал после установки
- Проверьте, что Git добавлен в PATH

### Расширения VS Code не работают
- Перезагрузите окно VS Code
- Проверьте совместимость расширений

---

## 📚 Дополнительные ресурсы

- [Документация VS Code](https://code.visualstudio.com/docs)
- [Документация Node.js](https://nodejs.org/docs/)
- [Документация MySQL](https://dev.mysql.com/doc/)
- [Документация Git](https://git-scm.com/doc)

---

**Следующие шаги:**
После завершения настройки вы готовы начать курс! Начните с `frontend/01-course-introduction/`.
