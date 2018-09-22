'use strict';

var card = document.querySelector('#card').content.querySelector('.map__card');

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
