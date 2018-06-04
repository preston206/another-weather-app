const {
  filterForFiveDayAtNoon,
  extractCurrentWeatherData,
  extractForecastData,
  insertCurrentWeatherData,
  insertForecastData
} = require('../public/js/main');

// NOTE: un-comment exports in main.js before running tests

test('filterForFiveDayAtNoon function exists', () => {
  expect(filterForFiveDayAtNoon).toBeDefined();
});

test('insertCurrentWeatherData function exists', () => {
  expect(insertCurrentWeatherData).toBeDefined();
});

test('insertForecastData function exists', () => {
  expect(insertForecastData).toBeDefined();
});

test('function returns array containing five objects', () => {
  const data = [
    { dt_txt: "2018-05-07 12:00:00" },
    { dt_txt: "2018-05-08 12:00:00" },
    { dt_txt: "2018-05-09 09:00:00" },
    { dt_txt: "2018-05-09 12:00:00" },
    { dt_txt: "2018-05-10 12:00:00" },
    { dt_txt: "2018-05-11 10:00:00" },
    { dt_txt: "2018-05-11 12:00:00" },
    { dt_txt: "2018-05-12 03:00:00" },
    { dt_txt: "2018-05-12 06:00:00" }
  ];

  const testData = filterForFiveDayAtNoon(data);

  expect(testData).toHaveLength(5);
});

test('function returns object with property=condition and value=sunny', () => {
  const data = {
    wind: 52,
    weather: [{ dust: "low", description: "sunny" }],
    pollen: "low",
    main: { storm: "false", temp: 42, rain: "false", humidity: 44 }
  };

  const testData = extractCurrentWeatherData(data);

  expect(testData).toHaveProperty('condition', 'sunny');
})

test('function returns object containing five day forecast with min and max temp', () => {
  const data = [
    { wind: "false", main: { temp_min: 33, temp_max: 44 }, weather: [{ icon: "123" }], dt: 2343123 },
    { pollen: "high", main: { temp_min: 31, temp_max: 42 }, weather: [{ icon: "123" }], dt: 2343123 },
    { storm: "false", main: { temp_min: 36, temp_max: 48 }, weather: [{ icon: "123" }], dt: 2343123 },
    { dust: "true", main: { temp_min: 34, temp_max: 41 }, weather: [{ icon: "123" }], dt: 2343123 },
    { rain: "false", main: { temp_min: 39, temp_max: 40 }, weather: [{ icon: "123" }], dt: 2343123 }
  ];

  const testData = extractForecastData(data);

  expect(testData.day2).toHaveProperty('tempmax', 42);
});