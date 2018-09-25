'use strict';

(function () {
  var yRange = {min: 130, max: 630};
  var container = document.querySelector('.map__pins');  
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
  function createCoords (box) {

    return {
      x: getRandomNumber(box.offsetLeft, box.offsetWidth),
      y: getRandomNumber(yRange.min, yRange.max);
    }
  }
  // 4 функия создает один из 8(i) объектов внутри массива(#card)
  function createAdvertisement (i, container) {
    var advertisement = {};
    advertisement.author = createUser(i); // author
    advertisement.location = createCoords(container);
    var coordinate = [advertisement.location.x, advertisement.location.y];
    advertisement.offer = createRealty(i, coordinate);

    return advertisement;
  }

  function createOffers(n) {
    return Array.apply(null, {length: n}).map(Number.call, Number).map(function (i) {
      return createAdvertisement(i, pinsContainer);
    });
  }

  window.data = {
    get: createOffers
  };
})();
