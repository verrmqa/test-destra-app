import './Calculator.style.css';
import './Calculator.widescreen.css';
import './Calculator.tablet.css';
import './Calculator.mobile.css';

import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Parser from 'expr-eval';

import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';

import 'moment/locale/ru';
import moment from 'moment';

import Filter from '../Filter';
import Render from '../Render';

import Title from '../../ui/Title';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Hint from '../../ui/Hint';

import generateFilter from '../../helpers/generateFilter';
import checkCondition from '../../helpers/checkCondition';
import updateQueryStringWithParams from '../../helpers/updateQueryStringWithParams';
import compileFormat from '../../helpers/compileFormat';

const Calculator = ({ calculator, title, location, history, setFilter, template }) => {
  const { values, variables } = calculator;
  const defaultFilter = values ? generateFilter({ values }, location) : undefined;
  const [filter, setStateFilter] = useState(defaultFilter || null);
  const [formula, setFormula] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState({});

  const firstDateInput = useRef();
  const secondDateInput = useRef();

  const fields = {};

  const handleFormula = () => {
    const { formulas } = calculator;

    formulas.map((item) => {
      if (checkCondition(item.condition, filter)) {
        setFormula(item.formula);
      }
    });
  };

  const handleChange = (id, newValue, type) => {
    const { pathname } = location;
    const selectedId = filter[id];

    if (type === 'multiselect') {
      if (selectedId.includes(newValue)) {
        const index = selectedId.indexOf(newValue);

        if (newValue !== -1) selectedId.splice(index, 1);
      } else {
        selectedId.push(newValue);
      }
    } else if (type === 'select' || type === 'radio') {
      filter[id] = [newValue];
    } else {
      filter[id] = newValue;
    }

    if (pathname.includes('calculators')) {
      updateQueryStringWithParams({ filter }, (res) => {
        history.push({ search: res });
      });
    }
    setStateFilter(filter);
    setResult(null);

    if (setFilter) setFilter(filter);

    handleFormula();
  };

  const handleValidation = () => {
    const validationErrors = {};

    variables.map((variable) => {
      if ((!inputValues[variable.id] && inputValues[variable.id] !== 0)) {
        if (variable._type !== 'date-range') validationErrors[variable.id] = 'Заполните поле, чтобы получить результат';
        else validationErrors[variable.id] = 'Выбран некорректный интервал дат';
      }
      if (inputValues[variable.id] && Number.isNaN(Number(inputValues[variable.id])) && variable._type !== 'date-range') {
        validationErrors[variable.id] = 'Поле заполнено некорректно';
      }
    });

    setErrors(validationErrors);

    setTimeout(() => setErrors({}), 3000);
  };

  const handleSubmit = () => {
    const parser = Parser.Parser;
    let formulaResult = [...formula];

    handleValidation();

    Object.keys(inputValues).map((item) => {
      formula.map((character, i) => {
        if (character === item) formulaResult[i] = inputValues[item];
      });
    });

    if (formulaResult.includes('mx')) {
      const mx = formulaResult.join('').split('mx');

      mx.pop();
      mx.shift();

      let max = mx[0];

      max = max.split('~');
      max.map((el, i) => {
        max[i] = parser.evaluate(el);
      });
      max = Math.max.apply(null, max);

      const indexes = [];

      formulaResult.map((el, i) => {
        if (el === 'mx') {
          indexes.push(i);
        }
      });

      for (let i = indexes[0]; i <= indexes[1]; i++) {
        indexes.push(i);
      }

      indexes.shift();
      indexes.shift();

      formulaResult = formulaResult.filter((value, index) => indexes.indexOf(index) === -1);
      formulaResult.splice(indexes[0], 0, max);
      formulaResult = parser.evaluate(formulaResult.join(''));
    } else if (formulaResult.includes('mn')) {
      const mn = formulaResult.join('').split('mn');

      mn.pop();
      mn.shift();

      let min = mn[0];

      min = min.split('~');
      min.map((el, i) => {
        min[i] = parser.evaluate(el);
      });
      min = Math.min.apply(null, min);

      const indexes = [];

      formulaResult.map((el, i) => {
        if (el === 'mn') {
          indexes.push(i);
        }
      });

      for (let i = indexes[0]; i <= indexes[1]; i++) {
        indexes.push(i);
      }

      indexes.shift();
      indexes.shift();

      formulaResult = formulaResult.filter((value, index) => indexes.indexOf(index) === -1);
      formulaResult.splice(indexes[0], 0, min);
      formulaResult = parser.evaluate(formulaResult.join(''));
    } else {
      formulaResult = parser.evaluate(formulaResult.join(''));
    }

    if (!Number.isInteger(formulaResult)) formulaResult = formulaResult.toFixed(2);

    setResult(formulaResult);
  };

  const handleInputChange = (e, fieldId) => {
    if (e && typeof e !== 'number') inputValues[fieldId] = e.target.value;
    else inputValues[fieldId] = e;

    setInputValues(inputValues);

    if ((e && typeof e !== 'number' && !e.target.value) || !e) {
      setResult(null);
    }
  };

  const handleDateRange = (id) => {
    const dateOne = new Date(moment(firstDateInput.current.input.value, 'DD-MM-YYYY'));
    const dateTwo = new Date(moment(secondDateInput.current.input.value, 'DD-MM-YYYY'));

    if (dateOne <= dateTwo) {
      setErrors({});

      handleInputChange(Math.abs(dateTwo - dateOne) / 86400000, id);
    } else {
      handleInputChange(undefined, id);
    }
  };

  const renderInput = (_type, id, label, hint) => {
    switch (_type) {
      case 'input':
        return (
          <>
            <Input size='medium' onChange={e => handleInputChange(e, id)} r={(e) => { fields[id] = e; }} />
            <div className='calculator__error'>{errors[id]}</div>
          </>
        );
      case 'percent':
        return (
          <>
            <Input size='medium' onChange={e => handleInputChange(e.target.value * 0.01, id)} r={(e) => { fields[id] = e; }} />
            <div className='calculator__error'>{errors[id]}</div>
          </>
        );
          case 'date-range':
        return (
          <div className='calculator__date-range'>
            <div className='calculator__date-range__field'>
              {label.includes('~') && (
                <div className='calculator__date-range__field__title'>
                  {label.split('~')[0]}
                </div>
              )}
              <div className='calculator__date-range__field__input'>
                <DayPickerInput
                  dayPickerProps={{
                    locale: 'ru',
                    localeUtils: MomentLocaleUtils
                  }}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder='ДД.ММ.ГГГГ'
                  onDayChange={() => handleDateRange(id)}
                  ref={firstDateInput}
                />
              </div>
            </div>
            <div className='calculator__date-range__field'>
              {label.includes('~') && (
                <div className='calculator__date-range__field__title'>
                  {label.split('~')[1]}
                </div>
              )}
              <div className='calculator__date-range__field__input'>
                <DayPickerInput
                  dayPickerProps={{
                  locale: 'ru',
                  localeUtils: MomentLocaleUtils
                }}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder='ДД.ММ.ГГГГ'
                  onDayChange={() => handleDateRange(id)}
                  ref={secondDateInput}
                />
              </div>
            </div>
            {label.includes('~') && hint && (
              <div className='calculator__item-hint'>
                <Hint template='control'>
                  <Render element={{ value: hint }} />
                </Hint>
              </div>
            )}
            <div className='calculator__error'>{errors[id]}</div>
          </div>
        );
      default:
    }
  };

  const renderFormula = () => {
    const formulaResult = [...formula];

    formulaResult.map((item, i) => {
      const variable = variables.find(v => v.id === item);

      if (variable) {
        formulaResult[i] = variable.title ? variable.title : variable.label;
      }
      if (item === '*') {
        formulaResult[i] = 'x';
      }

      if (item === '~') {
        formulaResult[i] = ',';
      }
    });
    if (formulaResult.includes('mx')) {
      formulaResult[formulaResult.indexOf('mx')] = 'max(';
    }

    if (formulaResult.includes('mx')) {
      formulaResult[formulaResult.indexOf('mx')] = ')';
    }

    if (formulaResult.includes('mn')) {
      formulaResult[formulaResult.indexOf('mn')] = 'min(';
    }

    if (formulaResult.includes('mn')) {
      formulaResult[formulaResult.indexOf('mn')] = ')';
    }

    return formulaResult.map(el => (
      <div
        className={el === 'x' || el === '(' || el === ')' || el === '-' || el === '+' || el === '/' || el === '~' || el === 'max(' || el === 'min(' || el === ','
      ? 'calculator__formula__operator'
      : 'calculator__formula__item'}
      >
        {el}
      </div>
    ));
  };

  useEffect(() => {
    handleFormula();

    if (setFilter) setFilter(filter);
  }, [filter]);

  renderFormula();

  return (
    <div className='calculator'>
      {template === 'small' && title && (
        <div className='calculator__section calculator__section-title'>
          <Title level={2} template='calculator'>{title}</Title>
        </div>
      )}
      <div className='calculator__section calculator__section-filter'>
        {values && values.length > 0 ? <Filter values={values} handleChange={handleChange} filter={filter} /> : null}
      </div>
      <div className='calculator__section calculator__section-items'>
        {variables.map(variable => formula && formula.includes(variable.id) && (
        <div className='calculator__item' key={`${variable.id}__calculator__items`}>
          <div className='calculator__item__section calculator__item__section-title'>
            {!variable.label.includes('~') && (
              <div className='calculator__item__title'>
                {variable.label}
              </div>
            )}
            {!variable.label.includes('~') && !!variable.hint && (
            <div className='calculator__item-hint'>
              <Hint template='control'>
                <Render element={{ value: compileFormat(variable.hint) }} />
              </Hint>
            </div>
          )}
          </div>
          <div className='calculator__item__section calculator__item__section-input'>
            {renderInput(variable._type, variable.id, variable.label, variable.hint)}
          </div>
        </div>
          ))}
      </div>
      <div className='calculator__section calculator__section-result'>
        <div className='calculator__result'>
          Итог:
          {(result || result === 0) && <span className='calculator__result__value'>{result}</span>}
        </div>
        <div className='calculator__result__section calculator__result__section-button'>
          <Button onClick={handleSubmit} size='medium' template='blue'>Рассчитать</Button>
        </div>
      </div>
      <div className='calculator__section calculator__section-formula'>
        <div className='calculator__formula__title'>
          Расчет ведется по формуле:
        </div>
        <div className='calculator__formula'>
          {renderFormula()}
        </div>
      </div>
    </div>
  );
};
export default withRouter(Calculator);

