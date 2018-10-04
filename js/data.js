'use strict';

(function () {
  var offers = null;

  var loadData = new Event('loadData', {cancelable: true, bubbles: true});

  function sucsessDataHandler(res) {
    offers = res;
    document.dispatchEvent(loadData);
  }

  function getData() {
    return offers;
  }

  function errorHandler() {
    // TODO
  }

  window.backend.download(sucsessDataHandler, errorHandler);
  window.data = {
    get: getData
  };
})();
