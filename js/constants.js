'use strict';
(function () {
  var NUMBER_OF_OBJECTS = 8;
  var ESC_KEYCODE = 27;
  var PINS_COUNT = 5;

  var MAIN_PIN = {
    WIDTH: 65,
    HEIGHT: 87,
    DEFAULT_LEFT: 570,
    DEFAULT_TOP: 375,
    MAX_LEFT: 1135,
    MIN_LEFT: 0,
    MIN_TOP: 43,
    MAX_TOP: 543
  };

  var BACKEND = {
    STATUS_200: 200,
    TIMEOUT: 10000
  };

  var HOUSE_PREVIEW = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var AccomodationPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var AccomodationType = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    FLAT: 'Квартира',
    PALACE: 'Дворец'
  };

  window.constants = {
    NUMBER_OF_OBJECTS: NUMBER_OF_OBJECTS,
    ESC_KEYCODE: ESC_KEYCODE,
    MAIN_PIN: MAIN_PIN,
    BACKEND: BACKEND,
    HOUSE_PREVIEW: HOUSE_PREVIEW,
    PINS_COUNT: PINS_COUNT,
    AccomodationType: AccomodationType,
    AccomodationPrice: AccomodationPrice
  };
})();
