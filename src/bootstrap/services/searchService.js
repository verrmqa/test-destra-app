import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const SEARCH_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.search : configProd.search;

export const search = query => http.get(`${SEARCH_API}/search/${query || ''}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
