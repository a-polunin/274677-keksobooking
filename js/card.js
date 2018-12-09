'use strict';
(function () {
  var createCards = function (data) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    return window.util.fillTemplateWithData(cardTemplate, data, fillCardWithData);
  };

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

    cardTitle.textContent = window.util.getTextContent(data.offer.title) || window.util.hideElement(cardTitle);
    cardAddress.textContent = window.util.getTextContent(data.offer.address) || window.util.hideElement(cardAddress);
    cardPrice.textContent = getCardPrice(data.offer.price) || window.util.hideElement(cardPrice);
    cardType.textContent = window.util.getTextContent(getCardType(data.offer.type)) || window.util.hideElement(cardType);
    cardCapacity.textContent = getCardCapacity(data.offer.rooms, data.offer.guests) || window.util.hideElement(cardCapacity);
    cardTime.textContent = getCardTime(data.offer.checkin, data.offer.checkout) || window.util.hideElement(cardTime);

    if (data.offer.features.length) {
      fillCardFeaturesWithData(cardFeatures, data);
    } else {
      window.util.hideElement(cardFeatures);
    }

    cardDescription.textContent = window.util.getTextContent(data.offer.description) || window.util.hideElement(cardDescription);

    cardPhotos.innerHTML = '';
    if (data.offer.photos.length) {
      fillCardPhotosWithData(cardPhotos, cardPhotosItem, data);
    } else {
      window.util.hideElement(cardPhotos);
    }

    cardAvatar.src = data.author.avatar || window.util.hideElement(cardAvatar);

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
      var photoItem = window.util.createNode(cardPhotosItem);
      photoItem.src = data.offer.photos[i];
      cardPhotos.appendChild(photoItem);
    }
  };

  var getCardPrice = function (data) {
    return window.util.getTextContent(data) ? window.util.getTextContent(data) + '₽/ночь' : '';
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

  window.card = function () {
    return createCards(window.createData.data);
  };
})();
