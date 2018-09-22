'use strict';

var currentCard = null;
var pinsContainer = document.querySelector('.map__pins');
var ESC_KEYCODE = 27;

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
