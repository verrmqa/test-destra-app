import http, { resultDecrypt } from '.';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const INSTRUCTION_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.instruction : configProd.instruction;

export const getPopularInstructions = () => http.get(`${INSTRUCTION_API}/instructions/popular`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getInstruction = instruction => http.get(`${INSTRUCTION_API}/instructions/${instruction}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
