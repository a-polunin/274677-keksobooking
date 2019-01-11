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

  var PriceList = {
    LOW: 10000,
    HIGH: 50000
  };

  var getCheckedCheckboxes = function (checkboxesContainer) {
    var selectedCheckboxes = checkboxesContainer.querySelectorAll(
        'input.map__checkbox:checked'
    );
    return [].map.call(selectedCheckboxes, function (el) {
      return el.value;
    });
  };

  var filterHouseType = function (value, elementType) {
    return value === 'any' ? true : value === elementType;
  };

  var filterHousePrice = function (value, elementPrice) {
    if (value === 'any') {
      return true;
    } else if (value === 'low') {
      return elementPrice < PriceList.LOW;
    } else if (value === 'middle') {
      return elementPrice >= PriceList.LOW && elementPrice <= PriceList.HIGH;
    }
    return elementPrice > PriceList.HIGH;
  };

  var filterHouseRooms = function (value, elementRooms) {
    return value === 'any' ? true : +value === elementRooms;
  };

  var filterHouseGuests = function (value, elementGuests) {
    return value === 'any' ? true : +value === elementGuests;
  };

  var filterHouseFeatures = function (values, elementFeatures) {
    if (values.length) {
      return values.some(function (el) {
        return elementFeatures.indexOf(el) !== -1 ? true : false;
      });
    }
    return true;
  };

  var filters = {
    type: {
      name: 'type',
      functionName: filterHouseType,
      data: houseTypeSelect.options[houseTypeSelect.selectedIndex].value,
      active: false
    },
    price: {
      name: 'price',
      functionName: filterHousePrice,
      data: housePriceSelect.options[housePriceSelect.selectedIndex].value,
      active: false
    },
    rooms: {
      name: 'rooms',
      functionName: filterHouseRooms,
      data: houseRoomsSelect.options[houseRoomsSelect.selectedIndex].value,
      active: false
    },
    guests: {
      name: 'guests',
      functionName: filterHouseGuests,
      data: houseGuestsSelect.options[houseGuestsSelect.selectedIndex].value,
      active: false
    },
    features: {
      name: 'features',
      functionName: filterHouseFeatures,
      data: getCheckedCheckboxes(housingFeatures),
      active: false
    }
  };

  var getActiveFilters = function () {
    return Object.keys(filters).filter(function (key) {
      return filters[key].active ? true : false;
    });
  };

  var resetActiveFilters = function () {
    Object.keys(filters).forEach(function (key) {
      filters[key].active = false;
    });
  };

  var filterDataThroughActiveFilters = function () {
    var filteredData = backend.response.slice();
    var activeFiltersName = getActiveFilters();

    activeFiltersName.forEach(function (filterName) {
      filteredData = filteredData.filter(function (el) {
        return filters[filterName].functionName(
            filters[filterName].data,
            el.offer[filterName]
        );
      });
    });

    return filteredData;
  };

  var updateFilterData = function (filterName, newData) {
    filters[filterName].data = newData;
    if (filterName === 'features') {
      filters[filterName].active = newData.length ? true : false;
    } else {
      filters[filterName].active = newData !== 'any' ? true : false;
    }
  };

  mapFilters.addEventListener(
      'change',
      debounce(function (e) {
        var selectedFilterName =
        e.target.type === 'checkbox'
          ? e.target.parentElement.id.split('-')[1]
          : e.target.id.split('-')[1];

        var newFilterData =
        selectedFilterName === 'features'
          ? getCheckedCheckboxes(housingFeatures)
          : e.target.options[e.target.selectedIndex].value;

        updateFilterData(selectedFilterName, newFilterData);

        util.deletePins();
        util.closeCard();
        util.loadCardsAndPins(filterDataThroughActiveFilters());
      })
  );

  window.filter = {
    resetActiveFilters: resetActiveFilters
  };
})();
