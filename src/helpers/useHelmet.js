import { Helmet } from 'react-helmet';


const useHelmet = ({ title, description, url }) => {
  const params = {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:url', content: `https://destralegal.ru${url}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:site_name', content: 'Destra Legal' },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://destralegal.ru/assets/images/share/ms-icon-310x310.png' }
    ]
  };

  return [params, Helmet];
};

export default useHelmet;
