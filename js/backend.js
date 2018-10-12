'use strict';
// запрос на сервер
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobookin';
  var OK_STATUS = 200;

  function createXHR(url, method, onLoad, onError, data) {
    data = data || null;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
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
    xhr.open(method, url);
    xhr.send(data);
  }

  // Функция получения данных с сервера (метод GET)
  function download(onLoad, onError) {
    createXHR(URL_GET, 'GET', onLoad, onError);
  }

  // Функция отправки данных на сервер (метод POST)
  function upload(data, onLoad, onError) {
    createXHR(URL_POST, 'POST', onLoad, onError, data);
  }

  window.backend = {
    download: download,
    upload: upload
  };
})();
