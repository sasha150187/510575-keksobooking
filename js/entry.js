'use strict';

(function() {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters');
  var filters;

  var mainPinStartCoords = {
    x: parseInt(mainPin.style.left),
    y: parseInt(mainPin.style.top)
  };

  function loadDataHadler() {
    mainPin.addEventListener('mouseup', activePageHandler);

    if (filters) {
      filters.enable(window.data.get());
    }
  }

  function blockPageHandler() {
    blockedPage();
    setTimeout(function () {
      window.form.deactivate(mainPinStartCoords);
    }, 100);
  }

  function blockedPage() {

    map.classList.add('map--faded');
    window.form.deactivate(mainPinStartCoords);
    mainPin.style.left = mainPinStartCoords.x + 'px';
    mainPin.style.top = mainPinStartCoords.y + 'px';
    window.map.deletePins();
    mainPin.addEventListener('mouseup', activePageHandler);
    window.form.DOMElement.removeEventListener('reset', blockPageHandler);
  }
  function unBlockedPage() {
    map.classList.remove('map--faded');
    window.form.activate();
    window.form.DOMElement.addEventListener('reset', blockPageHandler);
  }

  function activePageHandler(event) {
    event.preventDefault();
    unBlockedPage();
    window.map.renderPins(window.data.get());
    mainPin.removeEventListener('mouseup', activePageHandler);
  }

  function filterHandler(event) {

    window.app.debounce(function () {
      window.map.deletePins();
      window.map.renderPins(event.filtrateData);
    });
  }

  function initFilters() {
    filters = window.filters(filtersContainer);
    filters.disable();
    document.addEventListener('onFilterate', filterHandler);
  }

  function initAppHandler() {
    blockedPage();
    initFilters();
    window.form.setSucsessCb(blockedPage);
    window.pin.setHandler(mainPin, '.map__pins');
    document.addEventListener('loadData', loadDataHadler);
  }
  document.addEventListener('DOMContentLoaded', initAppHandler);
})();
