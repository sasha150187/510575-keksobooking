'use strict';
// запрос на сервер
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_GET);

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        onError(xhr.statusText);
      } else {
        onLoad(xhr.response);
      }
    });

    xhr.send();
  };

  window.post = function (formdata, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', URL_POST, true);

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        onError(xhr.statusText);
      } else {
        onLoad(xhr.response);
      }
    });

    xhr.send(formdata);
  };
})();
