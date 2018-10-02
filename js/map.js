'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var currentCard = null;
  var activePin = null;
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');
  var pinSize = {width: 50, height: 70};
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

  window.map = {
    renderPins: function (offersData) {
      var fragment = document.createDocumentFragment();
      offersData.forEach(function (offer) {
        pin = createPin(offer);
        fragment.appendChild(pin);
      });
      pinsContainer.appendChild(fragment);
    }
  };

})();
