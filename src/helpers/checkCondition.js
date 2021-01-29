const checkCondition = (conditions, filter) => {
  let result = false;

  if (conditions && conditions.length) {
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      let parent;

      if (filter[condition.id] instanceof Array) {
        // If filter value is an array
        if (condition.value instanceof Array) {
          // If condition value is an array
          parent = filter[condition.id].includes(condition.value[i]);
        } else {
          // If codition value is a string
          parent = filter[condition.id].indexOf(condition.value) >= 0;
        }
      } else {
        // If filter value is a string
        parent = filter[condition.id] === condition.value;
      }

      if (filter[condition.id] && filter[condition.id].length === 0 && condition.value.length === filter[condition.id].length) {
        // If condition value is an empty array []
        parent = condition.value.length === filter[condition.id].length;
      }

      if (parent) {
        const children = condition.condition ? checkCondition(condition.condition, filter) : true;

        if (children) result = true;
      }
    }
  } else result = true;

  return result;
};

export default checkCondition;
