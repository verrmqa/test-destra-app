import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const TEMPLATE_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.template : configProd.template;

export const getPopularTemplates = () => http.get(`${TEMPLATE_API}/templates/popular`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getTemplate = templateSlug => http.get(`${TEMPLATE_API}/templates/${templateSlug}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
