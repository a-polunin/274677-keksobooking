'use strict';
(function () {
  var util = window.util;
  var backend = window.backend;
  var constants = window.constants;
  var filter = window.filter;
  var mainPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');

  var setMainPinPosition = function (shift) {
    if (mainPin.offsetTop - shift.y < constants.MAIN_PIN.MIN_TOP) {
      mainPin.style.top = constants.MAIN_PIN.MIN_TOP + 'px';
    } else if (mainPin.offsetTop - shift.y > constants.MAIN_PIN.MAX_TOP) {
      mainPin.style.top = constants.MAIN_PIN.MAX_TOP + 'px';
    } else {
      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
    }

    if (mainPin.offsetLeft - shift.x < constants.MAIN_PIN.MIN_LEFT) {
      mainPin.style.left = constants.MAIN_PIN.MIN_LEFT + 'px';
    } else if (mainPin.offsetLeft - shift.x > constants.MAIN_PIN.MAX_LEFT) {
      mainPin.style.left = constants.MAIN_PIN.MAX_LEFT + 'px';
    } else {
      mainPin.style.left = Math.floor(mainPin.offsetLeft - shift.x) + 'px';
    }
  };

  var calculateShift = function (startCoords, moveEvent) {
    return {
      x: startCoords.x - moveEvent.clientX,
      y: startCoords.y - moveEvent.clientY
    };
  };

  var updateStartCoords = function (moveEvent) {
    return {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };
  };

  mainPin.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      if (util.firstTouchFlag) {
        util.activatePage();
        backend.load(util.loadCardsAndPins, util.createErrorAlert);
        filter.resetActiveFilters();
      }
      util.setAddress();

      var shift = calculateShift(startCoords, moveEvent);

      startCoords = updateStartCoords(moveEvent);
      setMainPinPosition(shift);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      util.setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinsContainer.addEventListener('click', function (e) {
    var target = e.target.closest('.map__pin');

    if (target && target !== mainPin) {
      util.closeCard();
      util.openCard(target);

      document.addEventListener('keyup', util.onCardEscPress);

      var closeCardButton = document.querySelector('.map__card .popup__close');
      closeCardButton.addEventListener('click', function () {
        util.closeCard();
      });
    }
  });

  util.setAddress();

  window.map = {
    cards: {}
  };
})();
