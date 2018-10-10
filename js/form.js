'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFields = Array.from(form.elements);
  var accommodationType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = Array.from(capacity.options);
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var placeholder = [0, 1000, 5000, 10000];
  var optionValue = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var roomMatch = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };

  function deactivateForm(startCoords) {
    form.classList.add('ad-form--disabled');
    formFields.forEach(function(item) {
      item.disabled = true;
    });
    form.address.value = startCoords.x + ', ' + startCoords.y;

    roomNumber.removeEventListener('change', setRooms);
    timeIn.removeEventListener('change', setCheckoutTime);
    accommodationType.removeEventListener('change', setMinPrice);
  }
  function activateForm() {
    form.classList.remove('ad-form--disabled');
    formFields.forEach(function(item) {
      item.disabled = false;
    });
    form.address.readOnly = true;

    toggleCapacity(roomNumber.value)

    roomNumber.addEventListener('change', setRooms);
    timeIn.addEventListener('change', setCheckoutTime);
    accommodationType.addEventListener('change', setMinPrice);
  }
  function setAdresHandler(event) {
    form.address.value = event.coords.x + ', ' + event.coords.y;
  }

  function  setMinPrice (evt) {
    var currentValue = evt.currentTarget.value;
    inputPrice.placeholder = optionValue[currentValue];
    inputPrice.min = optionValue[currentValue];
  }

  function setCheckoutTime (evt) {
    var currentValue = evt.currentTarget.value;
    timeOut.value = currentValue;
  }

  function setRooms (evt) {
    toggleCapacity(evt.currentTarget.value)
  }

  function toggleCapacity(value) {
    capacityOptions.forEach(function (option) {
      option.disabled = !roomMatch[value].includes(option.value)
    });
    capacity.value = value > 3 ? '0' : value;
  }

  document.addEventListener('endMove', setAdresHandler);

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    //setHandlers: setFormHandlers
  }
})();
