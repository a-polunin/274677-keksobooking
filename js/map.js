'use strict';
(function () {
  var util = window.util;
  var backend = window.backend;

  var mainPin = document.querySelector('.map__pin--main');
  var mapOfPins = document.querySelector('.map__pins');

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
      var MAX_TOP = 543;

      if (util.firstTouchFlag) {
        util.activatePage();
        util.setAddress(false);
        backend.load(util.loadCardsAndPins, util.createErrorAlert);
        util.firstTouchFlag = false;
      }
      util.setAddress(false);

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

      util.setAddress(false);

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
      util.closeCard();

      var pinClassName = +target.className.split('--')[1];
      util.renderBefore(map, mapFilterContainer, window.map.cards.children[pinClassName]);
      target.classList.add('map__pin--active');

      document.addEventListener('keyup', util.onCardEscPress);

      var closeCardBtn = document.querySelector('.map__card .popup__close');
      closeCardBtn.addEventListener('click', function () {
        util.closeCard();
      });
    }
  });

  util.setAddress(true);

  window.map = {
    cards: '',
  };
})();
