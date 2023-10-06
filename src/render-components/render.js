import { renderHeader, renderFooter } from './header-and-footer.js';
import { renderContent } from './content.js';

let scale = 'metric';

function getScale() {
  return scale;
}

function setScale(value) {
  scale = value;
}

async function renderApplication(location) {
  renderHeader();
  await renderContent(location);
  renderFooter();
}

export { renderApplication, getScale, setScale };
