'use strict';
(function () {
  var createHttpRequest = function (URL, method, onLoadCallback, onErrorCallback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000;
    xhr.open(method, URL);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      createHttpRequest(URL, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      createHttpRequest(URL, 'POST', onLoad, onError, data);
    }
  };
})();
