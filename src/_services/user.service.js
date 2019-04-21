import { authHeader } from "../_helpers";

export const userService = {
  login,
  logout,
  getAll
};

function login(username, password) {

  var details = {
    username: 'groult_guigui@hotmail.com',
    password: 'abcd'
  }

  var formBody = []
  for (var property in details) {
    var encodedKey = encodeURIComponent(property)
    var encodedValue = encodeURIComponent(details[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  formBody = formBody.join('&');

  const requestOptions = {
    method: "POST",
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'cache-control': 'no-cache',
    'Postman-Token': '0e8e542a-022e-4094-a779-0d0b37f73fbe' },
    body: formBody
  };
  
  return fetch(`http://localhost:8080/students/api/login`, requestOptions)
    .then(response => {
      console.log(response);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
