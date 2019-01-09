'use strict';
(function () {
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

  var PULL_OF_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var PULL_OF_CHECKINS = ['12:00', '13:00', '14:00'];

  var PULL_OF_CHECKOUTS = ['12:00', '13:00', '14:00'];

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
  var ESC_KEYCODE = 27;
  var MAIN_PIN = {
    WIDTH: 65,
    HEIGHT: 87,
    DEFAULT_LEFT: 570,
    DEFAULT_TOP: 375
  };

  var PINS_COUNT = 5;

  window.constants = {
    PULL_OF_TITLES: PULL_OF_TITLES,
    PULL_OF_TYPES: PULL_OF_TYPES,
    PULL_OF_CHECKINS: PULL_OF_CHECKINS,
    PULL_OF_CHECKOUTS: PULL_OF_CHECKOUTS,
    PULL_OF_FEATURES: PULL_OF_FEATURES,
    PULL_OF_PHOTOS: PULL_OF_PHOTOS,
    NUMBER_OF_OBJECTS: NUMBER_OF_OBJECTS,
    ESC_KEYCODE: ESC_KEYCODE,
    MAIN_PIN: MAIN_PIN,
    PINS_COUNT: PINS_COUNT
  };
})();
