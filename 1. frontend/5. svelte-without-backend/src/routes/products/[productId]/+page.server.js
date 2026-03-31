import {error} from '@sveltejs/kit'
import productsData from '$lib/test-products.json'

// Ищем объект товара по его идентификатору из мок-данных
function loadProduct(productId) {
    return productsData.find((product) => product.id === productId)
}

// Svelte load-функция получает id из параметров и возвращает продукт
export const load = async ({params}) => {
    if (params.productId) {
        const product = loadProduct(params.productId)

        if (product) {
            return {
                product
            }
        }
    }

    error(404, 'Not found')
}