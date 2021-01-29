import compileFormat from './compileFormat';
import checkCondition from './checkCondition';

const compileInstruction = (json, filter) => {
  // const compiled = compileFormat(json, filter);
  const stages = [];
  const summary = [];

  for (let i = 0; i < json.stages.length; i++) {
    const stage = json.stages[i];

    if (checkCondition(stage.condition, filter)) {
      const data = [];

      for (let j = 0; j < stage.data.length; j++) {
        const item = stage.data[j];

        if (checkCondition(item.condition, filter)) {
          const content = [];

          for (let c = 0; c < item.content.length; c++) {
            const element = item.content[c];

            if (checkCondition(element.condition, filter)) {
              content.push(compileFormat(element, filter));

              if (!summary[element._type]) {
                summary[element._type] = [element];
              } else {
                summary[element._type].push(element);
              }
            }
          }

          data.push({
            ...item,
            content
          });
        }
      }

      stages.push({
        ...stage,
        data
      });
    }
  }

  const intro = [];

  for (let i = 0; i < json.intro.length; i++) {
    const item = json.intro[i];

    if (checkCondition(item.condition, filter)) {
      intro.push(compileFormat(item, filter));
    }
  }

  // console.log(intro);

  return {
    ...json,
    stages,
    intro,
    summary
  };
};
export default compileInstruction;
