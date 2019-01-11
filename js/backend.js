'use strict';
(function () {
  var constants = window.constants;
  var URLForLoad = 'https://js.dump.academy/keksobooking/data';
  var URLForSave = 'https://js.dump.academy/keksobooking';

  var createHttpRequest = function (
      URL,
      method,
      onLoadCallback,
      onErrorCallback,
      data
  ) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === constants.BACKEND.STATUS_200) {
        onLoadCallback(xhr.response);
      } else {
        onErrorCallback('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onErrorCallback('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onErrorCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = constants.BACKEND.TIMEOUT;
    xhr.open(method, URL);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      createHttpRequest(URLForLoad, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      createHttpRequest(URLForSave, 'POST', onLoad, onError, data);
    },
    response: []
  };
})();
