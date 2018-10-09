'use strict';
(function() {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters');
  var filters;

  var mainPinStartCoords = {
    x: parseInt(mainPin.style.left),
    y: parseInt(mainPin.style.top)
  }

  function loadDataHadler(data) {
    mainPin.addEventListener('mouseup', activePageHandler);

    if (filters) {
      filters.enable(window.data.get());
    }
  }

  function blockedPage() {
    map.classList.add('map--faded');
    window.form.deactivate(mainPinStartCoords);
    mainPin.style.left = mainPinStartCoords.x + 'px';
    mainPin.style.top = mainPinStartCoords.y + 'px';
  }
  function unBlockedPage() {
    map.classList.remove('map--faded');
    window.form.activate();
  }

  function activePageHandler(event) {
    event.preventDefault()
    unBlockedPage();
    window.map.renderPins(window.data.get());
    mainPin.removeEventListener('mouseup', activePageHandler);
  }

  function filterHandler(event) {
      window.app.debounce(function () {
        window.map.renderPins(event.filtrateData);
      });
  }

  function initFilters() {
    filters = window.filters(filtersContainer);
    filters.disable();
    document.addEventListener('onFilterate', filterHandler);
  }

  function initAppHandler() {
    console.log('DOM Create');
    blockedPage();
    initFilters();
    mainPin.addEventListener('mousedup', activePageHandler);
    window.pin.setHandler(mainPin, '.map__pins');
    document.addEventListener('loadData', loadDataHadler);
  }

  document.addEventListener('DOMContentLoaded', initAppHandler);
})();
