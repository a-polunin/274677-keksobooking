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
var createAdArray = function (num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    array.push(createAdObject(
        PULL_OF_TYPES,
        PULL_OF_CHECKINS,
        PULL_OF_CHECKOUTS,
        PULL_OF_FEATURES,
        PULL_OF_PHOTOS));
  }

  return array;
};

var createAdObject = function (types, checkins, checkouts, features, photos) {
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
      x: getLocationX(),
      y: getRandomInteger(130, 630)
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
  var avatarNumber = avatarCounterArray.splice(getRandomInteger(1, avatarCounterArray.length - 1), 1); // Удаляю рандомный элемент из массива чисел и возвращаю его
  return 'img/avatars/user0' + avatarNumber + '.png';
};

var createTitle = function () {
  return titlesCopy.splice(getRandomInteger(0, titlesCopy.length - 1), 1) + ''; // Удаляю рандомный элемент из массива заголовков и возвращаю его в виде строки
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

var getLocationX = function () {
  var pinWidth = 50;
  var mapWidth = getBlockWidth(document.querySelector('.map__pins')) - pinWidth;

  return getRandomInteger(0, mapWidth);
};


// Создаю пины
var createPins = function (data) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapOfPins = document.querySelector('.map__pins');

  var pins = fillTemplateWithData(pinTemplate, data, fillPinWithData);
  render(mapOfPins, pins);
};

var fillTemplateWithData = function (template, data, func) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var pinElement = createNode(template);

    fragment.appendChild(func(pinElement, data[i]));
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

// Создаю карты
var createCards = function (data) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');

  var firstCard = [data[0]];
  var cards = fillTemplateWithData(cardTemplate, firstCard, fillCardWithData);
  renderBefore(map, mapFilterContainer, cards);
};

var fillCardWithData = function (card, data) {
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardPhotosItem = cardPhotos.querySelector('.popup__photo');
  var cardAvatar = card.querySelector('.popup__avatar');

  cardTitle.textContent = getTextContent(data.offer.title) || hideElement(cardTitle);
  cardAddress.textContent = getTextContent(data.offer.address) || hideElement(cardAddress);
  cardPrice.textContent = getCardPrice(data.offer.price) || hideElement(cardPrice);
  cardType.textContent = getTextContent(getCardType(data.offer.type)) || hideElement(cardType);
  cardCapacity.textContent = getCardCapacity(data.offer.rooms, data.offer.guests) || hideElement(cardCapacity);
  cardTime.textContent = getCardTime(data.offer.checkin, data.offer.checkout) || hideElement(cardTime);

  if (data.offer.features.length) {
    fillCardFeaturesWithData(cardFeatures, data);
  } else {
    hideElement(cardFeatures);
  }

  cardDescription.textContent = getTextContent(data.offer.description) || hideElement(cardDescription);

  cardPhotos.innerHTML = '';
  if (data.offer.photos.length) {
    fillCardPhotosWithData(cardPhotos, cardPhotosItem, data);
  } else {
    hideElement(cardPhotos);
  }

  cardAvatar.src = data.author.avatar || hideElement(cardAvatar);

  return card;
};

var getTextContent = function (data) {
  return data ? data : '';
};

var hideElement = function (element) {
  element.classList.add('hidden');
};

var fillCardFeaturesWithData = function (cardFeatures, data) {
  cardFeatures.innerHTML = '';
  for (var i = 0; i < data.offer.features.length; i++) {
    var cardFeaturesItem = document.createElement('li');
    cardFeaturesItem.classList.add('popup__feature');
    cardFeaturesItem.classList.add('popup__feature--' + data.offer.features[i]);
    cardFeatures.appendChild(cardFeaturesItem);
  }
};

var fillCardPhotosWithData = function (cardPhotos, cardPhotosItem, data) {
  for (var i = 0; i < data.offer.photos.length; i++) {
    var photoItem = createNode(cardPhotosItem);
    photoItem.src = data.offer.photos[i];
    cardPhotos.appendChild(photoItem);
  }
};

var getCardPrice = function (data) {
  return getTextContent(data) ? getTextContent(data) + '₽/ночь' : '';
};

var getCardCapacity = function (rooms, guests) {
  return rooms && guests ? rooms + ' комнаты для ' + guests + ' гостей' : '';
};

var getCardTime = function (checkin, checkout) {
  return checkin && checkout ? 'Заезд после ' + checkin + ', выезд до ' + checkout : '';
};

var getCardType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return '';
  }
};

var render = function (parentElement, childElement) {
  parentElement.appendChild(childElement);
};

var renderBefore = function (parentElement, beforeElement, childElement) {
  parentElement.insertBefore(childElement, beforeElement);
};

var data = createAdArray(NUMBER_OF_OBJECTS);
createPins(data);
createCards(data);
