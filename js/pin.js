'use strict';

(function () {
  var endMove = new Event('endMove', {cancelable: true, bubbles: true});
  function setHandler(elem, containerSelector) {
    var container = elem.closest(containerSelector);
    elem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var coords = {
          x: elem.offsetLeft - shift.x,
          y: elem.offsetTop - shift.y
        }

        elem.style.top = coords.y + 'px';
        elem.style.left = coords.x + 'px';

        endMove.coords = {
          x: coords.x + (elem.offsetWidth / 2),
          y: coords.y - elem.offsetHeight
        };
        document.dispatchEvent(endMove);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  window.pin = {
    setHandler: setHandler
  }
})();
