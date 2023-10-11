import rainIcon from './assets/water-outline.svg';
import sunriseIcon from './assets/sunrise.png';
import sunsetIcon from './assets/sunset.png';
import windIcon from './assets/wind.png';
import humidityIcon from './assets/humidity.png';
import uvIcon from './assets/uv.png';
import { getScale } from './render.js';
import { getForecastWeatherMetric } from '../api-functions/metric.js';
import { getForecastWeatherImperial } from '../api-functions/imperial.js';

// This function renders components to display the current weather information;
function renderCurrentWeather(currentWeather) {
  const container = document.createElement('div');
  container.classList.add('current-weather');

  const image = document.createElement('img');
  const imageUrl = `./weather-icons/${currentWeather.condition.icon.substring(
    35,
  )}`;
  image.src = imageUrl;
  container.appendChild(image);

  const textContainer = document.createElement('div');

  const date = document.createElement('p');
  date.classList.add('date');
  date.innerText = currentWeather.date;
  textContainer.appendChild(date);

  const location = document.createElement('p');
  location.classList.add('location');
  location.innerText = `${currentWeather.location}, ${currentWeather.country}`;
  textContainer.appendChild(location);

  const details = document.createElement('div');
  details.classList.add('details');

  const temp = document.createElement('p');
  temp.innerText = currentWeather.temp;
  details.appendChild(temp);

  const detailGroup = document.createElement('div');

  const condition = document.createElement('p');
  condition.innerText = `${currentWeather.condition.text},`;
  detailGroup.appendChild(condition);

  const feelsLike = document.createElement('p');
  feelsLike.innerText = `Feels like ${currentWeather.feelsLike}`;
  detailGroup.appendChild(feelsLike);

  details.appendChild(detailGroup);

  textContainer.appendChild(details);

  container.appendChild(textContainer);
  return container;
}

// This function renders components to display the 24 hour forecast information;
function renderHourlyForecast(hourlyForecast) {
  const frame = document.createElement('div');
  frame.classList.add('frame');

  const track = document.createElement('div');
  track.classList.add('track');

  hourlyForecast.forEach((hour) => {
    const container = document.createElement('div');
    container.classList.add('hour');

    const time = document.createElement('p');
    time.innerText = hour.time;
    container.appendChild(time);

    const condition = document.createElement('img');
    condition.classList.add('condition');
    const imageUrl = `./weather-icons/${hour.conditon.icon.substring(35)}`;
    condition.src = imageUrl;
    container.appendChild(condition);

    const temp = document.createElement('p');
    temp.innerText = hour.temp;
    container.appendChild(temp);

    const chanceOfRain = document.createElement('div');
    chanceOfRain.classList.add('chance-of-rain');

    const raindrop = document.createElement('img');
    raindrop.classList.add('rain-drop');
    raindrop.src = rainIcon;
    chanceOfRain.appendChild(raindrop);

    const raintext = document.createElement('p');
    raintext.innerText = hour.chanceOfRain;
    chanceOfRain.appendChild(raintext);

    container.appendChild(chanceOfRain);

    track.appendChild(container);
  });

  frame.appendChild(track);
  return frame;
}

