'use strict';
(function () {
  var backend = window.backend;
  var util = window.util;
  var debounce = window.debounce;

  var mapFilters = document.querySelector('.map__filters');
  var houseTypeSelect = document.querySelector('#housing-type');
  var housePriceSelect = document.querySelector('#housing-price');
  var houseRoomsSelect = document.querySelector('#housing-rooms');
  var houseGuestsSelect = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

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

  var filters = {
    type: {
      filterName: 'type',
      filterFunction: filterHouseType,
      filterData: houseTypeSelect.options[houseTypeSelect.selectedIndex].value,
      active: false
    },
    price: {
      filterName: 'price',
      filterFunction: filterHousePrice,
      filterData: housePriceSelect.options[housePriceSelect.selectedIndex].value,
      active: false
    },
    rooms: {
      filterName: 'rooms',
      filterFunction: filterHouseRooms,
      filterData: houseRoomsSelect.options[houseRoomsSelect.selectedIndex].value,
      active: false
    },
    guests: {
      filterName: 'guests',
      filterFunction: filterHouseGuests,
      filterData: houseGuestsSelect.options[houseGuestsSelect.selectedIndex].value,
      active: false
    },
    features: {
      filterName: 'features',
      filterFunction: filterHouseFeatures,
      filterData: getCheckedCheckboxes(housingFeatures),
      active: false
    },
  };

  var filterForm = function () {
    var filteredData = backend.response.slice();
    var activeFiltersName = Object.keys(filters).filter(function (key) { // Узнаем, какие фильтры активны
      return filters[key].active ? true : false;
    });

    activeFiltersName.forEach(function (filterName) { // Фильтруем только через те, которые включены
      filteredData = filteredData.filter(function (el) {
        return filters[filterName].filterFunction(filters[filterName].filterData, el.offer[filterName]);
      });
    });

    return filteredData;
  };

  var updateFilterData = function (filterName, newData) {
    filters[filterName].filterData = newData;
    if (filterName === 'features') {
      filters[filterName].active = newData.length ? true : false;
    } else {
      filters[filterName].active = newData !== 'any' ? true : false;
    }
  };

  mapFilters.addEventListener('change', debounce(function (e) {
    var selectedFilterName = e.target.type === 'checkbox' ?
      e.target.parentElement.id.split('-')[1] :
      e.target.id.split('-')[1];

    var newFilterData = selectedFilterName === 'features' ?
      getCheckedCheckboxes(housingFeatures) :
      e.target.options[e.target.selectedIndex].value;

    updateFilterData(selectedFilterName, newFilterData);

    util.clearMapOfPins();
    util.closeCard();
    util.loadCardsAndPins(filterForm());
  }));
})();
