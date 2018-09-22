'use strict';

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
  offers.push(window.data.createAdvertisement(i, pinsContainer));
}
