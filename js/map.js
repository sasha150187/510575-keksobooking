'use strict';

var ESC_KEYCODE = 27;

var yRange = {min: 130, max: 630};
var pinSize = {width: 50, height: 70};
var container = document.querySelector('.map__pins');
var card = document.querySelector('#card').content.querySelector('.map__card');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsContainer = document.querySelector('.map__pins');
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var accommodation = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkin = [
  '12:00',
  '13:00',
  '14:00'
];

var checkout = [
  '12:00',
  '13:00',
  '14:00'
];

var facilities = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];


var map = document.querySelector('.map');
var currentCard = null;
var activePin = null;
// 1 фу-я создает массив avatar (author: {avatar:)
function createUser(i) {
  return {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };
}
// 2 фу-я создает массив offer
function createRealty(i, coords) {
  return {
    title: titles[i],
    address: coords.join(', '),
    price: getRandomNumber(1000, 1000000),
    type: accommodation[getRandomNumber(0, 3)],
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 7),
    checkin: checkin[getRandomNumber(0, 2)],
    checkout: checkout[getRandomNumber(0, 2)],
    features: facilities.slice(0, getRandomNumber(0, 5)),
    description: '',
    photos: photos.sort(function () {
      return 0.5 - Math.random();
    })
  };
}
// 3 фу-я создает координаты, массив location
function createCoords(box) {

  return {
    x: getRandomNumber(box.offsetLeft, box.offsetWidth),
    y: getRandomNumber(yRange.min, yRange.max)
  };
}
// 4 функия создает один из 8(i) объектов внутри массива(#card)
function createAdvertisement(i, box) {
  var advertisement = {};
  advertisement.author = createUser(i);
  advertisement.location = createCoords(box);
  var coordinate = [advertisement.location.x, advertisement.location.y];
  advertisement.offer = createRealty(i, coordinate);

  return advertisement;
}
// 5 фу-я создает один из пинов, который мы будем видеть на карте как объявление жилья
function createPin(offer) {
  var clonePin = pin.cloneNode(true);
  clonePin.querySelector('img').src = offer.author.avatar;
  clonePin.querySelector('img').alt = offer.offer.title;
  clonePin.style.left = offer.location.x - pinSize.width / 2 + 'px';
  clonePin.style.top = offer.location.y + pinSize.height + 'px';
  clonePin.addEventListener('click', function () {
    if (currentCard) {
      currentCard.remove();
    }
    currentCard = createCard(offer);
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    activePin = clonePin;
    activePin.classList.add('map__pin--active');
    map.lastElementChild.insertAdjacentElement('beforeBegin', currentCard);
  });

  return clonePin;
}
// 6 фу-я создает одну из карт объявления
function createCard(offers) { // в ед. числе
  var cloneCard = card.cloneNode(true);
  cloneCard.querySelector('img').src = offers.author.avatar;
  cloneCard.querySelector('.popup__title').textContent = offers.offer.title;
  cloneCard.querySelector('.popup__text--address').textContent = offers.offer.address;
  cloneCard.querySelector('.popup__text--price').textContent = offers.offer.price + ' ₽/ночь';
  cloneCard.querySelector('.popup__type').textContent = offers.offer.type;
  cloneCard.querySelector('.popup__text--capacity').textContent = offers.offer.rooms + ' комнаты для ' + offers.offer.guests + ' гостей';
  cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers.offer.checkin + ', выезд до' + offers.offer.checkout;
  cloneCard.querySelector('.popup__description').textContent = offers.offer.description;
  // создадим блок features
  var features = cloneCard.querySelector('.popup__features');
  features.innerHTML = '';
  offers.offer.features.forEach(function (item) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + item);
    features.appendChild(newElement);
  });
  // создадим внутри блока(.popup__photos) нужное количество img
  var blockForPhoto = cloneCard.querySelector('.popup__photos');
  blockForPhoto.innerHTML = '';
  offers.offer.photos.forEach(function (item) {
    var newElement = document.createElement('img');
    newElement.src = item;
    newElement.style.width = '45px';
    newElement.style.height = '45px';
    newElement.classList.add('popup__photo');
    newElement.alt = 'Фотография жилья';
    blockForPhoto.appendChild(newElement);
  });
  // добавим обработчики события для карточки-объявления
  var closeButton = cloneCard.querySelector('.popup__close');
  closeButton.addEventListener('click', function (event) {
    event.preventDefault();
    closeCard();
  });
  document.addEventListener('keydown', escPressHandler);

  return cloneCard;
}

function closeCard() {
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  currentCard.remove();
  document.removeEventListener('keydown', escPressHandler);
}

function escPressHandler(event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeCard();
  }
}
// цикл создающий массив из 8 объектов
var offers = [];
for (var i = 0; i < 8; i++) {
  offers.push(createAdvertisement(i, pinsContainer));
}

function renderPins(offersData) {
  var fragment = document.createDocumentFragment();
  offersData.forEach(function (offer) {
    pin = createPin(offer);
    fragment.appendChild(pin);
  });
  pinsContainer.appendChild(fragment);
}
// Лекция номер 4:
// активация страницы
var mapPinButton = document.querySelector('.map__pin--main');
mapPinButton.addEventListener('mouseup', function () {
  var mapFade = document.querySelector('.map');
  mapFade.classList.remove('map--faded');
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  var input = document.querySelector('#address');
  input.setAttribute('value', redMuffinCords.join());
  renderPins(offers);
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
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
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
// количество гостей в комнтате
// var roomNumber = document.querySelector('#room_number');

// roomNumber.addEventListener('change', function (evt) {
//   var currentValue = evt.currentTarget.value;
// });

// var roomNumberChangeHandler = function (evt) {
//   console.log(evt);
// };
