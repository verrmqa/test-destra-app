import checkCondition from './checkCondition';

const compiler = (value, filter, summary = [], schema) => {
  let result;

  if (value instanceof Array) {
    // If Value is Array
    result = [];

    for (let i = 0; i < value.length; i++) {
      const item = value[i];

      if (checkCondition(item.condition, filter)) {
        const compiled = compiler(item, filter, summary, schema);

        if (compiled) result.push(compiled);
      }
    }
  } else if (value instanceof Object) {
    // If Value is Object

    if (typeof (value.value) === 'string' && value.value.includes('%h')) {
      result = {
        _type: value._type,
       // _type: 'text',
       // size: '14',
        value: []
      };

      const parseString = value.value.split('%h');

      for (let i = 0; i < parseString.length; i++) {
        const _parseString = compiler(parseString[i], filter, summary, schema);

        result.value.push(_parseString);

        if (value.format && value.format[i]) {
          if (checkCondition(value.format[i].condition, filter)) {
            result.value.push(compiler(value.format[i], filter, summary, schema));
          }
        }
      }
    } else {
      let category = value._type;

      const types = ['phone', 'date', 'email', 'tin', 'esn', 'number', 'callback'];
      types.map((type) => {
        if (category === type || category.includes(type)) {
          category = 'input';
        }
      });

      if (!summary[category]) {
        summary[category] = [value];
      } else if (category === 'input') {
        if (!summary.input.find(_i => _i.id === value.id)) {
          summary[category].push(value);
        }
      } else {
        summary[category].push(value);
      }

      result = {
        ...value,
        value: compiler(value.value, filter, summary, schema)
      };
    }
  } else if (value && value.search(/{%[a-zA-Z-_0-9]+%\}/g) >= 0) {
    const fields = value.match(/{%[a-zA-Z-_0-9]+%\}/g);
    const injection = {
      _type: 'block',
      value: value.replace(/{%[a-zA-Z-_0-9]+%\}/g, '%h'),
      format: fields.map((match) => {
        const fieldId = match.replace('{%', '').replace('%}', '');
        let element = {
          id: fieldId,
          _type: 'input'
        };
        const field = schema.find(meta => meta.id === fieldId);

        if (field) {
          const { options } = field;

          element = {
            ...element,
            ...field,
            _type: field._type !== 'text' ? field._type : 'input',
            hint: options.hint,
            placeholder: options.placeholder,
            template: 'document'
          };
        }

        return element;
      })
    };

    // Little Hack, i dunno WTF is goin on LOL. Compiler wont accept just generated Obj.
    // But works with array.
    result = compiler(injection, filter, summary, schema);
  } else {
    result = value;
  }

  return result;
};

export default (json, filter, summary, schema) => {
  const compiled = compiler(json, filter, summary, schema);

  return compiled;
};
