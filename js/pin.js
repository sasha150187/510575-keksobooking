'use strict';

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');
var activePin = null;

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

function renderPins(offersData) {
  var fragment = document.createDocumentFragment();
  offersData.forEach(function (offer) {
    pin = createPin(offer);
    fragment.appendChild(pin);
  });
  pinsContainer.appendChild(fragment);
}
