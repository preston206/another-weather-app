
// // //
// data flow: fetch current weather and forecast > extract data from results > manipulate data > display\insert data to UI
// // //

const getCurrentWeather = city => {
  fetch(`http://localhost:8080/current/${city}`)
    .then(res => res.json())
    .then(result => {

      // send the result (which is an object) to a function which will extract and return the data that we need to display to the user
      const currentWeatherObject = extractCurrentWeatherData(result);

      // send data to a function which will insert that data into the html elements
      return insertCurrentWeatherData(currentWeatherObject);

    })
    .catch(error => console.log(error));
};

const getFiveDayForecast = city => {
  fetch(`http://localhost:8080/forecast/${city}`)
    .then(res => res.json())
    .then(result => {

      // send the result (which is an array) to a function which will extract and return the weather forecast at 12pm for each day
      const fiveDayForecastArray = filterForFiveDayAtNoon(result);

      // send the 12pm forecasts to a function which will extract and return the data that we need to display to the user
      const fiveDayForecastObject = extractForecastData(fiveDayForecastArray);

      // send data to a function which will insert that data into the html elements
      return insertForecastData(fiveDayForecastObject);

    })
    .catch(error => console.log(error));
};

const filterForFiveDayAtNoon = array => {
  let forecast = array.filter(item => item.dt_txt.charAt(12) == "2");
  return forecast;
}

const extractCurrentWeatherData = object => {
  let condition, temp, humidity;
  for (i in object) {
    if (i == "weather") condition = object[i][0].description;
    if (i == "main") temp = Math.round(object[i].temp);
    if (i == "main") humidity = object[i].humidity;
  };

  return { condition, temp, humidity };
}

const extractForecastData = array => {
  let day1 = {}, day2 = {}, day3 = {}, day4 = {}, day5 = {};

  for (i in array) {
    if (i == 0) {
      day1.date = array[i].dt;
      day1.icon = array[i].weather[0].icon;
      day1.tempmax = array[i].main.temp_max;
      day1.tempmin = array[i].main.temp_min;
    }

    if (i == 1) {
      day2.date = array[i].dt;
      day2.icon = array[i].weather[0].icon;
      day2.tempmax = array[i].main.temp_max;
      day2.tempmin = array[i].main.temp_min;
    }

    if (i == 2) {
      day3.date = array[i].dt;
      day3.icon = array[i].weather[0].icon;
      day3.tempmax = array[i].main.temp_max;
      day3.tempmin = array[i].main.temp_min;
    }

    if (i == 3) {
      day4.date = array[i].dt;
      day4.icon = array[i].weather[0].icon;
      day4.tempmax = array[i].main.temp_max;
      day4.tempmin = array[i].main.temp_min;
    }

    if (i == 4) {
      day5.date = array[i].dt;
      day5.icon = array[i].weather[0].icon;
      day5.tempmax = array[i].main.temp_max;
      day5.tempmin = array[i].main.temp_min;
    }
  };

  return { day1, day2, day3, day4, day5 };
}

const capitalizeFirstLetters = string => {
  let getFirstLetter, removeFirstLetter, newString = "";
  const splitStringToArray = string.split(" ");

  for (i of splitStringToArray) {

    if (i == splitStringToArray[splitStringToArray.length - 1]) {
      getFirstLetter = i.charAt(0).toUpperCase();
      removeFirstLetter = i.slice(1);
    } else {
      getFirstLetter = i.charAt(0).toUpperCase();
      removeFirstLetter = i.slice(1) + " ";
    }

    newString += getFirstLetter + removeFirstLetter;
  }

  return newString;
};

const convertUnixTimeToMonthDate = unixTime => {
  const dateOfMonth = new Date(unixTime * 1000).getDate();
  const monthNumber = new Date(unixTime * 1000).getMonth();
  let month;

  switch (monthNumber) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      break;
  }
  return `${month} ${dateOfMonth}`;
};

const insertCurrentWeatherData = weather => {
  const currentWeatherTemp = document.getElementById('current-weather-temp');
  const currentWeatherFahr = document.getElementById('current-weather-fahr');
  const currentWeatherCondition = document.getElementById('current-weather-condition');
  const currentWeatherHumidity = document.getElementById('current-weather-humidity');

  // clear previous weather data
  currentWeatherTemp.innerHTML = "";
  currentWeatherFahr.innerHTML = "";
  currentWeatherCondition.innerHTML = "";
  currentWeatherHumidity.innerHTML = "";

  currentWeatherTemp.innerHTML += weather.temp;
  currentWeatherFahr.innerHTML += "&#176; F"
  currentWeatherCondition.innerHTML += capitalizeFirstLetters(weather.condition);
  currentWeatherHumidity.innerHTML += weather.humidity + "% Humidity";
}

