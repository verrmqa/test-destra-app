const generateFilter = (item, location) => {
  const { values } = item;
  const filter = {};
  const urlParams = new URLSearchParams(location.search);

  values.map((value) => {
    filter[value.id] = [];

    if (value.value) {
      if (value.value instanceof Array) {
        // If value is an Array
        if (urlParams.has(value.id)) {
          // if query string has value from filter
          urlParams.getAll(value.id).map((param) => {
            if (value.value.find(i => i.id === parseInt(param, 10))) {
              filter[value.id].push(parseInt(param, 10));
            } else {
              // const defaultValue = value.value.find(item => item.default === true);
              // filter[value.id].push(defaultValue.id ? defaultValue.id : value.value[0].id);
            }
          });
        } else {
          const defaultValue = value.value.map(i => i);

          Object.keys(defaultValue).map((key) => {
            if (defaultValue[key].default) {
              if (defaultValue.id) {
                filter[value.id].push(defaultValue[key].id);
              } else {
                filter[value.id].push(value.value[key].id);
              }
            }
          });
        }
      } else {
        // If value is a string or number
        filter[value.id].push(value.value);
      }
    } else {
      // If value is a boolean

      filter[value.id] = urlParams.has(value.id) ? urlParams.get(value.id) === 'true' : !!value.default;
    }
  });

  return filter;
};

export default generateFilter;
