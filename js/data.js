'use strict';

(function () {
  window.data = {
    titles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    accommodation: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    checkin: [
      '12:00',
      '13:00',
      '14:00'
    ],
    checkout: [
      '12:00',
      '13:00',
      '14:00'
    ],
    facilities: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
    ],
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
