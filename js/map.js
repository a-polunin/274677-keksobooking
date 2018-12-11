'use strict';
(function () {
  var util = window.util;
  var constants = window.constants;
  var data = window.data;
  var createPins = window.createPins;
  var createCards = window.createCards;

  var activatePage = function () {
    document.querySelector('.map').classList.remove('map--faded');

    var adForm = document.querySelector('.ad-form');
    var adFormFieldsets = adForm.querySelectorAll('fieldset');
    var mapFiltersDisabledElements = document.querySelectorAll('.map__filters *:disabled');

    adFormFieldsets.forEach(function (item) {
      item.disabled = false;
    });
    adForm.classList.remove('ad-form--disabled');

    mapFiltersDisabledElements.forEach(function (item) {
      item.disabled = false;
    });
  };

  var setAddress = function (defaultAddress) {
    var adressInput = document.querySelector('#address');
    var mainPinStyle = getComputedStyle(mainPin);
    var mainPinLeft = +mainPinStyle.left.slice(0, mainPinStyle.left.length - 2);
    var mainPinTop = +mainPinStyle.top.slice(0, mainPinStyle.top.length - 2);

    var defaultLeft = Math.floor((mainPinLeft + (constants.MAIN_PIN_WIDTH / 2)));
    var defaultTop = Math.floor((mainPinTop + (constants.MAIN_PIN_HEIGHT / 2)));
    var left = Math.floor((mainPinLeft + (constants.MAIN_PIN_WIDTH / 2)));
    var top = (mainPinTop + (constants.MAIN_PIN_HEIGHT));

    adressInput.value = defaultAddress ?
      defaultLeft + ', ' + defaultTop :
      left + ', ' + top;
  };

  var cards = createCards(data);
  var mainPin = document.querySelector('.map__pin--main');
  var mapOfPins = document.querySelector('.map__pins');

  var closeCard = function () {
    var map = document.querySelector('.map');
    var openedCard = document.querySelector('.map__card');
    if (openedCard) {
      map.removeChild(openedCard);
    }
    document.removeEventListener('keyup', onCardEscPress);
  };

  var onCardEscPress = function (e) {
    util.isEscEvent(e, closeCard);
  };

  mainPin.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var MAX_LEFT = 1135; // 1200 - 65, где 1200 ширина карты, а 65 ширина метки
      var MIN_LEFT = 0;
      var MIN_TOP = 43;
      var MAX_TOP = 553;

      activatePage();
      setAddress(false);
      createPins(data);

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      if ((mainPin.offsetTop - shift.y) < MIN_TOP) {
        mainPin.style.top = MIN_TOP + 'px';
      } else if ((mainPin.offsetTop - shift.y) > MAX_TOP) {
        mainPin.style.top = MAX_TOP + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if ((mainPin.offsetLeft - shift.x) < MIN_LEFT) {
        mainPin.style.left = MIN_LEFT + 'px';
      } else if ((mainPin.offsetLeft - shift.x) > MAX_LEFT) {
        mainPin.style.left = MAX_LEFT + 'px';
      } else {
        mainPin.style.left = Math.floor((mainPin.offsetLeft - shift.x)) + 'px';
      }

    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      setAddress(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapOfPins.addEventListener('click', function (e) {
    var map = document.querySelector('.map');
    var mapFilterContainer = document.querySelector('.map__filters-container');
    var target = e.target.closest('.map__pin');

    if (target && target !== mainPin) {
      closeCard();

      var pinClassName = +target.className.split('--')[1];
      util.renderBefore(map, mapFilterContainer, cards.children[pinClassName]);
      document.addEventListener('keyup', onCardEscPress);

      var closeCardBtn = document.querySelector('.map__card .popup__close');
      closeCardBtn.addEventListener('click', function () {
        closeCard();
      });
    }
  });

  setAddress(true);
})();
