'use strict';
(function () {
  var util = window.util;
  var constants = window.constants;

  var titlesCopy = constants.PULL_OF_TITLES.slice();
  var avatarCounterArray = util.createArrayOfNumbers(constants.NUMBER_OF_OBJECTS);

  // Создаю массив объектов
  var createAdArray = function (num) {
    var array = [];
    for (var i = 0; i < num; i++) {
      array.push(createAdObject(
          constants.PULL_OF_TYPES,
          constants.PULL_OF_CHECKINS,
          constants.PULL_OF_CHECKOUTS,
          constants.PULL_OF_FEATURES,
          constants.PULL_OF_PHOTOS));
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
        price: util.getRandomInteger(1000, 1000000),
        type: util.getRandomElementFromArray(types),
        rooms: util.getRandomInteger(1, 5),
        guests: util.getRandomInteger(1, 10),
        checkin: util.getRandomElementFromArray(checkins),
        checkout: util.getRandomElementFromArray(checkouts),
        features: util.cutArray(features),
        description: '',
        photos: util.mixArrayElements(photos)
      },
      location: {
        x: getLocationX(),
        y: util.getRandomInteger(130, 630)
      }
    };
  };


  var createAvatar = function () {
    var avatarNumber = avatarCounterArray.splice(util.getRandomInteger(1, avatarCounterArray.length - 1), 1); // Удаляю рандомный элемент из массива чисел и возвращаю его
    return 'img/avatars/user0' + avatarNumber + '.png';
  };

  var createTitle = function () {
    return titlesCopy.splice(util.getRandomInteger(0, titlesCopy.length - 1), 1) + ''; // Удаляю рандомный элемент из массива заголовков и возвращаю его в виде строки
  };

  var createAdress = function (maxX, maxY) {
    return util.getRandomInteger(0, maxX) + ', ' + util.getRandomInteger(0, maxY);
  };

  var getLocationX = function () {
    var pinWidth = 50;
    var mapWidth = util.getBlockWidth(document.querySelector('.map__pins')) - pinWidth;

    return util.getRandomInteger(0, mapWidth);
  };

  window.data = createAdArray(constants.NUMBER_OF_OBJECTS);
})();
