'use strict';
(function() {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = Array.from(adForm.elements);
  var mainPin = map.querySelector('.map__pin--main');

  function loadDataHadler() {
    mainPin.addEventListener('mouseup', activePageHandler);
  }

  function blockedPage() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adFormFields.forEach(function(item) {
      item.disabled = true;
    });
    mainPin.removeEventListener('mousedown', activePageHandler);
  }
  function unBlockedPage() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormFields.forEach(function(item) {
      item.disabled = false;
    });
    adForm.address.readOnly = true;
  }
function activePageHandler(event) {
  event.preventDefault()
  unBlockedPage();
  window.map.renderPins(window.data.get());
  mainPin.removeEventListener('mouseup', activePageHandler);
}


  function initAppHandler() {
    console.log('DOM Create');
    blockedPage();
    mainPin.addEventListener('mousedown', activePageHandler);
    document.addEventListener('loadData', loadDataHadler);
  }

  document.addEventListener('DOMContentLoaded', initAppHandler);
})();
