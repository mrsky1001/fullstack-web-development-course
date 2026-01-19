/**
 * ФАЙЛ MOCK-ДАННЫХ (Заглушка для работы без бэкенда)
 * 
 * Содержит:
 * 1. Список товаров (products) - имитация данных из базы данных.
 * 2. Экспорт данных в глобальную область видимости.
 * 
 * Это позволяет frontend работать автономно без подключения к серверу.
 */

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'NVIDIA GeForce RTX 5090',
        category: 'Видеокарты',
        price: 289990,
        img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop',
        description: 'Флагманская видеокарта нового поколения с поддержкой DLSS 4 и трассировки лучей.'
    },
    {
        id: 2,
        name: 'NVIDIA GeForce RTX 5080',
        category: 'Видеокарты',
        price: 159990,
        img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop',
        description: 'Мощная видеокарта для требовательных игр и профессиональной работы.'
    },
    {
        id: 3,
        name: 'AMD Radeon RX 9070 XT',
        category: 'Видеокарты',
        price: 89990,
        img: 'https://images.unsplash.com/photo-1555618254-5e06258bcf79?w=400&h=300&fit=crop',
        description: 'Отличное соотношение цена/производительность для геймеров.'
    },
    {
        id: 4,
        name: 'Intel Core i9-15900K',
        category: 'Процессоры',
        price: 79990,
        img: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop',
        description: '24-ядерный флагманский процессор для максимальной производительности.'
    },
    {
        id: 5,
        name: 'AMD Ryzen 9 9950X',
        category: 'Процессоры',
        price: 74990,
        img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
        description: '16-ядерный процессор на архитектуре Zen 5 для геймеров и создателей контента.'
    },
    {
        id: 6,
        name: 'Intel Core i7-15700K',
        category: 'Процессоры',
        price: 49990,
        img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop',
        description: 'Высокопроизводительный процессор для игр и многозадачности.'
    },
    {
        id: 7,
        name: 'ASUS ROG Maximus Z890 Hero',
        category: 'Материнские платы',
        price: 64990,
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
        description: 'Премиальная материнская плата для платформы Intel с поддержкой DDR5.'
    },
    {
        id: 8,
        name: 'MSI MEG X870E ACE',
        category: 'Материнские платы',
        price: 59990,
        img: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&h=300&fit=crop',
        description: 'Материнская плата для AMD Ryzen с передовыми возможностями разгона.'
    },
    {
        id: 9,
        name: 'G.Skill Trident Z5 RGB DDR5 64GB',
        category: 'Оперативная память',
        price: 34990,
        img: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400&h=300&fit=crop',
        description: 'Высокоскоростная память DDR5-6400 с RGB подсветкой.'
    },
    {
        id: 10,
        name: 'Kingston Fury Beast DDR5 32GB',
        category: 'Оперативная память',
        price: 14990,
        img: 'https://images.unsplash.com/photo-1592664474505-51c549ad15c5?w=400&h=300&fit=crop',
        description: 'Надежная память DDR5-5600 для сборки игрового ПК.'
    },
    {
        id: 11,
        name: 'Samsung 990 PRO 2TB NVMe',
        category: 'Накопители',
        price: 24990,
        img: 'https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=400&h=300&fit=crop',
        description: 'Ультрабыстрый SSD со скоростью чтения до 7450 МБ/с.'
    },
    {
        id: 12,
        name: 'WD Black SN850X 1TB',
        category: 'Накопители',
        price: 12990,
        img: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=400&h=300&fit=crop',
        description: 'Игровой NVMe SSD с высокой скоростью загрузки игр.'
    },
    {
        id: 13,
        name: 'Corsair RM1000x 1000W',
        category: 'Блоки питания',
        price: 19990,
        img: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop',
        description: 'Модульный блок питания с сертификатом 80 PLUS Gold.'
    },
    {
        id: 14,
        name: 'Seasonic Prime TX-850',
        category: 'Блоки питания',
        price: 24990,
        img: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=400&h=300&fit=crop',
        description: 'Премиальный БП с сертификатом 80 PLUS Titanium и 12-летней гарантией.'
    },
    {
        id: 15,
        name: 'NZXT Kraken Z73',
        category: 'Охлаждение',
        price: 29990,
        img: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&h=300&fit=crop',
        description: 'Система жидкостного охлаждения 360мм с LCD дисплеем.'
    },
    {
        id: 16,
        name: 'Noctua NH-D15 chromax.black',
        category: 'Охлаждение',
        price: 12990,
        img: 'https://images.unsplash.com/photo-1555618255-72e7f4081b87?w=400&h=300&fit=crop',
        description: 'Топовый воздушный кулер в черном исполнении.'
    },
    {
        id: 17,
        name: 'Lian Li O11 Dynamic EVO',
        category: 'Корпуса',
        price: 17990,
        img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop',
        description: 'Культовый корпус с отличной вентиляцией и панорамным стеклом.'
    },
    {
        id: 18,
        name: 'Fractal Design Torrent',
        category: 'Корпуса',
        price: 22990,
        img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop',
        description: 'Корпус с отличным воздушным потоком для мощных систем.'
    }
];

// Экспортируем данные в глобальную область видимости
window.MOCK_PRODUCTS = MOCK_PRODUCTS;
