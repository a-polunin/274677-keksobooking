'use strict';
(function () {
  var backend = window.backend;
  var util = window.util;
  var debounce = window.debounce;
  var mapFilters = document.querySelector('.map__filters');
  var filteredData = [];

  var priceList = {
    low: 10000,
    middle: [10000, 50000],
    high: 50000
  };

  var getCheckedCheckboxes = function (checkboxesContainer) {
    var selectedCheckboxes = checkboxesContainer.querySelectorAll('input.map__checkbox:checked');
    var checkedValues = [].map.call(selectedCheckboxes, function (el) {
      return el.value;
    });

    return checkedValues;
  };

  var filterHouseType = function (value, elementType) {
    return value === 'any' ? true : value === elementType;
  };

  var filterHousePrice = function (value, elementPrice) {
    if (value === 'any') {
      return true;
    } else if (value === 'low') {
      return elementPrice < priceList[value];
    } else if (value === 'middle') {
      return ((elementPrice >= priceList[value][0]) && (elementPrice <= priceList[value][1]));
    } else {
      return elementPrice > priceList[value];
    }
  };

  var filterHouseRooms = function (value, elementRooms) {
    return value === 'any' ? true : +value === elementRooms;
  };

  var filterHouseGuests = function (value, elementGuests) {
    return value === 'any' ? true : +value === elementGuests;
  };

  var filterHouseFeatures = function (values, elementFeatures) {
    if (values.length) {
      for (var i = 0; i < values.length; i++) {
        if (~elementFeatures.indexOf(values[i])) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  var formFilter = function (type, price, rooms, guests, features) {
    var filteredForm = backend.response.filter(function (el) {
      return (
        filterHouseType(type, el.offer.type) &&
        filterHousePrice(price, el.offer.price) &&
        filterHouseRooms(rooms, el.offer.rooms) &&
        filterHouseGuests(guests, el.offer.guests) &&
        filterHouseFeatures(features, el.offer.features)
      );
    });

    return filteredForm;
  };

  mapFilters.addEventListener('change', debounce(function () {
    var houseTypeSelect = document.querySelector('#housing-type');
    var selectedHouseType = houseTypeSelect.options[houseTypeSelect.selectedIndex].value;

    var housePriceSelect = document.querySelector('#housing-price');
    var selectedHousePrice = housePriceSelect.options[housePriceSelect.selectedIndex].value;

    var houseRoomsSelect = document.querySelector('#housing-rooms');
    var selectedHouseRooms = houseRoomsSelect.options[houseRoomsSelect.selectedIndex].value;

    var houseGuestsSelect = document.querySelector('#housing-guests');
    var selectedHouseGuests = houseGuestsSelect.options[houseGuestsSelect.selectedIndex].value;

    var housingFeatures = document.querySelector('#housing-features');
    var selectedHouseFeatures = getCheckedCheckboxes(housingFeatures);

    filteredData = formFilter(selectedHouseType, selectedHousePrice, selectedHouseRooms, selectedHouseGuests, selectedHouseFeatures);

    util.clearMapOfPins();
    util.closeCard();
    util.loadCardsAndPins(filteredData);
  }));
})();
