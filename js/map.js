'use strict';

// {
//   1. Как получить координаты(addres, location)
//   2. Как обратиться и записать координаты в цикле для генерации элементов
//  }

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

var offers = [];
for (var i = 0; i < 8; i++) {
  offers.push({
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: titles[i],
      address: '',
      price: getPrice(1000, 1000000),
      type: accommodation[getRandomNumber(0, 3)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 7),
      checkin: checkin[getRandomNumber(0, 2)],
      checkout: checkout[getRandomNumber(0, 2)],
      features: facilities.slice(0, getRandomNumber(0, 5)),
      description: '',
      photos: photos.sort()
    },
    location: {
      x: 600,
      y: 350
    }
  });
}
// метка на карте
var fragment = document.createDocumentFragment();
var adMark = document.querySelector('.map').children[0];
var template = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < 3; i++) {
  var element = template.cloneNode(true);
  element.innerHTML = '<img src="img/avatars/user0' + i + '.png" width="40" height="40" draggable="false" alt="titles[i]">';
};
adMark.appendChild(element);

for (var i = 0; i < 3; i++) {
  var newElement = document.createElement('button');
  fragment.appendChild(newElement);
}
adMark.appendChild(fragment);

// карточка объявления
var adCard = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  var cardElement = cardTemplate.cloneNode(true);

adCard.appendChild(cardElement);


var newCardElement = document.createElement('.map__card');
fragment.appendChild(newCardElement);
adCard.appendChild(fragment);
