/********************************************
 * Мини-проект 5: СИМУЛЯЦИЯ АВТОРИЗАЦИИ
 * Тема: условия, функции, возврат значений
 ********************************************/

/*
Принцип работы:
  — Есть список пользователей (login, password)
  — Функция проверяет, совпадают ли данные
  — Возвращает логический результат (true / false)
*/

const users = [
    { login: "admin", password: "1234" },
    { login: "student", password: "abcd" },
    { login: "guest", password: "1111" }
];

function authorize(login, password) {
    const user = users.find(u => u.login === login && u.password === password);
    return user ? "Авторизация успешна ✅" : "Ошибка: неверный логин или пароль ❌";
}

// Примеры использования:
console.log(authorize("admin", "1234"));
console.log(authorize("student", "wrong"));
