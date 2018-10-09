'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFields = Array.from(form.elements);

  function deactivateForm(startCoords) {
    form.classList.add('ad-form--disabled');
    formFields.forEach(function(item) {
      item.disabled = true;
    });
    form.address.value = startCoords.x + ', ' + startCoords.y;
  }
  function activateForm() {
    form.classList.remove('ad-form--disabled');
    formFields.forEach(function(item) {
      item.disabled = false;
    });
    form.address.readOnly = true;
  }
  function setAdresHandler(event) {
    form.address.value = event.coords.x + ', ' + event.coords.y;
  }



  document.addEventListener('endMove', setAdresHandler);

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    //setHandlers: setFormHandlers
  }
})();
