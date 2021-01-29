/*
  Identifies API location url
*/
const identifyApiUrl = () => {
  const isProduction = process.env.MODE === 'production';
  // Url where project located.
  const backendLocation = process.env.BACKEND_LOCATION ? `${isProduction ? 'https://' : 'http://'}${process.env.BACKEND_LOCATION}` : '/';
  // Url where API located
  const apiLocation = 'api/v1';

  /*
    If request to API made from frontend, make it relative to window.location
    if request was made from bakend, make it absolete to project location.
  */
  if (typeof (window) !== 'undefined') {
    return `/${apiLocation}`;
  }

    return `${backendLocation}/${apiLocation}`;
};

export const isProduction = process.env.MODE === 'production';
export const PROJECT_NAME = 'Destra';
export const API_URL = identifyApiUrl();
