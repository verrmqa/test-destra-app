import isWindowDefined from './isWindowDefined';

const yandexMetrika = (...values) => {
  const metrikaId = isWindowDefined() ? window.metrikaId : process.env.YANDEX_METRIKA_ID;
  if (isWindowDefined() && window.ym) window.ym(metrikaId, ...values);
};
export default yandexMetrika;
