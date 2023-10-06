import rain from './assets/water-outline.svg';
import sunup from './assets/sunrise.png';
import sundown from './assets/sunset.png';
import windIcon from './assets/wind.png';
import humidIcon from './assets/humidity.png';
import uvIcon from './assets/uv.png';
import { getScale } from './render.js';
import { getForecastWeatherMetric } from '../api-functions/metric.js';
import { getForecastWeatherImperial } from '../api-functions/imperial.js';

function renderCurrentWeather(currentWeather) {
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('current-weather-container');

  const currentWeatherImage = document.createElement('img');
  const imageUrl = `./weather-icons/${currentWeather.condition.icon.substring(
    35,
  )}`;
  currentWeatherImage.src = imageUrl;
  currentWeatherContainer.appendChild(currentWeatherImage);

  const currentWeatherText = document.createElement('div');
  currentWeatherText.classList.add('current-weather-text');
  const date = document.createElement('p');
  date.classList.add('date');
  date.innerText = currentWeather.date;
  currentWeatherText.appendChild(date);
  const location = document.createElement('p');
  location.classList.add('location');
  location.innerText = `${currentWeather.location}, ${currentWeather.country}`;
  currentWeatherText.appendChild(location);
  const weatherDetailsContainer = document.createElement('div');
  weatherDetailsContainer.classList.add('weather-details-container');
  const temperature = document.createElement('p');
  temperature.innerText = currentWeather.temp;
  weatherDetailsContainer.appendChild(temperature);
  const groupedDetails = document.createElement('div');
  const weatherConditionText = document.createElement('p');
  weatherConditionText.innerText = `${currentWeather.condition.text},`;
  groupedDetails.appendChild(weatherConditionText);
  const feelsLike = document.createElement('p');
  feelsLike.innerText = `Feels like ${currentWeather.feelsLike}`;
  groupedDetails.appendChild(feelsLike);
  weatherDetailsContainer.appendChild(groupedDetails);
  currentWeatherText.appendChild(weatherDetailsContainer);
  currentWeatherContainer.appendChild(currentWeatherText);

  return currentWeatherContainer;
}

function renderHourlyForecast(hourlyForecast) {
  const frame = document.createElement('div');
  frame.classList.add('frame');
  const track = document.createElement('div');
  track.classList.add('track');
  hourlyForecast.forEach((hour) => {
    const container = document.createElement('div');
    container.classList.add('container');
    const time = document.createElement('p');
    time.innerText = hour.time;
    container.appendChild(time);
    const condition = document.createElement('img');
    const imageUrl = `./weather-icons/${hour.conditon.icon.substring(35)}`;
    condition.src = imageUrl;
    container.appendChild(condition);
    const temp = document.createElement('p');
    temp.innerText = hour.temp;
    container.appendChild(temp);
    const chanceOfRain = document.createElement('div');
    chanceOfRain.classList.add('chance-of-rain');
    const raindrop = document.createElement('img');
    raindrop.classList.add('icon');
    raindrop.src = rain;
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

function renderFutureWeather(futureWeather) {
  const container = document.createElement('div');
  container.classList.add('future-weather-container');
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
    raindrop.classList.add('icon');
    raindrop.src = rain;
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
}

function renderAstroData(currentWeather) {
  const astroData = document.createElement('div');
  astroData.classList.add('astro-data');

  const { sunrise, sunset } = currentWeather;

  const rise = document.createElement('div');
  rise.classList.add('astro');
  const riseText = document.createElement('p');
  riseText.innerText = 'Sunrise';
  rise.appendChild(riseText);
  const riseTime = document.createElement('p');
  riseTime.innerText = sunrise;
  rise.appendChild(riseTime);
  const riseImage = document.createElement('img');
  riseImage.src = sunup;
  rise.appendChild(riseImage);
  astroData.appendChild(rise);

  const set = document.createElement('div');
  set.classList.add('astro');
  const setText = document.createElement('p');
  setText.innerText = 'Sunset';
  set.appendChild(setText);
  const setTime = document.createElement('p');
  setTime.innerText = sunset;
  set.appendChild(setTime);
  const setImage = document.createElement('img');
  setImage.src = sundown;
  set.appendChild(setImage);
  astroData.appendChild(set);

  return astroData;
}

function renderExtraData(currentWeather) {
  const extraData = document.createElement('div');
  extraData.classList.add('extra-data');

  const { humidity, uvIndex, wind } = currentWeather;

  const uv = document.createElement('div');
  uv.classList.add('extra');
  const uvImage = document.createElement('img');
  uvImage.src = uvIcon;
  uv.appendChild(uvImage);
  const uvText = document.createElement('p');
  uvText.innerText = 'UV Index';
  uv.appendChild(uvText);
  const uvVal = document.createElement('p');
  uvVal.innerText = uvIndex;
  uv.appendChild(uvVal);
  extraData.appendChild(uv);

  const humid = document.createElement('div');
  humid.classList.add('extra');
  humid.classList.add('middle');
  const humidImage = document.createElement('img');
  humidImage.src = humidIcon;
  humid.appendChild(humidImage);
  const humidText = document.createElement('p');
  humidText.innerText = 'Humidity';
  humid.appendChild(humidText);
  const humidVal = document.createElement('p');
  humidVal.innerText = humidity;
  humid.appendChild(humidVal);
  extraData.appendChild(humid);

  const windSpeed = document.createElement('div');
  windSpeed.classList.add('extra');
  const windImage = document.createElement('img');
  windImage.src = windIcon;
  windSpeed.appendChild(windImage);
  const windText = document.createElement('p');
  windText.innerText = 'Wind';
  windSpeed.appendChild(windText);
  const windVal = document.createElement('p');
  windVal.innerText = wind;
  windSpeed.appendChild(windVal);
  extraData.appendChild(windSpeed);

  return extraData;
}

function load() {
  return new Promise((resolve) => setTimeout(resolve, 750));
}

async function renderContent(location) {
  const body = document.querySelector('body');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  body.appendChild(loader);

  const currentDetails = document.querySelector('main');
  const scale = getScale();
  if (currentDetails) currentDetails.replaceChildren();
  const data =
    scale === 'metric'
      ? await getForecastWeatherMetric(location)
      : await getForecastWeatherImperial(location);

  await load();

  const main = document.createElement('main');
  if (data) {
    const { currentWeather, hourlyForecast, futureWeather } = data;
    const current = renderCurrentWeather(currentWeather);
    main.appendChild(current);
    const hourly = renderHourlyForecast(hourlyForecast);
    main.appendChild(hourly);
    const future = renderFutureWeather(futureWeather);
    main.appendChild(future);
    const extra = renderExtraData(currentWeather);
    main.appendChild(extra);
    const astro = renderAstroData(currentWeather);
    main.appendChild(astro);
    if (currentDetails) {
      body.replaceChild(main, currentDetails);
    } else {
      body.appendChild(main);
    }
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.innerText =
      'Possible issues: Invalid location, server down, network error.';

    const currentDetails = document.querySelector('main');
    if (currentDetails) {
      currentDetails.replaceChildren();
      currentDetails.appendChild(errorMessage);
    } else {
      main.appendChild(errorMessage);
      body.appendChild(main);
    }
  }
  body.removeChild(loader);
}

export { renderContent };
