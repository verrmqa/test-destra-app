// DEPRECATED
export default (name, path, domain) => {
  document.cookie = `${name}=${
    (path) ? `;path=${path}` : ''
  }${(domain) ? `;domain=${domain}` : ''
  };expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