/*
class Calculator extends Component {
  constructor(props) {
    super(props);

    const { calculator, location } = props;
    const { values } = calculator;
    const defaultFilter = values ? generateFilter({ values }, location) : undefined;

    this.state = {
      filter: defaultFilter || null,
      formula: '',
      inputValues: {},
      result: '',
      errors: {}
    };
    this.fields = {};
  }

  componentDidMount() {
    const { filter } = this.state;
    const { setFilter } = this.props;
    this.handleFormula();
    if (setFilter) setFilter(filter);
  }

  handleChange = (id, newValue, type) => {
    const { filter } = this.state;
    const { location, setFilter } = this.props;
    const { pathname } = location;
    const selectedId = filter[id];

    if (type === 'multiselect') {
      if (selectedId.includes(newValue)) {
        const index = selectedId.indexOf(newValue);

        if (newValue !== -1) selectedId.splice(index, 1);
      } else {
        selectedId.push(newValue);
      }
    } else if (type === 'select' || type === 'radio') {
      filter[id] = [newValue];
    } else {
      filter[id] = newValue;
    }

    if (pathname.includes('calculators')) this.updateQueryStringWithParams();
    this.setState({ filter, result: null });
    if (setFilter) setFilter(filter);
    this.handleFormula();
  }

  updateQueryStringWithParams = () => {
    const { history } = this.props;
    const { filter } = this.state;

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

    history.push({ search: result.toString().replace(/,/g, '&') });
  }

  handleValidation = () => {
    const { inputValues } = this.state;
    const { calculator } = this.props;
    const { variables } = calculator;

    const errors = {};
    variables.map((variable) => {
      if ((!inputValues[variable.id] && inputValues[variable.id] !== 0)) {
        if (variable._type !== 'date-range') errors[variable.id] = 'Заполните поле, чтобы получить результат';
        else errors[variable.id] = 'Выбран некорректный интервал дат';
      }
      if (inputValues[variable.id] && Number.isNaN(Number(inputValues[variable.id])) && variable._type !== 'date-range') errors[variable.id] = 'Поле заполнено некорректно';
    });
    this.setState({ errors });
    setTimeout(() => this.setState({ errors: {} }), 3000);
  }

  handleSubmit = () => {
    const { inputValues, formula } = this.state;
    const parser = Parser.Parser;
    let result = [...formula];
    this.handleValidation();
    Object.keys(inputValues).map((item) => {
      formula.map((character, i) => {
        if (character === item) result[i] = inputValues[item];
      });
    });
    if (result.includes('mx')) {
      const mx = result.join('').split('mx');
      mx.pop();
      mx.shift();
      let max = mx[0];
      max = max.split('~');
      max.map((el, i) => {
        max[i] = parser.evaluate(el);
      });
      max = Math.max.apply(null, max);
      const indexes = [];
      result.map((el, i) => {
        if (el === 'mx') {
          indexes.push(i);
        }
      });
      for (let i = indexes[0]; i <= indexes[1]; i++) {
        indexes.push(i);
      }
      indexes.shift();
      indexes.shift();
      result = result.filter((value, index) => indexes.indexOf(index) === -1);
      result.splice(indexes[0], 0, max);
      result = parser.evaluate(result.join(''));
    } else if (result.includes('mn')) {
      const mn = result.join('').split('mn');
      mn.pop();
      mn.shift();
      let min = mn[0];
      min = min.split('~');
      min.map((el, i) => {
        min[i] = parser.evaluate(el);
      });
      min = Math.min.apply(null, min);
      const indexes = [];
      result.map((el, i) => {
        if (el === 'mn') {
          indexes.push(i);
        }
      });
      for (let i = indexes[0]; i <= indexes[1]; i++) {
        indexes.push(i);
      }
      indexes.shift();
      indexes.shift();
      result = result.filter((value, index) => indexes.indexOf(index) === -1);
      result.splice(indexes[0], 0, min);
      result = parser.evaluate(result.join(''));
    } else result = parser.evaluate(result.join(''));

    if (!Number.isInteger(result)) result = result.toFixed(2);
    this.setState({ result });
  }

  handleDateRange = (id) => {
    const dateOne = new Date(moment(this.first.input.value, 'DD-MM-YYYY'));
    const dateTwo = new Date(moment(this.second.input.value, 'DD-MM-YYYY'));
    if (dateOne <= dateTwo) {
      this.setState({ errors: {} });
      const result = Math.abs(dateTwo - dateOne) / 86400000;
      this.handleInputChange(result, id);
    } else {
      this.handleInputChange(undefined, id);
    }
  }

  handleFormula() {
    const { calculator } = this.props;
    const { formulas } = calculator;
    const { filter } = this.state;

    formulas.map((formula) => {
      if (checkCondition(formula.condition, filter)) this.setState({ formula: formula.formula });
    });
  }

  handleInputChange(e, fieldId) {
    const { inputValues } = this.state;
    if (e && typeof e !== 'number') inputValues[fieldId] = e.target.value;
    else inputValues[fieldId] = e;

    this.setState({ inputValues });
    if (e && typeof e !== 'number' && !e.target.value) this.setState({ result: null });
    else if (!e) this.setState({ result: null });
  }


  renderInput(_type, id, label, hint) {
    const { errors } = this.state;
    switch (_type) {
      case 'input':
        return (
          <>
            <Input size='medium' onChange={e => this.handleInputChange(e, id)} r={(e) => { this.fields[id] = e; }} />
            <div className='calculator__error'>{errors[id]}</div>
          </>
        );
      case 'percent':
        return (
          <>
            <Input size='medium' onChange={e => this.handleInputChange(e.target.value * 0.01, id)} r={(e) => { this.fields[id] = e; }} />
            <div className='calculator__error'>{errors[id]}</div>
          </>
        );
          case 'date-range':
        return (
          <div className='calculator__date-range'>
            <div className='calculator__date-range__field'>
              {label.includes('~') && (
                <div className='calculator__date-range__field__title'>
                  {label.split('~')[0]}
                </div>
              )}
              <div className='calculator__date-range__field__input'>
                <DayPickerInput
                  dayPickerProps={{
                    locale: 'ru',
                    localeUtils: MomentLocaleUtils
                  }}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder='ДД.ММ.ГГГГ'
                  onDayChange={() => this.handleDateRange(id)}
                  ref={(e) => { this.first = e; }}
                />
              </div>
            </div>
            <div className='calculator__date-range__field'>
              {label.includes('~') && (
                <div className='calculator__date-range__field__title'>
                  {label.split('~')[1]}
                </div>
              )}
              <div className='calculator__date-range__field__input'>
                <DayPickerInput
                  dayPickerProps={{
                  locale: 'ru',
                  localeUtils: MomentLocaleUtils
                }}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder='ДД.ММ.ГГГГ'
                  onDayChange={() => this.handleDateRange(id)}
                  ref={(e) => { this.second = e; }}
                />
              </div>
            </div>
            {label.includes('~') && hint && (
              <div className='calculator__item-hint'>
                <Hint template='control'>
                  <Render element={{ value: hint }} />
                </Hint>
              </div>
            )}
            <div className='calculator__error'>{errors[id]}</div>
          </div>
        );
      default:
    }
  }

  renderFormula() {
    const { formula } = this.state;
    const { calculator } = this.props;
    const { variables } = calculator;
    const result = [...formula];

    result.map((item, i) => {
      const variable = variables.find(vari => vari.id === item);
      if (variable) {
        result[i] = variable.title ? variable.title : variable.label;
      }
      if (item === '*') {
        result[i] = 'x';
      }

      if (item === '~') {
        result[i] = ',';
      }
    });
    if (result.includes('mx')) {
      result[result.indexOf('mx')] = 'max(';
    }

    if (result.includes('mx')) {
      result[result.indexOf('mx')] = ')';
    }

    if (result.includes('mn')) {
      result[result.indexOf('mn')] = 'min(';
    }

    if (result.includes('mn')) {
      result[result.indexOf('mn')] = ')';
    }

    return result.map(el => (
      <div
        className={el === 'x' || el === '(' || el === ')' || el === '-' || el === '+' || el === '/' || el === '~' || el === 'max(' || el === 'min(' || el === ','
      ? 'calculator__formula__operator'
      : 'calculator__formula__item'}
      >
        {el}
      </div>
    ));
  }

  render() {
    const { calculator, template } = this.props;
    const { title, variables, values } = calculator;
    const { filter, formula, result } = this.state;

    this.renderFormula();
    return (
      <div className='calculator'>
        { template === 'small' && title && (
          <div className='calculator__section calculator__section-title'>
            <Title level={2} template='calculator'>{title}</Title>
          </div>
        )}
        {values && values.length > 0 && (
          <div className='calculator__section calculator__section-filter'>
            <Filter values={values} handleChange={this.handleChange} filter={filter} />
          </div>
        )}
        <div className='calculator__section calculator__section-items'>
          {variables.map(variable => formula && formula.includes(variable.id) && (
          <div className='calculator__item' key={`${variable.id}__calculator__items`}>
            <div className='calculator__item__section calculator__item__section-title'>
              {!variable.label.includes('~') && (
                <div className='calculator__item__title'>
                  {variable.label}
                </div>
              )}
              {!variable.label.includes('~') && !!variable.hint && (
              <div className='calculator__item-hint'>
                <Hint template='control'>
                  <Render element={{ value: variable.hint }} />
                </Hint>
              </div>
            )}
            </div>
            <div className='calculator__item__section calculator__item__section-input'>
              {this.renderInput(variable._type, variable.id, variable.label, variable.hint)}
            </div>
          </div>
            ))}
        </div>
        <div className='calculator__section calculator__section-result'>
          <div className='calculator__result'>
            Итог:
            {(result || result === 0) && <span className='calculator__result__value'>{result}</span>}
          </div>
          <Button onClick={this.handleSubmit} size='medium' template='blue'>Рассчитать</Button>
        </div>
        <div className='calculator__section calculator__section-formula'>
          <div className='calculator__formula__title'>
            Расчет ведется по формуле:
          </div>
          <div className='calculator__formula'>
            {this.renderFormula()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Calculator);
*/
