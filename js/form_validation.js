'use strict';
document.querySelector('.ad-form').classList.remove('ad-form--disabled');
var houseType = document.querySelector('#type');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');

houseType.addEventListener('change', function () {
  var selectedHouseType = houseType.options[houseType.selectedIndex].value;
  var housePrice = document.querySelector('#price');

  housePrice.min = getSelectedHousePrice(selectedHouseType);
  housePrice.placeholder = getSelectedHousePrice(selectedHouseType);
});

var getSelectedHousePrice = function (type) {
  switch (type) {
    case 'bungalo':
      return 0;
    case 'flat':
      return 1000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    default:
      return 0;
  }
};

timeIn.addEventListener('change', function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
});

timeOut.addEventListener('change', function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
});

roomNumber.addEventListener('change', function () {
  var selectedRoomNumber = roomNumber.options[roomNumber.selectedIndex].value;
  enableCapacityOptions(+selectedRoomNumber);
});

var enableCapacityOptions = function (num) {
  var capacity = document.querySelector('#capacity');
  for (var i = 0; i < capacity.options.length; i++) {
    capacity.options[i].disabled = true;
  }

  if (num !== 100) {
    capacity.selectedIndex = 0;
    for (var k = 0; k < num; k++) {
      capacity.options[k].disabled = false;
    }
  } else {
    capacity.options[3].disabled = false;
    capacity.selectedIndex = 3;
  }

};