// This function renders components to display the daily forecast over the next three days;
function renderFutureWeather(futureWeather) {
  const container = document.createElement('div');
  container.classList.add('future-weather');

  futureWeather.forEach((day) => {
    const forecast = document.createElement('div');
    forecast.classList.add('day');

    const dayAndImage = document.createElement('div');
    dayAndImage.classList.add('day-and-image');

    const condition = document.createElement('img');
    const imageUrl = `./weather-icons/${day.condition.icon.substring(35)}`;
    condition.src = imageUrl;
    dayAndImage.appendChild(condition);

    const dayOfWeek = document.createElement('p');
    dayOfWeek.innerText = day.dayOfWeek;
    dayAndImage.appendChild(dayOfWeek);

    forecast.appendChild(dayAndImage);

    const chanceOfRain = document.createElement('div');
    chanceOfRain.classList.add('chance-of-rain');

    const raindrop = document.createElement('img');
    raindrop.classList.add('rain-drop');
    raindrop.src = rainIcon;
    chanceOfRain.appendChild(raindrop);

    const raintext = document.createElement('p');
    raintext.innerText = day.chanceOfRain;
    chanceOfRain.appendChild(raintext);

    forecast.appendChild(chanceOfRain);

    const temp = document.createElement('p');
    temp.innerText = `${day.maxTemp} / ${day.minTemp}`;
    forecast.appendChild(temp);

    container.appendChild(forecast);
  });

  return container;
} // This function renders components to display additional information that is related to the current weather;
function renderExtraData(currentWeather) {
  const container = document.createElement('div');
  container.classList.add('extra-data');

  const { humidity, uvIndex, wind } = currentWeather;

  const uv = document.createElement('div');
  uv.classList.add('container');
  const uvImage = document.createElement('img');
  uvImage.src = uvIcon;
  uv.appendChild(uvImage);
  const uvText = document.createElement('p');
  uvText.innerText = 'UV Index';
  uv.appendChild(uvText);
  const uvValue = document.createElement('p');
  uvValue.innerText = uvIndex;
  uv.appendChild(uvValue);
  container.appendChild(uv);

  const humidityReading = document.createElement('div');
  humidityReading.classList.add('container');
  const humidityImage = document.createElement('img');
  humidityImage.src = humidityIcon;
  humidityReading.appendChild(humidityImage);
  const humidityText = document.createElement('p');
  humidityText.innerText = 'Humidity';
  humidityReading.appendChild(humidityText);
  const humidityValue = document.createElement('p');
  humidityValue.innerText = humidity;
  humidityReading.appendChild(humidityValue);
  container.appendChild(humidityReading);

  const windSpeed = document.createElement('div');
  windSpeed.classList.add('container');
  const windImage = document.createElement('img');
  windImage.src = windIcon;
  windSpeed.appendChild(windImage);
  const windText = document.createElement('p');
  windText.innerText = 'Wind';
  windSpeed.appendChild(windText);
  const windValue = document.createElement('p');
  windValue.innerText = wind;
  windSpeed.appendChild(windValue);
  container.appendChild(windSpeed);

  return container;
}

// This function renders components to display the sunset and sunrise times;
function renderAstroData(currentWeather) {
  const container = document.createElement('div');
  container.classList.add('astro-data');

  const { sunrise, sunset } = currentWeather;

  const rise = document.createElement('div');
  rise.classList.add('container');
  const riseText = document.createElement('p');
  riseText.innerText = 'Sunrise';
  rise.appendChild(riseText);
  const riseTime = document.createElement('p');
  riseTime.innerText = sunrise;
  rise.appendChild(riseTime);
  const riseImage = document.createElement('img');
  riseImage.src = sunriseIcon;
  rise.appendChild(riseImage);
  container.appendChild(rise);

  const set = document.createElement('div');
  set.classList.add('container');
  const setText = document.createElement('p');
  setText.innerText = 'Sunset';
  set.appendChild(setText);
  const setTime = document.createElement('p');
  setTime.innerText = sunset;
  set.appendChild(setTime);
  const setImage = document.createElement('img');
  setImage.src = sunsetIcon;
  set.appendChild(setImage);
  container.appendChild(set);

  return container;
}

// This function renders an error message to display if the data cannot be fetched from the api;
function renderErrorMessage() {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error');
  errorMessage.innerText =
    'Possible issues: Invalid location, server down, network error.';
  return errorMessage;
}

// This function delays the exuction of the renderContent function so that the loading animation is displayed for a reasonable amount of time;
function load() {
  return new Promise((resolve) => setTimeout(resolve, 750));
}

// This function attempts to fetch data from the weather api by calling one of the 'getForecast' functions, upon success it renders the recieved data, upon failure it displays an error message;
async function renderContent(location) {
  const body = document.querySelector('body');

  body.style.pointerEvents = 'none';
  const loader = document.createElement('div');
  loader.classList.add('loader');
  body.appendChild(loader);

  const currentContent = document.querySelector('main');
  if (currentContent) currentContent.replaceChildren();

  const scale = getScale();

  const data =
    scale === 'metric'
      ? await getForecastWeatherMetric(location)
      : await getForecastWeatherImperial(location);

  await load();

  const main = document.createElement('main');

  if (data) {
    const { currentWeather, hourlyForecast, futureWeather } = data;
    main.appendChild(renderCurrentWeather(currentWeather));
    main.appendChild(renderHourlyForecast(hourlyForecast));
    main.appendChild(renderFutureWeather(futureWeather));
    main.appendChild(renderExtraData(currentWeather));
    main.appendChild(renderAstroData(currentWeather));
    currentContent
      ? body.replaceChild(main, currentContent)
      : body.appendChild(main);
  } else {
    if (currentContent) {
      currentContent.appendChild(renderErrorMessage());
    } else {
      main.appendChild(renderErrorMessage());
      body.appendChild(main);
    }
  }

  body.removeChild(loader);
  body.style.pointerEvents = 'auto';
}

export { renderContent };
