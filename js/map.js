'use strict';
var PULL_OF_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var titlesCopy = PULL_OF_TITLES.slice();

var PULL_OF_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var PULL_OF_CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

var PULL_OF_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

var PULL_OF_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PULL_OF_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var NUMBER_OF_OBJECTS = 8;

var avatarCounterArray = createArrayOfNumbers(NUMBER_OF_OBJECTS);

document.querySelector('.map').classList.remove('map--faded');

// Создаю массив объектов
var createArray = function (num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    array.push(createObject(
        PULL_OF_TYPES,
        PULL_OF_CHECKINS,
        PULL_OF_CHECKOUTS,
        PULL_OF_FEATURES,
        PULL_OF_PHOTOS));
  }

  return array;
};

var createObject = function (types, checkins, checkouts, features, photos) {
  return {
    author: {
      avatar: createAvatar()
    },
    offer: {
      title: createTitle(),
      address: createAdress(1000, 1000),
      price: getRandomInteger(1000, 1000000),
      type: getRandomElementFromArray(types),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: getRandomElementFromArray(checkins),
      checkout: getRandomElementFromArray(checkouts),
      features: cutArray(features),
      description: '',
      photos: mixArrayElements(photos)
    },
    location: {
      x: getRandomInteger(0, getBlockWidth(document.querySelector('.map__pins'))),
      y: getRandomInteger(130, 630),
    }
  };
};

function createArrayOfNumbers(num) {
  var array = [];
  for (var i = 0; i <= num; i++) {
    array.push(i);
  }

  return array;
}

var createAvatar = function () {
  return 'img/avatars/user0' +
    avatarCounterArray.splice(getRandomInteger(1, avatarCounterArray.length - 1), 1) + // Удаляю рандомный элемент из массива чисел и возвращаю его
    '.png';
};

var createTitle = function () {
  return titlesCopy.splice(getRandomInteger(0, titlesCopy.length - 1), 1) + ''; // Удаляю рандомный элемент из массива заголовков и возврвщаю его в виде строки
};

var createAdress = function (maxX, maxY) {
  return getRandomInteger(0, maxX) + ', ' + getRandomInteger(0, maxY);
};

var getRandomElementFromArray = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

var cutArray = function (array) {
  var newArray = array.slice();
  newArray.sort(compareRandom);
  newArray.length = getRandomInteger(0, newArray.length);

  return newArray;
};

var mixArrayElements = function (array) {
  return array.sort(compareRandom);
};

function compareRandom() {
  return Math.random() - 0.5;
}

var getBlockWidth = function (block) {
  return +getComputedStyle(block).width.
  slice(0, getComputedStyle(block).width.length - 2); // возвращаю ширину блока в виде числа без 'px'
};

// Создаю пины
var fillElementWithPins = function (template, data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var pinElement = createNode(template);

    fragment.appendChild(fillPinWithData(pinElement, data[i]));
  }

  return fragment;
};

var createNode = function (template) {
  return template.cloneNode(true);
};

var fillPinWithData = function (pin, data) {
  var pinStyles = getComputedStyle(pin);
  var pinImage = pin.querySelector('img');

  pin.style.left = data.location.x + (pinStyles.width / 2) + 'px';
  pin.style.top = data.location.y + pinStyles.height + 'px';
  pinImage.src = data.author.avatar;
  pinImage.alt = data.offer.title;

  return pin;
};

// Создаю карточки
var fillElementWithCards = function (template, data) {
  var fragment = document.createDocumentFragment(); // Не стал это писать сразу в return, так как читаемость ухудшается
  var cardElement = createNode(template);

  return fragment.appendChild(fillCardWithData(cardElement, data[0]));

};

var fillCardWithData = function (card, data) {
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardFeaturesItems = cardFeatures.querySelectorAll('.popup__feature');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardPhotosItem = cardPhotos.querySelector('.popup__photo');
  var cardAvatar = card.querySelector('.popup__avatar');

  cardTitle.textContent = data.offer.title;
  cardAddress.textContent = data.offer.address;
  cardPrice.textContent = data.offer.price + '₽/ночь';

  switch (data.offer.type) {
    case 'flat':
      cardType.textContent = 'Квартира';
      break;
    case 'bungalo':
      cardType.textContent = 'Бунгало';
      break;
    case 'house':
      cardType.textContent = 'Дом';
      break;
    case 'palace':
      cardType.textContent = 'Дворец';
      break;
    default:
      cardType.textContent = 'Неизвестное жильё';
      break;
  }

  cardCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  for (var k = 0; k < cardFeaturesItems.length; k++) { // Прохожусь по массиву удобств
    var cardFeaturesItemType = cardFeaturesItems[k].className.split('--')[1]; // Узнаю какое именно удобство(вайфай, парковка и тд)
    if (!~data.offer.features.indexOf(cardFeaturesItemType)) { // Если этого удобства нет в нашем массиве
      cardFeatures.removeChild(cardFeaturesItems[k]); // То удаляю его
    }
  }

  cardDescription.textContent = data.offer.description;

  cardPhotosItem.src = data.offer.photos[0]; // Заполняю путь для первой картинки
  for (var i = 1; i < data.offer.photos.length; i++) { // Создаю другие картинки и заполняю пути
    var photoItem = createNode(cardPhotosItem);
    photoItem.src = data.offer.photos[i];

    cardPhotos.appendChild(photoItem);
  }

  cardAvatar.src = data.author.avatar;

  return card;
};

var render = function (parentElement, childElement) {
  parentElement.appendChild(childElement);
};

var renderBefore = function (parentElement, beforeElement, childElement) {
  parentElement.insertBefore(childElement, beforeElement);
};

// Нахожу контейнеры и темплейты, вызываю функции
var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
var mapOfPins = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card')
  .content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFilterContainer = document.querySelector('.map__filters-container');

var data = createArray(NUMBER_OF_OBJECTS);
var pins = fillElementWithPins(pinTemplate, data);
var cards = fillElementWithCards(cardTemplate, data);

render(mapOfPins, pins);
renderBefore(map, mapFilterContainer, cards);
