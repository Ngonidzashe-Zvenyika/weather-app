import searchIcon from './assets/search.svg';
import { getScale } from './render.js';
import { setScale } from './render.js';
import { renderContent } from './content.js';

let currentLocation = 'Stellenbosch';

// This function renders the search bar as a form for input validation. It then listens for a valid submission event upon which it uses the input value to search for the weather at the desired location;
function renderSearchBar() {
  const searchBarContainer = document.createElement('form');
  searchBarContainer.classList.add('search-bar');

  const input = document.createElement('input');
  input.required = true;
  input.placeholder = 'Search City or Country';
  searchBarContainer.appendChild(input);

  const button = document.createElement('button');
  button.type = 'submit';
  button.addEventListener('click', (event) => {
    if (input.value !== '') {
      event.preventDefault();
      currentLocation = input.value;
      input.value = '';
      renderContent(currentLocation);
    }
  });

  const icon = document.createElement('img');
  icon.src = searchIcon;
  button.appendChild(icon);

  searchBarContainer.appendChild(button);

  return searchBarContainer;
}

// This function renders two buttons that allow any user to switch between the metric and imperial measurement systems;
function renderScaleButtons() {
  const container = document.createElement('div');
  container.classList.add('scale-buttons');

  const metricButton = document.createElement('button');
  metricButton.innerText = '°C - km/h';
  metricButton.classList.add('active');
  container.appendChild(metricButton);

  const imperialButton = document.createElement('button');
  imperialButton.innerText = '°F - mph';
  container.appendChild(imperialButton);

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

  return container;
}

// This function renders the header;
function renderHeader() {
  const body = document.querySelector('body');
  const header = document.createElement('header');
  header.appendChild(renderSearchBar());
  header.appendChild(renderScaleButtons());
  body.appendChild(header);
}

// This function renders the footer;
function renderFooter() {
  const body = document.querySelector('body');
  const footer = document.createElement('footer');
  footer.innerHTML =
    'Made by <a href="https://github.com/Ngonidzashe-Zvenyika">Ngonidzashe Zvenyika</a> | Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>';
  body.appendChild(footer);
}

export { renderHeader, renderFooter };
