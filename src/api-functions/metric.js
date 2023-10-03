import { format, parseISO } from 'date-fns';

function formatDate(date) {
  if (date.length < 16) {
    let substringOne = date.substring(0, 11);
    substringOne += 0;
    const substringTwo = date.substring(11);
    date = substringOne + substringTwo;
  }
  return format(parseISO(date), 'EE, HH:mm');
}

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

function extractCurrentWeather(data, today) {
  const currentWeather = {
    date: formatDate(data.location.localtime),
    location: data.location.name,
    country: data.location.country,
    condition: data.current.condition,
    feelsLike: `${data.current.feelslike_c}°`,
    humidity: `${data.current.humidity}%`,
    temp: `${data.current.temp_c}°`,
    uvIndex: determineUvIndex(data.current.uv),
    wind: `${data.current.wind_kph} km/h`,
    sunrise: today.astro.sunrise,
    sunset: today.astro.sunset,
    minTemp: `${today.day.mintemp_c}°`,
    maxTemp: `${today.day.maxtemp_c}°`,
  };
  return currentWeather;
}

function determineCurrentHour(date) {
  if (date.length < 16) {
    let substringOne = date.substring(0, 11);
    substringOne += 0;
    const substringTwo = date.substring(11);
    date = substringOne + substringTwo;
  }
  return format(parseISO(date), 'H');
}

function determineHourlyForecast(data, today, tomorrow) {
  const currentHour = determineCurrentHour(data.location.localtime);
  const hourlyForecast = [];
  today.hour.forEach((hour, index) => {
    if (index >= currentHour) {
      hourlyForecast.push({
        chanceOfRain: `${hour.chance_of_rain}%`,
        conditon: hour.condition,
        feelsLike: `${hour.feelslike_c}°`,
        time: format(parseISO(hour.time), 'HH:mm'),
        temp: `${hour.temp_c}°`,
        wind: `${hour.wind_kph} km/h`,
      });
    }
  });
  if (hourlyForecast.length < 24) {
    tomorrow.hour.forEach((hour, index) => {
      if (index < currentHour) {
        hourlyForecast.push({
          chanceOfRain: `${hour.chance_of_rain}%`,
          conditon: hour.condition,
          feelsLike: `${hour.feelslike_c}°`,
          time: format(parseISO(hour.time), 'HH:mm'),
          temp: `${hour.temp_c}°`,
          wind: `${hour.wind_kph} km/h`,
        });
      }
    });
  }
  return hourlyForecast;
}

function extractFutureWeather(forecast) {
  const futureWeather = [];
  forecast.forEach((day, index) => {
    let dayOfWeek;
    if (index === 0) {
      dayOfWeek = 'Today';
    } else {
      dayOfWeek = format(parseISO(day.date), 'EEEE');
    }
    futureWeather.push({
      condition: day.day.condition,
      chanceOfRain: `${day.day.daily_chance_of_rain}%`,
      minTemp: `${day.day.mintemp_c}°`,
      maxTemp: `${day.day.maxtemp_c}°`,
      dayOfWeek,
    });
  });
  return futureWeather;
}

async function getForecastWeatherMetric(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5cf3e1125d03451099393026232909&q=${location}&days=3`,
      { mode: 'cors' },
    );
    const data = await response.json();
    const today = data.forecast.forecastday[0];
    const tomorrow = data.forecast.forecastday[1];
    const currentWeather = extractCurrentWeather(data, today);
    const hourlyForecast = determineHourlyForecast(data, today, tomorrow);
    const futureWeather = extractFutureWeather(data.forecast.forecastday);
    return { currentWeather, hourlyForecast, futureWeather };
  } catch (error) {
    console.log('Invalid Location / Server Down');
  }
}

export { getForecastWeatherMetric };
