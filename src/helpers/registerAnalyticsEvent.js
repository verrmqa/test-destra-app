 const registerAnalyticsEvent = (event, docId, templateId, price, title) => {
  switch (event) {
    case 'purchase':
      if (window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: docId,
          currency: 'RUB',
          value: price,
          items: [{ name: title, id: templateId }]
        });
      }
      break;
     case 'ecommerce':
     window.dataLayer.push({
      ecommerce: {
        purchase: {
            actionField: {
                id: docId
            },
            products: [
                {
                    id: templateId,
                    name: title,
                    price
                }
            ]
        }
    }
     });
     break;
    default:
      return console.log(event, docId, templateId, price, title);
  }
};

export default registerAnalyticsEvent;
