import {error} from '@sveltejs/kit'
import productsData from '$lib/test-products.json'

function loadProduct(productId) {
    return productsData.find((product) => product.id === productId)
}

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