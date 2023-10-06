import { getScale } from './render.js';
import { setScale } from './render.js';
import search from './assets/search.svg';
import { renderContent } from './content.js';
let currentLocation = 'Harare';

function renderSearchBar() {
  const searchBarContainer = document.createElement('form');
  searchBarContainer.classList.add('search-bar');

  const input = document.createElement('input');
  input.placeholder = 'Search City or Country';
  input.value = 'Harare';
  input.required = true;
  searchBarContainer.appendChild(input);

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.addEventListener('click', (event) => {
    if (input.value === '') return;
    event.preventDefault();
    currentLocation = input.value;
    renderContent(input.value);
  });

  const searchIcon = document.createElement('img');
  searchIcon.src = search;
  searchButton.appendChild(searchIcon);

  searchBarContainer.appendChild(searchButton);
  return searchBarContainer;
}

function renderScaleButtons() {
  const scaleButtonContainer = document.createElement('div');
  scaleButtonContainer.classList.add('scale-button-container');
  const metricButton = document.createElement('button');
  metricButton.innerText = '°C - km/h';
  metricButton.classList.add('active');
  scaleButtonContainer.appendChild(metricButton);
  const imperialButton = document.createElement('button');
  imperialButton.innerText = '°F - mph';

  const buttons = [metricButton, imperialButton];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const scale = getScale();
      if (button === metricButton && scale !== 'metric') {
        setScale('metric');
        metricButton.classList.add('active');
        imperialButton.classList.remove('active');
        renderContent(currentLocation);
      } else if (button === imperialButton && scale !== 'imperial') {
        setScale('imperial');
        imperialButton.classList.add('active');
        metricButton.classList.remove('active');
        renderContent(currentLocation);
      }
    });
  });

  scaleButtonContainer.appendChild(imperialButton);
  return scaleButtonContainer;
}

function renderHeader() {
  const body = document.querySelector('body');
  const header = document.createElement('header');
  const searchBar = renderSearchBar();
  header.appendChild(searchBar);
  const scaleButtons = renderScaleButtons();
  header.appendChild(scaleButtons);
  body.appendChild(header);
}
function renderFooter() {
  const body = document.querySelector('body');
  const footer = document.createElement('footer');
  footer.innerHTML =
    'Made by <a href="https://github.com/Ngonidzashe-Zvenyika">Ngonidzashe Zvenyika</a> | Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>';
  body.appendChild(footer);
}

export { renderHeader, renderFooter };
