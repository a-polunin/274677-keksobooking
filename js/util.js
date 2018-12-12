'use strict';
(function () {
  var constants = window.constants;

  window.util = {
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
  };
})();
