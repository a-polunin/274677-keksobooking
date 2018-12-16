'use strict';
(function () {
  var constants = window.constants;

  window.util = {
    firstTouchFlag: true,
    createArrayOfNumbers: function (num) {
      var array = [];
      for (var i = 0; i <= num; i++) {
        array.push(i);
      }
      return array;
    },

    getRandomElementFromArray: function (array) {
      return array[this.getRandomInteger(0, array.length - 1)];
    },

    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    cutArray: function (array) {
      var newArray = array.slice();
      newArray.sort(this.compareRandom);
      newArray.length = window.util.getRandomInteger(0, newArray.length);
      return newArray;
    },

    compareRandom: function () {
      return Math.random() - 0.5;
    },

    mixArrayElements: function (array) {
      return array.sort(this.compareRandom);
    },

    getBlockWidth: function (block) {
      return +getComputedStyle(block).width.
      slice(0, getComputedStyle(block).width.length - 2); // возвращаю ширину блока в виде числа без 'px'
    },

    createNode: function (template) {
      return template.cloneNode(true);
    },

    getTextContent: function (data) {
      return data ? data : '';
    },

    hideElement: function (element) {
      element.classList.add('hidden');
    },

    render: function (parentElement, childElement) {
      parentElement.appendChild(childElement);
    },

    renderBefore: function (parentElement, beforeElement, childElement) {
      if (childElement) {
        var childClone = window.util.createNode(childElement);
        parentElement.insertBefore(childClone, beforeElement);
      }
    },

    fillTemplateWithData: function (template, data, func) {
      var fragment = document.createDocumentFragment();
      data.filter(function (el) {
        return el.offer ? true : false;
      });
      for (var i = 0; i < data.length; i++) {
        var elem = window.util.createNode(template);
        if (template.classList.contains('map__pin')) {
          elem.classList.add('map__pin--' + i);
        }
        fragment.appendChild(func(elem, data[i]));
      }
      return fragment;
    },

    isEscEvent: function (e, action) {
      if (e.keyCode === constants.ESC_KEYCODE) {
        action();
      }
    },

    createErrorAlert: function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorMessage = window.util.createNode(errorTemplate);
      var main = document.querySelector('main');
      main.insertAdjacentElement('afterbegin', errorMessage);

      var deleteErrorMessage = function () {
        main.removeChild(errorMessage);
        document.removeEventListener('keyup', onErrorMessageEscPress);
      };

      var onErrorMessageEscPress = function (e) {
        window.util.isEscEvent(e, deleteErrorMessage);
      };

      errorMessage.addEventListener('click', deleteErrorMessage);
      document.addEventListener('keyup', onErrorMessageEscPress);
    },

    createSuccessMessage: function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var successMessage = window.util.createNode(successTemplate);
      var main = document.querySelector('main');
      main.insertAdjacentElement('afterbegin', successMessage);

      var deleteSuccessMessage = function () {
        main.removeChild(successMessage);
        document.removeEventListener('keyup', onSuccessMessageEscPress);
      };

      var onSuccessMessageEscPress = function (e) {
        window.util.isEscEvent(e, deleteSuccessMessage);
      };

      successMessage.addEventListener('click', deleteSuccessMessage);
      document.addEventListener('keyup', onSuccessMessageEscPress);
    },

    loadCardsAndPins: function (data) {
      window.createCards(data);
      window.createPins(data);
    },

    clearMapOfPins: function () {
      var mapPins = document.querySelectorAll('.map__pins .map__pin');
      mapPins.forEach(function (el) {
        if (el.classList.contains('map__pin--main')) {
          el.style.left = constants.DEFAULT_MAIN_PIN_LEFT + 'px';
          el.style.top = constants.DEFAULT_MAIN_PIN_TOP + 'px';
        } else {
          document.querySelector('.map__pins').removeChild(el);
        }
      });
    },

    activatePage: function () {
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
    },

    deactivatePage: function () {
      document.querySelector('.map').classList.add('map--faded');

      var adForm = document.querySelector('.ad-form');
      var adFormFieldsets = adForm.querySelectorAll('fieldset');
      var mapFiltersDisabledElements = document.querySelectorAll('.map__filters *:disabled');

      adFormFieldsets.forEach(function (item) {
        item.disabled = true;
      });
      adForm.classList.add('ad-form--disabled');

      mapFiltersDisabledElements.forEach(function (item) {
        item.disabled = true;
      });

      window.util.firstTouchFlag = true;
      adForm.reset();
      window.util.clearMapOfPins();
      window.util.setAddress(false);
      window.util.closeCard();
      window.util.createSuccessMessage();
    },

    setAddress: function (defaultAddress) {
      var mainPin = document.querySelector('.map__pin--main');
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
    },

    closeCard: function () {
      var map = document.querySelector('.map');
      var openedCard = document.querySelector('.map__card');
      var activePin = document.querySelector('.map__pin--active');
      if (openedCard) {
        map.removeChild(openedCard);
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
      }
      document.removeEventListener('keyup', window.util.onCardEscPress);
    },

    onCardEscPress: function (e) {
      window.util.isEscEvent(e, window.util.closeCard);
    },
  };
})();
