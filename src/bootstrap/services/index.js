import axios from 'axios';
import decrypt from '../../helpers/decrypt';


export const resultDecrypt = data => decrypt(data.result);

export default axios.create();
