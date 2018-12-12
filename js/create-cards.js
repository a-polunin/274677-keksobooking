'use strict';
(function () {
  var util = window.util;

  var fillCardWithData = function (card, data) {
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardFeatures = card.querySelector('.popup__features');
    var cardDescription = card.querySelector('.popup__description');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhotosItem = cardPhotos.querySelector('.popup__photo');
    var cardAvatar = card.querySelector('.popup__avatar');

    cardTitle.textContent = util.getTextContent(data.offer.title) || util.hideElement(cardTitle);
    cardAddress.textContent = util.getTextContent(data.offer.address) || util.hideElement(cardAddress);
    cardPrice.textContent = getCardPrice(data.offer.price) || util.hideElement(cardPrice);
    cardType.textContent = util.getTextContent(getCardType(data.offer.type)) || util.hideElement(cardType);
    cardCapacity.textContent = getCardCapacity(data.offer.rooms, data.offer.guests) || util.hideElement(cardCapacity);
    cardTime.textContent = getCardTime(data.offer.checkin, data.offer.checkout) || util.hideElement(cardTime);

    if (data.offer.features.length) {
      fillCardFeaturesWithData(cardFeatures, data);
    } else {
      util.hideElement(cardFeatures);
    }

    cardDescription.textContent = util.getTextContent(data.offer.description) || util.hideElement(cardDescription);

    cardPhotos.innerHTML = '';
    if (data.offer.photos.length) {
      fillCardPhotosWithData(cardPhotos, cardPhotosItem, data);
    } else {
      util.hideElement(cardPhotos);
    }

    cardAvatar.src = data.author.avatar || util.hideElement(cardAvatar);

    return card;
  };


  var fillCardFeaturesWithData = function (cardFeatures, data) {
    cardFeatures.innerHTML = '';
    for (var i = 0; i < data.offer.features.length; i++) {
      var cardFeaturesItem = document.createElement('li');
      cardFeaturesItem.classList.add('popup__feature');
      cardFeaturesItem.classList.add('popup__feature--' + data.offer.features[i]);
      cardFeatures.appendChild(cardFeaturesItem);
    }
  };

  var fillCardPhotosWithData = function (cardPhotos, cardPhotosItem, data) {
    for (var i = 0; i < data.offer.photos.length; i++) {
      var photoItem = util.createNode(cardPhotosItem);
      photoItem.src = data.offer.photos[i];
      cardPhotos.appendChild(photoItem);
    }
  };

  var getCardPrice = function (data) {
    return util.getTextContent(data) ? util.getTextContent(data) + '₽/ночь' : '';
  };

  var getCardCapacity = function (rooms, guests) {
    return rooms && guests ? rooms + ' комнаты для ' + guests + ' гостей' : '';
  };

  var getCardTime = function (checkin, checkout) {
    return checkin && checkout ? 'Заезд после ' + checkin + ', выезд до ' + checkout : '';
  };

  var getCardType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return '';
    }
  };

  window.createCards = function (data) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    return util.fillTemplateWithData(cardTemplate, data, fillCardWithData);
  };
})();
