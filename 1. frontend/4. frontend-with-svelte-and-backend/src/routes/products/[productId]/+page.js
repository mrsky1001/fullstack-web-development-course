import {error} from '@sveltejs/kit'

async function loadProduct(productId) {
    console.log('loadProduct')
    console.log(productId)

    const res = await fetch(`http://localhost:3000/product/${productId}`, {
        credentials: "include",
        method: 'GET',
    })

    return (await res.json()).data
}

export const load = async ({params}) => {
    console.log(params.productId)

    if (params.productId) {
        const product = await loadProduct(params.productId)

        return {
            product: product,
        }
    }

    error(404, 'Not found')
}