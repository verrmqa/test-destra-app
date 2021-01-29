import http, { resultDecrypt } from '.';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const CATALOG_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.catalog : configProd.catalog;
const CATALOG_OLD_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.catalog_old : configProd.catalog_old;

export const getOldCategories = () => http.get(`${CATALOG_OLD_API}/catalog`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getOldCategory = category => http.get(`${CATALOG_OLD_API}/catalog/${category}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getCategories = entity => http.get(`${CATALOG_API}/categories?entity=${entity}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getCategory = (category, entity) => http.get(`${CATALOG_API}/categories/${category}?entity=${entity}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getPopularCategories = () => http.get(`${CATALOG_API}/catalog/popular`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getTemplates = category => http.get(`${CATALOG_API}/catalog/${category}/templates`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getInstructions = category => http.get(`${CATALOG_API}/catalog/${category}/instructions`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getTemplate = (category, template) => http.get(`${CATALOG_API}/catalog/${category}/templates/${template}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getInstruction = (category, instruction) => http.get(`${CATALOG_API}/catalog/${category}/instructions/${instruction}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
