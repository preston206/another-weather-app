const fetch = require('node-fetch');

const fetchCurrent = city => {
  return fetch(`http://localhost:8080/current/${city}`)
};

const fetchForecast = city => {
  return fetch(`http://localhost:8080/forecast/${city}`)
};

test('get current weather', () => {
  expect.assertions(1);
  return fetchCurrent('orlando').then(data => expect(data).toBeDefined());
});

test('get five day forecast', () => {
  expect.assertions(1);
  return fetchForecast('dallas').then(data => expect(data).toBeDefined());
});