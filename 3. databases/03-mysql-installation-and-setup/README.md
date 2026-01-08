# Урок 03: Установка и настройка MySQL

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Установить **MySQL Server**
- Установить **MySQL Workbench**
- Подключиться к серверу
- Выполнить первые SQL-команды

---

## 📚 Установка MySQL

### Windows

#### Шаг 1: Скачать MySQL Installer

1. Перейдите на [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
2. Скачайте **MySQL Installer** (mysql-installer-community-8.x.x.msi)
3. Запустите установщик

#### Шаг 2: Выбор компонентов

В MySQL Installer выберите:
- ✅ **MySQL Server 8.x** — сам сервер БД
- ✅ **MySQL Workbench** — графический интерфейс
- ✅ **MySQL Shell** — командная строка (опционально)

#### Шаг 3: Конфигурация сервера

1. **Type and Networking**:
   - Development Computer (для разработки)
   - Port: `3306` (стандартный)
   
2. **Authentication Method**:
   - Use Strong Password Encryption (рекомендуется)

3. **Accounts and Roles**:
   - Задайте пароль для `root`
   - ⚠️ **Запомните этот пароль!**

4. **Windows Service**:
   - ✅ Configure MySQL Server as a Windows Service
   - ✅ Start the MySQL Server at System Startup

#### Шаг 4: Проверка установки

Откройте командную строку (CMD):

```bash
mysql --version
# mysql  Ver 8.0.xx for Win64 on x86_64
```

---

### macOS

#### Вариант 1: Homebrew (рекомендуется)

```bash
# Установка Homebrew (если нет)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Установка MySQL
brew install mysql

# Запуск сервера
brew services start mysql

# Настройка безопасности
mysql_secure_installation
```

#### Вариант 2: DMG-пакет

1. Скачайте с [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Установите .dmg пакет
3. Запустите MySQL из System Preferences → MySQL

#### Установка Workbench на macOS

```bash
brew install --cask mysqlworkbench
```

Или скачайте с [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)

---

### Linux (Ubuntu/Debian)

```bash
# Обновление пакетов
sudo apt update

# Установка MySQL Server
sudo apt install mysql-server

# Проверка статуса
sudo systemctl status mysql

# Настройка безопасности
sudo mysql_secure_installation
```

#### Начальная настройка

```bash
# Вход в MySQL от root
sudo mysql

# Создание пользователя (в MySQL консоли)
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'developer'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🖥️ MySQL Workbench

### Интерфейс

```
┌─────────────────────────────────────────────────────────────────┐
│  MySQL Workbench                                           [−][□][×]│
├─────────────────────────────────────────────────────────────────┤
│  File  Edit  View  Query  Database  Server  Tools  Help       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MySQL Connections                                              │
│  ┌─────────────────────────────────────────────┐               │
│  │  Local instance MySQL80                      │  ← Клик     │
│  │  127.0.0.1:3306                             │               │
│  └─────────────────────────────────────────────┘               │
│                                                                 │
│  [+] New Connection                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Создание подключения

1. Откройте MySQL Workbench
2. Нажмите **"+"** рядом с "MySQL Connections"
3. Заполните:
   - **Connection Name**: Local MySQL
   - **Hostname**: localhost (или 127.0.0.1)
   - **Port**: 3306
   - **Username**: root
4. Нажмите **Test Connection**
5. Введите пароль root
6. **OK** → **Save**

### Главное окно запросов

```
┌─────────────────────────────────────────────────────────────────┐
│  Query 1  [×]                                                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  -- Здесь пишем SQL-запросы                               │ │
│  │  SELECT * FROM users;                                     │ │
│  │                                                           │ │
│  │  ⚡ [Execute]  [Execute under cursor]                     │ │
│  └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  Result Grid                                                    │
│  ┌────────┬──────────┬─────────────────┐                       │
│  │ user_id│ user_name│ user_email      │                       │
│  ├────────┼──────────┼─────────────────┤                       │
│  │   1    │  Иван    │ ivan@mail.ru    │                       │
│  └────────┴──────────┴─────────────────┘                       │
│                                                                 │
│  Rows: 1  |  Time: 0.005 sec                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Горячие клавиши

| Действие | Windows / Linux | macOS |
|----------|-----------------|-------|
| Выполнить запрос | Ctrl + Enter | Cmd + Enter |
| Выполнить всё | Ctrl + Shift + Enter | Cmd + Shift + Enter |
| Новая вкладка | Ctrl + T | Cmd + T |
| Сохранить скрипт | Ctrl + S | Cmd + S |
| Комментарий | Ctrl + / | Cmd + / |
| Форматировать | Ctrl + B | Cmd + B |

---

## 🚀 Первые команды

### Подключение через командную строку

```bash
# Подключение к MySQL
mysql -u root -p
# Введите пароль

# Вы увидите:
# mysql>
```

### Базовые команды

```sql
-- Показать все базы данных
SHOW DATABASES;

-- Результат:
-- +--------------------+
-- | Database           |
-- +--------------------+
-- | information_schema |
-- | mysql              |
-- | performance_schema |
-- | sys                |
-- +--------------------+

-- Создать новую базу данных
CREATE DATABASE storedb;

-- Использовать базу данных
USE storedb;

-- Показать текущую БД
SELECT DATABASE();

-- Показать таблицы (пока пусто)
SHOW TABLES;

-- Выход
EXIT;
```

### Создание первой таблицы

```sql
-- Выбираем базу данных
USE storedb;

-- Создаём таблицу пользователей
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Проверяем структуру
DESCRIBE users;

-- Результат:
-- +------------+--------------+------+-----+-------------------+----------------+
-- | Field      | Type         | Null | Key | Default           | Extra          |
-- +------------+--------------+------+-----+-------------------+----------------+
-- | user_id    | int          | NO   | PRI | NULL              | auto_increment |
-- | user_name  | varchar(100) | NO   |     | NULL              |                |
-- | user_email | varchar(255) | NO   | UNI | NULL              |                |
-- | created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP |                |
-- +------------+--------------+------+-----+-------------------+----------------+
```

### Первые данные

```sql
-- Добавляем пользователей
INSERT INTO users (user_name, user_email) VALUES
    ('Иван Петров', 'ivan@example.com'),
    ('Мария Иванова', 'maria@example.com'),
    ('Пётр Сидоров', 'petr@example.com');

-- Проверяем
SELECT * FROM users;

-- Результат:
-- +---------+---------------+-------------------+---------------------+
-- | user_id | user_name     | user_email        | created_at          |
-- +---------+---------------+-------------------+---------------------+
-- |       1 | Иван Петров   | ivan@example.com  | 2024-01-15 10:30:00 |
-- |       2 | Мария Иванова | maria@example.com | 2024-01-15 10:30:00 |
-- |       3 | Пётр Сидоров  | petr@example.com  | 2024-01-15 10:30:00 |
-- +---------+---------------+-------------------+---------------------+
```

---

## 🔧 Настройка для разработки

### Переменные окружения (Windows)

Добавьте путь к MySQL в PATH:

1. Панель управления → Система → Дополнительные параметры
2. Переменные среды → Path → Изменить
3. Добавить: `C:\Program Files\MySQL\MySQL Server 8.0\bin`

### Конфигурация my.ini / my.cnf

Файл конфигурации MySQL:

**Windows:** `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
**Linux/macOS:** `/etc/mysql/my.cnf` или `/etc/my.cnf`

```ini
[mysqld]
# Кодировка по умолчанию
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci

# Максимальный размер пакета
max_allowed_packet=64M

# Логирование медленных запросов
slow_query_log=1
slow_query_log_file=/var/log/mysql/slow.log
long_query_time=2

[client]
default-character-set=utf8mb4
```

---

## 🔐 Безопасность

### Настройка пользователей

```sql
-- Создать пользователя для разработки
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'DevPass123!';

-- Дать права на конкретную БД
GRANT ALL PRIVILEGES ON storedb.* TO 'developer'@'localhost';

-- Применить изменения
FLUSH PRIVILEGES;

-- Проверить пользователей
SELECT user, host FROM mysql.user;
```

### Важные правила

1. ⚠️ **Никогда** не используйте root на production
2. ⚠️ **Никогда** не храните пароли в коде
3. ⚠️ Используйте **сложные пароли**
4. ⚠️ Давайте **минимально необходимые права**

---

## 🐛 Частые проблемы

### Ошибка: Access denied

```
ERROR 1045 (28000): Access denied for user 'root'@'localhost'
```

**Решение:**
```bash
# Остановить MySQL
sudo systemctl stop mysql

# Запустить без проверки прав
sudo mysqld_safe --skip-grant-tables &

# Подключиться
mysql -u root

# Сбросить пароль
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword123';
FLUSH PRIVILEGES;
EXIT;

# Перезапустить нормально
sudo systemctl restart mysql
```

### Ошибка: Can't connect to MySQL server

```
ERROR 2002 (HY000): Can't connect to local MySQL server
```

**Решение:**
```bash
# Проверить статус
sudo systemctl status mysql

# Запустить если не работает
sudo systemctl start mysql
```

### Ошибка: Unknown database

```
ERROR 1049 (42000): Unknown database 'mydb'
```

**Решение:**
```sql
-- Создать базу данных
CREATE DATABASE mydb;
```

---

## 📋 Проверка успешной установки

- [ ] MySQL Server установлен и запущен
- [ ] Подключение через `mysql -u root -p` работает
- [ ] MySQL Workbench установлен
- [ ] Подключение через Workbench работает
- [ ] Создана тестовая база данных
- [ ] Создана тестовая таблица
- [ ] Добавлены тестовые данные

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **MySQL Server** | Серверная часть СУБД |
| **MySQL Workbench** | GUI-клиент для MySQL |
| **root** | Суперпользователь MySQL |
| **localhost** | Локальный компьютер (127.0.0.1) |
| **Port 3306** | Стандартный порт MySQL |
| **my.cnf / my.ini** | Файл конфигурации |

---

## ➡️ Что дальше?

В следующем уроке мы изучим:
- Проектирование баз данных
- ER-диаграммы
- Связи между таблицами
- Нормализация

---

**Курс:** Databases | **Урок:** 03-mysql-installation-and-setup
