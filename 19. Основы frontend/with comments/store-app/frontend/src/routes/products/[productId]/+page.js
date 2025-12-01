// // Импорт функции error из SvelteKit для обработки ошибок
// import {error} from '@sveltejs/kit'
//
// // Асинхронная функция для загрузки данных о товаре по его ID
// async function loadProduct(productId) {
//     // Вывод в консоль для отладки
//     console.log('loadProduct')
//     console.log(productId)
//
//     // Выполнение GET-запроса к API для получения данных о товаре
//     const res = await fetch(`http://localhost:3000/product/${productId}`, {
//         credentials: "include", // Включение учетных данных (например, cookies)
//         method: 'GET',
//     })
//
//     // Возврат данных о товаре из ответа сервера
//     return (await res.json()).lib
// }
//
// // Экспорт функции load для обработки серверной загрузки данных (SvelteKit)
// export const load = async ({params}) => {
//     // Вывод ID товара из параметров URL для отладки
//     console.log(params.productId)
//
//     // Проверка наличия ID товара в параметрах
//     if (params.productId) {
//         // Загрузка данных о товаре
//         const product = await loadProduct(params.productId)
//
//         // Возврат объекта с данными товара
//         return {
//             product: product,
//         }
//     }
//
//     // Выброс ошибки 404, если ID товара не указан
//     error(404, 'Not found')
// }