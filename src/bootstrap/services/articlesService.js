import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const ARTICLES_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.articles : configProd.articles;

export const getPopularArticles = () => http.get(`${ARTICLES_API}/catalog/articles/popular`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getArticle = (article, category) => http.get(`${ARTICLES_API}/catalog/${category}/articles/${article}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
