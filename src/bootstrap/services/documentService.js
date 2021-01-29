import http, { resultDecrypt } from '.';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const DOCUMENT_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.document : configProd.document;

export const getDocuments = () => http.get(`${DOCUMENT_API}/documents`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const createDoc = doc => http.post(`${DOCUMENT_API}/documents`, doc).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getDocument = documentId => http.get(`${DOCUMENT_API}/documents/${documentId}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const updateDocument = (docData, documentId) => http.put(`${DOCUMENT_API}/documents/${documentId}`, docData).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const deleteDocument = documentId => http.delete(`${DOCUMENT_API}/documents/${documentId}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const downloadDoc = doc => http.post(`${DOCUMENT_API}/export/pdf`, doc).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const createDocument = (template, values) => http.post(`${DOCUMENT_API}/account/documents`, { template, values }).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
