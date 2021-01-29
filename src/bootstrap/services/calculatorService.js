import http, { resultDecrypt } from '.';
import modeDefine from '../../helpers/modeDefine';
import configProd from '../config/config.prod';
import configDev from '../config/config.dev';

const CALCULATOR_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.calculator : configProd.calculator;

export const getPopularCalculators = () => http.get(`${CALCULATOR_API}/catalog/calculators/popular`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getCalculator = calculator => http.get(`${CALCULATOR_API}/calculators/${calculator}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
