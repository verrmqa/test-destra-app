const updateQueryStringWithParams = ({ filter }, callback) => {
  const result = [];

  Object.keys(filter).map((key) => {
    if (filter[key] && filter[key].length > 1) {
      filter[key].map(item => result.push(`${key}=${item}`));
    } else if (!filter[key] || filter[key].length === 0) {
      result.push(`${key}=[]`);
    } else {
      result.push(`${key}=${filter[key]}`);
    }
  });

  callback(result.toString().replace(/,/g, '&'));
};
export default updateQueryStringWithParams;
