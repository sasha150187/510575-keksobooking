'use strict';



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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getPrice = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
// 1 фу-я
function createUser(i) {
  return {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  }
}
// 2 фу-я
function createRealty(i, coords) {
  return {
    title: titles[i],
    address: coords.join(', '),
    price: getPrice(1000, 1000000),
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
// 3 фу-я
function createCoords(container) {
  var yRange = {
    min: 130,
    max: 630
  }

  return {
    x: getRandomNumber(container.offsetLeft, container.offsetWidth),
    y: getRandomNumber(yRange.min, yRange.max)
  }
}
// 4 функия
function createAds(i, container) {
  var ads = {};

  ads.author = createUser(i);
  ads.location = createCoords(container);
  var cords = [ads.location.x, ads.location.y];
  ads.offer = createRealty(i, cords);

  return ads;
}
// 5 фу-я
function createPin(offer) {
  var pinSize = {
        width: 50,
        height: 70
      },
      container = document.querySelector('.map__pins'),
      template = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true),
      image = template.querySelector('img');

  template.style.left = offer.location.x - pinSize.width/2 + 'px';
  template.style.top = offer.location.y + pinSize.height + 'px';
  image.src = offer.author.avatar;
  image.alt = offer.offer.title;

  return template;
};

function createCard(unit) {
  var template = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true),
      user = template.querySelector('.popup__avatar'),
      photoImage = template.querySelector('.popup__photo'),
      photos = template.querySelector('.popup__photos'),
      capacity = template.querySelector('.popup__text--capacity'),
      time = template.querySelector('.popup__text--time'),
      selectorMap = {
        'title': '.popup__title',
        'price': '.popup__text--price',
        'address': '.popup__text--address',
        'price': '.popup__text--price',
        'type': '.popup__type',
        'features': '.popup__features',
        'description': '.popup__description'
      };

  user.src = unit.author.avatar;

  photos.innerHTML = '';
  unit.offer.photos.forEach(function(src, i) {
    var photo = photoImage.cloneNode(true);
    photo.src = src;
    photos.appendChild(photo)
  });

  capacity.innerHTML = unit.offer.rooms + ' комнаты для ' + unit.offer.guests + ' гостей';
  time.innerHTML = 'Заезд после ' + unit.offer.checkin + ', выезд до' + unit.offer.checkout;

  Object.keys(selectorMap).forEach(function(key) {
      var element = template.querySelector(selectorMap[key]);
      element.innerHTML = key === 'features' ?  unit.offer[key].join(', ') : unit.offer[key];

      if (key === 'price') {
        element.innerHTML +='₽/ночь';
      }
  });

  return template;
};

function getFragment(offers, create) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var el = create(offers[i]);
    fragment.appendChild(el);
  }

  return fragment;
}

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

var pinsContainer = document.querySelector('.map__pins');
var offers = [];
for (var i = 0; i < 8; i++) {
  offers.push(createAds(i, pinsContainer));
}

var pinsElements = getFragment(offers, createPin);
var cardsElements = getFragment(offers, createCard);

pinsContainer.appendChild(pinsElements);
insertAfter(cardsElements, pinsContainer);
