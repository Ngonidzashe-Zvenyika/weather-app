import { format, parseISO } from 'date-fns';

// This function converts the time value of a given date so that it matches the format 00:00 if it arrives in the format 0:00, this is so that it can be manipulated by date-fns;
function convertTime(date) {
  let substringOne = date.substring(0, 11);
  substringOne += 0;
  const substringTwo = date.substring(11);
  date = substringOne + substringTwo;
  return date;
}

// This function uses date-fns to determine what day a certain date falls on and formats the day and time accordingly;
function formatDate(date) {
  if (date.length < 16) {
    date = convertTime(date);
  }
  return format(parseISO(date), 'EE, HH:mm');
}

// This function converts a numerical uv-index reading into a lexical estimation;
function determineUvIndex(uvIndex) {
  switch (true) {
    case uvIndex < 3:
      uvIndex = 'Low';
      break;
    case uvIndex < 6:
      uvIndex = 'Moderate';
      break;
    case uvIndex < 8:
      uvIndex = 'High';
      break;
    case uvIndex < 11:
      uvIndex = 'Very High';
      break;
    case uvIndex >= 11:
      uvIndex = 'Extremely High';
      break;
  }
  return uvIndex;
}

// This function extracts the relevant keys containing information about the current weather from the data or today objects and returns a single formatted object containing the information the application will use whilst disregarding all other data;
function extractCurrentWeather(data, today) {
  const currentWeather = {
    date: formatDate(data.location.localtime),
    location: data.location.name,
    country: data.location.country,
    condition: data.current.condition,
    feelsLike: `${Math.round(data.current.feelslike_f)}°`,
    humidity: `${data.current.humidity}%`,
    temp: `${Math.round(data.current.temp_f)}°`,
    uvIndex: determineUvIndex(data.current.uv),
    wind: `${Math.round(data.current.wind_mph)} mph`,
    sunrise: today.astro.sunrise,
    sunset: today.astro.sunset,
  };
  return currentWeather;
}

// This function uses date-fns to determine the current hour from the time value within a given date;
function determineCurrentHour(date) {
  if (date.length < 16) {
    date = convertTime(date);
  }
  return format(parseISO(date), 'H');
}

// This function extracts the relevant keys containing information about the hourly forecasts from the today or tomorrow objects (24hr period) and returns an array containing formatted objects that hold the information that the application will use whilst disregarding all other data;
function determineHourlyForecast(localTime, today, tomorrow) {
  const currentHour = determineCurrentHour(localTime);
  const hourlyForecast = [];
  today.hour.forEach((hour, index) => {
    if (index >= currentHour) {
      hourlyForecast.push({
        chanceOfRain: `${hour.chance_of_rain}%`,
        conditon: hour.condition,
        time: format(parseISO(hour.time), 'HH:mm'),
        temp: `${Math.round(hour.temp_f)}°`,
      });
    }
  });
  if (hourlyForecast.length < 24) {
    tomorrow.hour.forEach((hour, index) => {
      if (index < currentHour) {
        hourlyForecast.push({
          chanceOfRain: `${hour.chance_of_rain}%`,
          conditon: hour.condition,
          time: format(parseISO(hour.time), 'HH:mm'),
          temp: `${Math.round(hour.temp_f)}°`,
        });
      }
    });
  }
  return hourlyForecast;
}

// This function extracts the relevant keys from each index in the forecast array and returns an array containing formatted objects that hold the information the application will use whilst disregarding all other data;
function extractFutureWeather(forecast) {
  const futureWeather = [];
  forecast.forEach((period, index) => {
    let dayOfWeek;
    if (index === 0) {
      dayOfWeek = 'Today';
    } else {
      dayOfWeek = format(parseISO(period.date), 'EEEE');
    }
    futureWeather.push({
      condition: period.day.condition,
      chanceOfRain: `${period.day.daily_chance_of_rain}%`,
      minTemp: `${Math.round(period.day.mintemp_f)}°`,
      maxTemp: `${Math.round(period.day.maxtemp_f)}°`,
      dayOfWeek,
    });
  });
  return futureWeather;
}

// This function attempts to retrieve data from the weather api, upon success it processes the data and returns an object, upon failure it logs the error and does not return a value;
async function getForecastWeatherImperial(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5cf3e1125d03451099393026232909&q=${location}&days=3`,
      { mode: 'cors' },
    );
    const data = await response.json();
    const today = data.forecast.forecastday[0];
    const currentWeather = extractCurrentWeather(data, today);
    const localTime = data.location.localtime;
    const tomorrow = data.forecast.forecastday[1];
    const hourlyForecast = determineHourlyForecast(localTime, today, tomorrow);
    const futureWeather = extractFutureWeather(data.forecast.forecastday);
    return { currentWeather, hourlyForecast, futureWeather };
  } catch (error) {
    console.log(error);
  }
}

export { getForecastWeatherImperial };
