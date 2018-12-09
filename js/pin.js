'use strict';
(function () {
  var createPins = function (data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapOfPins = document.querySelector('.map__pins');

    var pins = window.util.fillTemplateWithData(pinTemplate, data, fillPinWithData);
    window.util.render(mapOfPins, pins);
  };

  var fillPinWithData = function (pin, data) {
    var pinStyles = getComputedStyle(pin);
    var pinWidth = +pinStyles.width.slice(0, pinStyles.width.length - 2);
    var pinHeight = +pinStyles.width.slice(0, pinStyles.height.length - 2);
    var pinImage = pin.querySelector('img');

    pin.style.left = data.location.x + (pinWidth / 2) + 'px';
    pin.style.top = data.location.y + pinHeight + 'px';
    pinImage.src = data.author.avatar;
    pinImage.alt = data.offer.title;

    return pin;
  };

  window.pin = function () {
    return createPins(window.createData.data);
  };
})();
