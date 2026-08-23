// СмартОфис — Mock-данные офисных комнат
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло'],
    image: '../img/room-1.svg',
    isPopular: true
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт'],
    image: '../img/room-2.svg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    equipment: ['Личный стол', 'Wi-Fi', 'Кофе-поинт'],
    image: '../img/room-3.svg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска'],
    image: '../img/room-4.svg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    equipment: ['Лаунж-зона', 'Кофемашина', 'Панорамный вид'],
    image: '../img/room-5.svg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    equipment: ['Студийный свет', 'Цветной принтер', 'Маркерная стена'],
    image: '../img/room-6.svg',
    isPopular: false
  }
];

const MOCK_BOOKINGS = [
  {
    id: '74829',
    roomTitle: 'Мини-офис Focus',
    date: '2026-09-01',
    hours: 3,
    totalPrice: 1350
  },
  {
    id: '74830',
    roomTitle: 'Конференц-зал Alpha',
    date: '2026-09-03',
    hours: 2,
    totalPrice: 2400
  }
];
