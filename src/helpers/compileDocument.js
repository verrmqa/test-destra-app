import compileFormat from './compileFormat';
import checkCondition from './checkCondition';

const executeParticleCondition = (particle, filter, summary, _schema) => {
  const result = [];

  for (let i = 0; i < particle.length; i++) {
    const section = particle[i];

    if (checkCondition(section.condition, filter)) {
      const content = [];

      for (let j = 0; j < section.content.length; j++) {
        const item = section.content[j];

        if (checkCondition(item.condition, filter)) {
          if (!summary[item._type]) {
            summary[item._type] = [item];
          } else {
            summary[item._type].push(item);
          }

          content.push(compileFormat(item, filter, summary, _schema));
        }
      }

      result.push({
        ...section,
        content
      });
    }
  }

  return result;
};

const compileDocument = (json, filter) => {
  const summary = [];
  const { content, _schema } = json;

  const header = executeParticleCondition(content.header, filter, summary, _schema);
  const body = compileFormat(content.body, filter, summary, _schema);
  const footer = executeParticleCondition(content.footer, filter, summary, _schema);

  return {
    ...json,
    content: {
      header,
      body,
      footer
    },
    summary
  };
};

export default compileDocument;
