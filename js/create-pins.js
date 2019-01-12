'use strict';
(function () {
  var util = window.util;
  var pinsContainer = document.querySelector('.map__pins');
  var fillPinWithData = function (pin, data) {
    var pinImage = pin.querySelector('img');

    pin.style.left = data.location.x + 'px';
    pin.style.top = data.location.y + 'px';
    pinImage.src = data.author.avatar;
    pinImage.alt = data.offer.title;

    return pin;
  };

  window.createPins = function (data) {
    var pinTemplate = document
      .querySelector('#pin')
      .content.querySelector('.map__pin');
    var pins = util.fillTemplateWithData(pinTemplate, data, fillPinWithData);
    pinsContainer.appendChild(pins);
  };
})();
