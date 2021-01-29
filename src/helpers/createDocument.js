import { createDoc } from '../bootstrap/services/documentService';

const createDocument = (template, history, categorySlug) => {
  const { category } = template;
  const { location } = history;
  const { search } = location;

  createDoc({ template: template._id })
    .then((item) => {
      const storage = window.localStorage;
      if (item.error) {
        const savedDocument = JSON.parse(storage.getItem(template.slug));
        if (savedDocument) storage.setItem(template.slug, JSON.stringify({ fields: savedDocument.fields }));
        else storage.setItem(template.slug, JSON.stringify({ expiry: new Date().getTime() + 2592000000 }));

        storage.setItem('isDocumentNew', 'true');
        return history.push(`/documents/${categorySlug || category.slug}/${template.slug}${search}`);
      }

      storage.setItem('isDocumentNew', 'true');
      return history.push(`/account/documents/${item._id}${search}`);
    }).catch();
};

export default createDocument;
