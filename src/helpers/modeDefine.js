import isWindowDefined from './isWindowDefined';

const modeDefine = () => {
  if (isWindowDefined()) return window.destraMode;
  return process.env.MODE;
};

export default modeDefine;
