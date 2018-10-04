'use strict';
// запрос на сервер
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  function createXHR(url, onLoad, onError, data) {
    var data = data || null;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;
    xhr.open('GET', url);
    xhr.send(data);
  }

  // Функция получения данных с сервера (метод GET)
  function download(onLoad, onError) {
    createXHR(URL_GET, onLoad, onError);
  }

  // Функция отправки данных на сервер (метод POST)
  function upload(data, onLoad, onError) {
    createXHR(URL_POST, onLoad, onError, data);
  }

  window.backend = {
    download: download,
    upload: upload
  };
})();