const insertForecastData = forecast => {
  const day1date = document.getElementById('day-1-date');
  const day1icon = document.getElementById('day-1-icon');
  const day1max = document.getElementById('day-1-max');
  const day1min = document.getElementById('day-1-min');

  const day2date = document.getElementById('day-2-date');
  const day2icon = document.getElementById('day-2-icon');
  const day2max = document.getElementById('day-2-max');
  const day2min = document.getElementById('day-2-min');

  const day3date = document.getElementById('day-3-date');
  const day3icon = document.getElementById('day-3-icon');
  const day3max = document.getElementById('day-3-max');
  const day3min = document.getElementById('day-3-min');

  const day4date = document.getElementById('day-4-date');
  const day4icon = document.getElementById('day-4-icon');
  const day4max = document.getElementById('day-4-max');
  const day4min = document.getElementById('day-4-min');

  const day5date = document.getElementById('day-5-date');
  const day5icon = document.getElementById('day-5-icon');
  const day5max = document.getElementById('day-5-max');
  const day5min = document.getElementById('day-5-min');

  // clear previous weather data
  day1date.innerHTML = "";
  day1icon.innerHTML = "";
  day1max.innerHTML = "";
  day1min.innerHTML = "";
  day2date.innerHTML = "";
  day2icon.innerHTML = "";
  day2max.innerHTML = "";
  day2min.innerHTML = "";
  day3date.innerHTML = "";
  day3icon.innerHTML = "";
  day3max.innerHTML = "";
  day3min.innerHTML = "";
  day4date.innerHTML = "";
  day4icon.innerHTML = "";
  day4max.innerHTML = "";
  day4min.innerHTML = "";
  day5date.innerHTML = "";
  day5icon.innerHTML = "";
  day5max.innerHTML = "";
  day5min.innerHTML = "";

  day1date.innerHTML += convertUnixTimeToMonthDate(forecast.day1.date);
  day1icon.innerHTML += `<img src="http://openweathermap.org/img/w/${forecast.day1.icon}.png">`;
  day1max.innerHTML += Math.round(forecast.day1.tempmax);
  day1min.innerHTML += Math.round(forecast.day1.tempmin);

  day2date.innerHTML += convertUnixTimeToMonthDate(forecast.day2.date);
  day2icon.innerHTML += `<img src="http://openweathermap.org/img/w/${forecast.day2.icon}.png">`;
  day2max.innerHTML += Math.round(forecast.day2.tempmax);
  day2min.innerHTML += Math.round(forecast.day2.tempmin);

  day3date.innerHTML += convertUnixTimeToMonthDate(forecast.day3.date);
  day3icon.innerHTML += `<img src="http://openweathermap.org/img/w/${forecast.day3.icon}.png">`;
  day3max.innerHTML += Math.round(forecast.day3.tempmax);
  day3min.innerHTML += Math.round(forecast.day3.tempmin);

  day4date.innerHTML += convertUnixTimeToMonthDate(forecast.day4.date);
  day4icon.innerHTML += `<img src="http://openweathermap.org/img/w/${forecast.day4.icon}.png">`;
  day4max.innerHTML += Math.round(forecast.day4.tempmax);
  day4min.innerHTML += Math.round(forecast.day4.tempmin);

  day5date.innerHTML += convertUnixTimeToMonthDate(forecast.day5.date);
  day5icon.innerHTML += `<img src="http://openweathermap.org/img/w/${forecast.day5.icon}.png">`;
  day5max.innerHTML += Math.round(forecast.day5.tempmax);
  day5min.innerHTML += Math.round(forecast.day5.tempmin);
}

const clearInput = () => {
  document.getElementById('city-input').value = "";
}

const getWeather = event => {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  getCurrentWeather(city);
  getFiveDayForecast(city);
}

// unmute for testing
// module.exports = {
//   filterForFiveDayAtNoon,
//   extractCurrentWeatherData,
//   extractForecastData,
//   insertCurrentWeatherData,
//   insertForecastData
// };