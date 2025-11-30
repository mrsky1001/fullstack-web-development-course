let orderCount = 0

// Добавление товара в заказ
function addToOrder() {
    orderCount ++

    const orderCounterEl = document.getElementById("order-count")

    orderCounterEl.textContent = orderCount
}

//  ---- Slider

const reviewSlider = document.querySelector('.review-slider');
const reviewSlides = document.querySelectorAll('.review-card');

const prevReviewButton = document.querySelector('.review-arrow.left');
const nextReviewButton = document.querySelector('.review-arrow.right');

const reviewDotsContainer = document.querySelector('.review-dots');

let currentReviewIndex = 0;


prevReviewButton.addEventListener("click", ()=>{
    currentReviewIndex--;

    if (currentReviewIndex < 0){
        currentReviewIndex = reviewSlides.length - 1;
    }

    updateReviewSlider();
})

nextReviewButton.addEventListener("click", ()=>{
    currentReviewIndex++;

    if (currentReviewIndex >= reviewSlides.length){
        currentReviewIndex = 0;
    }

    updateReviewSlider();
})


// Обновление позиции слайдера отзывов
function updateReviewSlider() {
    const firstSlideEl = reviewSlides[0]
    const slideWidth = firstSlideEl.offsetWidth + 20;
    reviewSlider.style.transform = `translateX(-${currentReviewIndex * slideWidth}px)`;
}
//--------
const product1 = {
    name:"metabo 2000",
    price: 3000,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum nisi numquam perspiciatis quibusdam! Delectus deserunt modi ratione. Architecto dicta ea libero, sequi similique ut vitae. Ab minus necessitatibus recusandae reiciendis."
}

const product2 = {
    name:"metabo 3000",
    price: 6000,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum nisi numquam perspiciatis quibusdam! Delectus deserunt modi ratione. Architecto dicta ea libero, sequi similique ut vitae. Ab minus necessitatibus recusandae reiciendis."
}

const products = [product1, product2,
    {
        name:"makita 6000",
        price: 500,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum nisi numquam perspiciatis quibusdam! Delectus deserunt modi ratione. Architecto dicta ea libero, sequi similique ut vitae. Ab minus necessitatibus recusandae reiciendis."
    },
    {
        name:"metabo 3500",
        price: 6700,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum nisi numquam perspiciatis quibusdam! Delectus deserunt modi ratione. Architecto dicta ea libero, sequi similique ut vitae. Ab minus necessitatibus recusandae reiciendis."
    }
]

const productGridDiv = document.querySelector('.product-grid');
const templateCard = document.querySelector('#card-template');

function renderCards (arrCards) {
    productGridDiv.innerHTML = '';

    arrCards.forEach((product) => {
        const newCard = templateCard.content.cloneNode(true)
        const cardTitle = newCard.getElementById("card-title")
        const cardDescription = newCard.getElementById("card-description")
        const cardPrice = newCard.getElementById("card-price")
        // const cardImg = newCard.getElementById("card-img")

        cardTitle.textContent = product.name
        cardDescription.textContent = product.description
        cardPrice.textContent = product.price

        productGridDiv.appendChild(newCard)
    })
}

function filterProducts() {
    const nameFilter = document.getElementById('name-filter').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;


    let filteredProducts = []

    products.forEach((product)=>{
        // Проверка соответствия всем критериям фильтрации
        const matchesName = product.name.includes(nameFilter);// true or false
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice; // true or false

        if (matchesName && matchesPrice){
            filteredProducts.push(product)
        }
    })

    renderCards(filteredProducts)
}


renderCards(products)

















