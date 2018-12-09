'use strict';
(function () {
  var titlesCopy = window.constants.PULL_OF_TITLES.slice();

  var avatarCounterArray = window.util.createArrayOfNumbers(window.constants.NUMBER_OF_OBJECTS);

  // Создаю массив объектов
  var createAdArray = function (num) {
    var array = [];
    for (var i = 0; i < num; i++) {
      array.push(createAdObject(
          window.constants.PULL_OF_TYPES,
          window.constants.PULL_OF_CHECKINS,
          window.constants.PULL_OF_CHECKOUTS,
          window.constants.PULL_OF_FEATURES,
          window.constants.PULL_OF_PHOTOS));
    }

    return array;
  };

  var createAdObject = function (types, checkins, checkouts, features, photos) {
    return {
      author: {
        avatar: createAvatar()
      },
      offer: {
        title: createTitle(),
        address: createAdress(1000, 1000),
        price: window.util.getRandomInteger(1000, 1000000),
        type: window.util.getRandomElementFromArray(types),
        rooms: window.util.getRandomInteger(1, 5),
        guests: window.util.getRandomInteger(1, 10),
        checkin: window.util.getRandomElementFromArray(checkins),
        checkout: window.util.getRandomElementFromArray(checkouts),
        features: window.util.cutArray(features),
        description: '',
        photos: window.util.mixArrayElements(photos)
      },
      location: {
        x: getLocationX(),
        y: window.util.getRandomInteger(130, 630)
      }
    };
  };


  var createAvatar = function () {
    var avatarNumber = avatarCounterArray.splice(window.util.getRandomInteger(1, avatarCounterArray.length - 1), 1); // Удаляю рандомный элемент из массива чисел и возвращаю его
    return 'img/avatars/user0' + avatarNumber + '.png';
  };

  var createTitle = function () {
    return titlesCopy.splice(window.util.getRandomInteger(0, titlesCopy.length - 1), 1) + ''; // Удаляю рандомный элемент из массива заголовков и возвращаю его в виде строки
  };

  var createAdress = function (maxX, maxY) {
    return window.util.getRandomInteger(0, maxX) + ', ' + window.util.getRandomInteger(0, maxY);
  };

  var getLocationX = function () {
    var pinWidth = 50;
    var mapWidth = window.util.getBlockWidth(document.querySelector('.map__pins')) - pinWidth;

    return window.util.getRandomInteger(0, mapWidth);
  };

  window.createData = {
    data: createAdArray(window.constants.NUMBER_OF_OBJECTS)
  };
})();
