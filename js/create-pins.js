'use strict';
(function () {
  var util = window.util;
  var fillPinWithData = function (pin, data) {
    var pinWidth = util.getBlockWidth(pin);
    var pinHeight = util.getBlocHeight(pin);
    var pinImage = pin.querySelector('img');

    pin.style.left = data.location.x + pinWidth / 2 + 'px';
    pin.style.top = data.location.y + pinHeight + 'px';
    pinImage.src = data.author.avatar;
    pinImage.alt = data.offer.title;

    return pin;
  };

  window.createPins = function (data) {
    var pinTemplate = document
      .querySelector('#pin')
      .content.querySelector('.map__pin');
    var mapOfPins = document.querySelector('.map__pins');
    var pins = util.fillTemplateWithData(pinTemplate, data, fillPinWithData);
    mapOfPins.appendChild(pins);
  };
})();
