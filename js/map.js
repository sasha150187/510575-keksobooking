'use strict'

var yRange = { min: 130, max: 630 };
var pinSize = { width: 50, height: 70 };
var container = document.querySelector('.map__pins');
var card = document.querySelector('#card').content.querySelector('.map__card');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsContainer = document.querySelector('.map__pins');
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
// 1 фу-я создает массив avatar (author: {avatar:)
function createUser(i) {
  return {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  }
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
    photos: photos.sort(function() {
       return 0.5 - Math.random();
    })
  }
}
// 3 фу-я создает координаты, массив location
function createCoords (container) {

  return {
    x: getRandomNumber(container.offsetLeft, container.offsetWidth),
    y: getRandomNumber(yRange.min, yRange.max)
  }
}
// 4 функия создает один из 8(i) объектов внутри массива(#card)
function createAdvertisement (i, container) {
  var advertisement = {};
  advertisement.author = createUser(i); // author
  advertisement.location = createCoords(container); //location или координаты
  var coordinate = [advertisement.location.x, advertisement.location.y];
  advertisement.offer = createRealty(i, coordinate);

  return advertisement;
};
// 5 фу-я создает один из пинов, который мы будем видеть на карте как объявление жилья
function createPin (offers) {
  var clonePin = pin.cloneNode(true);
  clonePin.querySelector('img').src = offers.author.avatar;
  clonePin.querySelector('img').alt = offers.offer.title;
  clonePin.style.left = offers.location.x - pinSize.width/2 + 'px';
  clonePin.style.top = offers.location.y + pinSize.height + 'px';
  clonePin.addEventListener ('click', function () {
    insertAfter(cardsElements, pinsContainer);
    clonePin.classList.add('map__pin--active');

  });

  return clonePin;
};
// 6 фу-я создает одну из карт объявления
function createCard (offers) {
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

var fragment = document.createDocumentFragment();

  for (var j = 0; j < 6; j++) {
  var newElement = document.createElement('li');
  newElement.className = 'popup__feature popup__feature--' + facilities[j];
  fragment.appendChild(newElement);
  };
  features.appendChild(fragment);
// создадим внутри блока(.popup__photos) нужное количество img
  var blockForPhoto = cloneCard.querySelector('.popup__photos');
  var img = cloneCard.querySelector('.popup__photos').querySelector('img');
  blockForPhoto.removeChild(img);

  var fragment = document.createDocumentFragment();

  for (var k = 0; k < 3; k++) {
  var newElement = document.createElement('img');
  newElement.src = photos[k];
  newElement.style.width = "45px";
  newElement.style.height = "45px";
  newElement.className = 'popup__photo';
  newElement.alt = 'Фотография жилья';
  fragment.appendChild(newElement);
  };

  blockForPhoto.appendChild(fragment);
// добавим обработчики события для карточки-объявления
  var closeButton = cloneCard.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    cloneCard.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      cloneCard.classList.add('hidden');
    };
});

  return cloneCard;
};

function getFragment (offers, create) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var element = create(offers[i]);
    fragment.appendChild(element);
  }

  return fragment;
}

function insertAfter (elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
};
// цикл создающий массив из 8 объектов
var offers = [];
for (var i = 0; i < 8; i++) {
  offers.push(createAdvertisement(i, pinsContainer));
}

var pinsElements = getFragment(offers, createPin);
var cardsElements = getFragment(offers, createCard);
// insertAfter(cardsElements, pinsContainer);




// Лекция номер 4:
// активация страницы перетягиванием метки
var mapPinButton = document.querySelector('.map__pin--main');
mapPinButton.addEventListener('mouseup', function () {
  var mapFade = document.querySelector('.map');
  mapFade.classList.remove('map--faded');
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  var input = document.querySelector('#address');
  input.setAttribute('value', redMuffinCords.join());
  pinsContainer.appendChild(pinsElements);
});
// получение координат метки(адреса)
var button = document.querySelector('button');
var pinCoordinate = { x: container.offsetWidth / 2, y: button.offsetTop + pinSize.height / 2 };
var redMuffinCords = [pinCoordinate.x, pinCoordinate.y];
