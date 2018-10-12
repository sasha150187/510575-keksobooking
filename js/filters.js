'use strict';

(function () {

  var form;
  var formFields;
  var currentFilters = {};
  var data = [];

  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;

  var filterEvent = new Event('onFilterate', {cancelable: true, bubbles: true});

  function changeHandler(event) {
    event.stopPropagation();

    var isInput = event.target.nodeName.toLowerCase() === 'input',
      value = isNaN(event.target.value) ? event.target.value : parseInt(event.target.value, 10),
      name = isInput ? event.target.name : event.target.name.slice(event.target.name.indexOf('-') + 1);

    if (isInput) {
      if (currentFilters[name] && currentFilters[name].includes(value)) {
        var index = currentFilters[name].indexOf(value);
        currentFilters[name].splice(index, 1);

        if (!currentFilters[name].length) {
          delete currentFilters[name];
        }
      } else {
        currentFilters[name] = currentFilters[name] || [];
        currentFilters[name].push(value);
      }

    } else {
      currentFilters[name] = value;
    }

    var callbacks = Object.keys(currentFilters).map(getFilterCallback);

    filterEvent.filtrateData = data.filter(function (item) {
      return callbacks.every(function (cb) {
        return cb(item);
      });
    });

    document.dispatchEvent(filterEvent);
  }

  function getFilterCallback(name) {
    switch (name) {
      case 'price': return filterByPrice;
      case 'features': return filterByMultipleValue(name);
      default: return filterBySingleValue(name);
    }
  }

  function filterByPrice(item) {
    var result = true;

    if (currentFilters.price !== 'any') {
      switch (currentFilters.price) {
        case 'middle':
          result = item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
          break;
        case 'low':
          result = item.offer.price < MIN_PRICE;
          break;
        case 'high':
          result = item.offer.price > MAX_PRICE;
          break;
        default:
          break;
      }
    }

    return result;
  }

  function filterBySingleValue(name) {
    return function (dataItem) {
      return currentFilters[name] === 'any' || dataItem.offer[name] === currentFilters[name];
    }
  }

  function filterByMultipleValue(name) {
    return function (dataItem) {
      return (currentFilters[name] || []).every(function (value) {
        return dataItem.offer[name].includes(value);
      });
    };
  }

  function toggleFormState(disabled) {
    var method = disabled ? 'remove' : 'add';
    var listenerMethod;

    form.classList[method]('disabled');

    formFields.forEach(function(item) {
      item.disabled = disabled;
      listenerMethod = disabled ? 'removeEventListener' : 'addEventListener';
      item[listenerMethod]('change', changeHandler);
    });
  }

  function enable(initialData) {
    data = [].concat(initialData);
    toggleFormState(false);
  }

  function disable() {
    data = [];
    toggleFormState(true);
  }

  window.filters = function (filterForms) {

    form = filterForms;
    formFields = Array.from(filterForms.elements);

    return {
      enable: enable,
      disable: disable
    };
  };
})();
