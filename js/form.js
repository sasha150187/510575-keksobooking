'use strict';

(function () {
    var data = window.data.get(8);
  // активация страницы
    var pinSize = {width: 50, height: 70};
    var container = document.querySelector('.map__pins');

    var mapPinButton = document.querySelector('.map__pin--main');
    mapPinButton.addEventListener('mouseup', function () {
      var mapFade = document.querySelector('.map');
      mapFade.classList.remove('map--faded');
      var adForm = document.querySelector('.ad-form');
      adForm.classList.remove('ad-form--disabled');
      var input = document.querySelector('#address');
      input.setAttribute('value', redMuffinCords.join());
      window.map.renderPins(data);
    });
    // активация страницы перетягиванием метки
    var pinImgHandle = document.querySelector('.map__pin');

    pinImgHandle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinImgHandle.style.top = (pinImgHandle.offsetTop - shift.y) + 'px';
        pinImgHandle.style.left = (pinImgHandle.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (event) {
            event.preventDefault();
            pinImgHandle.removeEventListener('click', onClickPreventDefault);
          };
          pinImgHandle.addEventListener('click', onClickPreventDefault);
        }

      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });


    // получение координат метки(адреса)
    var button = document.querySelector('button');
    var pinCoordinate = {x: container.offsetWidth / 2, y: button.offsetTop + pinSize.height / 2};
    var redMuffinCords = [pinCoordinate.x, pinCoordinate.y];
    // лекция номер 4, часть 2. валидация формы
    // тип жилья
    var accommodationType = document.querySelector('#type');
    var inputPrice = document.querySelector('#price');
    var optionValue = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    accommodationType.addEventListener('change', function (evt) {
      var currentValue = evt.currentTarget.value;
      inputPrice.placeholder = optionValue[currentValue];
      inputPrice.min = optionValue[currentValue];
    });
    // заезд/выезд
    var timeIn = document.querySelector('#timein');
    var timeOut = document.querySelector('#timeout');

    timeIn.addEventListener('change', function (evt) {
      var currentValue = evt.currentTarget.value;
      timeOut.value = currentValue;
    });
})();
// количество гостей в комнтате
// var roomNumber = document.querySelector('#room_number');

// roomNumber.addEventListener('change', function (evt) {
//   var currentValue = evt.currentTarget.value;
// });

// var roomNumberChangeHandler = function (evt) {
//   console.log(evt);
// };
