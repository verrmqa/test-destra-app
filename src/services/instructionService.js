import http, { resultDecrypt } from './HttpService';

const INSTRUCTION_API = 'http://instructions.test.destralegal.ru/api/v2';
/* const instruction = 'nonquality-communal-services'; */

export const getInstruction = instruction => http.get(`${INSTRUCTION_API}/instructions/${instruction}`).then((data) => {return data})
