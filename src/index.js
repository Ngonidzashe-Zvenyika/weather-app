import { getForecastWeatherMetric } from './api-functions/metric.js';
import { getForecastWeatherImperial } from './api-functions/imperial.js';

console.log(await getForecastWeatherMetric('harare'));
