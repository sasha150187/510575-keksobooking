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

  window.backend.download(sucsessDataHandler);
  window.data = {
    get: getData
  };
})();
