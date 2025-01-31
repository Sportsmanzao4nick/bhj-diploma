/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    let url = options.url;
    let formData = new FormData();
  
    if (options.data) {
      if (options.method === 'GET') {
        url += '?' + Object.entries(options.data).map(
          ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join('&');
      } else {
        Object.entries(options.data).forEach(pair => formData.append(...pair));
      }
    }
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        let err = null;
        let resp = null;
  
        if (xhr.status === 200) {
          const response = xhr.response;
  
          if (response?.success) {
            resp = response;
          } else {
            err = response;
          }
        } else {
          err = new Error('Ошибка соединения');
        }
  
        options.callback(err, resp);
      }
    };
  
    xhr.open(options.method, url);
    xhr.send(formData);
  };