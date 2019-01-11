'use strict';
(function () {
  var util = window.util;
  var constants = window.constants;
  var houseType = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');

  houseType.addEventListener('change', function () {
    var selectedHouseType = houseType.options[houseType.selectedIndex].value;
    var housePrice = document.querySelector('#price');

    housePrice.min = getSelectedHousePrice(selectedHouseType);
    housePrice.placeholder = getSelectedHousePrice(selectedHouseType);
  });

  var getSelectedHousePrice = function (type) {
    return constants.AccomodationPrice[type.toUpperCase()] || 0;
  };

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  var enableCapacityOptions = function () {
    var selectedRoomNumber = +roomNumber.options[roomNumber.selectedIndex]
      .value;
    var capacity = document.querySelector('#capacity');
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = true;
    }

    if (selectedRoomNumber !== 100) {
      capacity.selectedIndex = 0;
      for (var k = 0; k < selectedRoomNumber; k++) {
        capacity.options[k].disabled = false;
      }
    } else {
      capacity.options[3].disabled = false;
      capacity.selectedIndex = 3;
    }
  };

  roomNumber.addEventListener('change', enableCapacityOptions);

  adForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.backend.save(
        new FormData(adForm),
        util.publishAdvert,
        util.createErrorAlert
    );
  });

  adFormReset.addEventListener('click', util.deactivatePage);
})();
