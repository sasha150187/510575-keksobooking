'use strict';

(function () {
  var ESC_CODE = 27;
  var form = document.querySelector('.ad-form');
  var formFields = Array.from(form.elements);
  var accommodationType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = Array.from(capacity.options);
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var sucsessTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageBox = document.querySelector('main');
  var sucsessCb = null;
  var msg = null;


  var optionValue = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  // var l10n = {
  //   bungalo: 'Бугало',
  //   flat: 'Квартира',
  //   house: 'Дом',
  //   palace: 'Дворец'
  // }
  var roomMatch = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };

  var resetEvent = new Event('reset', {cancelable: true, bubbles: true});

  function deactivateForm(startCoords) {
    form.classList.add('ad-form--disabled');
    formFields.forEach(function (item) {
      item.disabled = true;
    });
    form.address.value = startCoords.x + ', ' + startCoords.y;

    roomNumber.removeEventListener('change', setRooms);
    timeIn.removeEventListener('change', setCheckoutTime);
    accommodationType.removeEventListener('change', setMinPrice);
    form.removeEventListener('submit', formSubmitHandler);
  }
  function activateForm() {
    form.classList.remove('ad-form--disabled');
    formFields.forEach(function (item) {
      item.disabled = false;
    });
    form.address.readOnly = true;

    toggleCapacity(roomNumber.value);

    roomNumber.addEventListener('change', setRooms);
    timeIn.addEventListener('change', setCheckoutTime);
    accommodationType.addEventListener('change', setMinPrice);
    form.addEventListener('submit', formSubmitHandler);
  }
  function setAdresHandler(event) {
    form.address.value = event.coords.x + ', ' + event.coords.y;
  }

  function setMinPrice(evt) {
    var currentValue = evt.currentTarget.value;
    inputPrice.placeholder = optionValue[currentValue];
    inputPrice.min = optionValue[currentValue];
  }

  function setCheckoutTime(evt) {
    var currentValue = evt.currentTarget.value;
    timeOut.value = currentValue;
  }

  function setRooms(evt) {
    toggleCapacity(evt.currentTarget.value);
  }

  function toggleCapacity(value) {
    capacityOptions.forEach(function (option) {
      option.disabled = !roomMatch[value].includes(option.value);
    });
    capacity.value = value > 3 ? '0' : value;
  }
  function closeMsg() {
    msg.remove();
    document.removeEventListener('keydown', closeMsgHandler);
    document.removeEventListener('click', closeMsgHandler);
  }
  function closeMsgHandler(event) {
    if ((event.keyCode === ESC_CODE || event.type === 'click') && msg) {
      closeMsg();
    }
  }
  function onSucsess() {
    sucsessCb();
    var template = sucsessTemplate.cloneNode(true);
    msg = template;
    messageBox.appendChild(template);
    form.dispatchEvent(resetEvent);
    document.addEventListener('keydown', closeMsgHandler);
    document.addEventListener('click', closeMsgHandler);
  }
  function onError() {
    var template = errorTemplate.cloneNode(true);
    msg = template;
    template.querySelector('.error__button').addEventListener('click', function (event) {
      event.preventDefault();
      closeMsg();
    });
    messageBox.appendChild(template);
    document.addEventListener('keydown', closeMsgHandler);
    document.addEventListener('click', closeMsgHandler);
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    window.backend.upload(new FormData(form), onSucsess, onError);
  }

  document.addEventListener('endMove', setAdresHandler);


  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    DOMElement: form,
    setSucsessCb: function (cb) {
      sucsessCb = cb;
    }
  };
})();
