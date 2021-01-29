import './style.css';
import './widescreen.css';
import './tablet.css';
import './mobile.css';

import React, { Component } from 'react';
import Parser from 'expr-eval';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import moment from 'moment';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';


import Filter from '@containers/Filter';

import Title from '@ui/Title';
import Input from '@ui/Input';
import Button from '@ui/Button';
import Radio from '@ui/Radio';

import generateFilter from '@helpers/generateFilter';
import checkCondition from '@helpers/checkCondition';


import { stavki } from './stavki';

class Calculator extends Component {
  constructor(props) {
    super(props);

    const { calculator } = props;
    const { values } = calculator;
    const defaultFilter = values ? generateFilter({ values }, 'location') : undefined;

    this.state = {
      filter: defaultFilter || null,
      formula: '',
      inputValues: {},
      result: '',
      cb: {
        value: null,
        items: []
      },
      errors: {}
    };
    this.fields = {};
  }

  componentDidMount() {
    this.handleFormula();
  }

  handleChange = (id, newValue, type) => {
    const { filter } = this.state;
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

    this.setState({ filter, result: null });
    this.handleFormula();
  }

  handleCb = (dateOne, dateTwo) => {
    const { cb } = this.state;
    const { value } = cb;

    if (cb.value === 0) {
      let dateRate;
      stavki.map((stavka) => {
        if (dateOne >= new Date(moment(stavka.date, 'DD-MM-YYYY'))) {
          dateRate = stavka;
        }
      });
      this.setState({ cb: { value, items: [dateRate] } });
      this.handleInputChange(dateRate.rate / 100, 'cb');
    } else if (cb.value === 1) {
      let dateRate;
      stavki.map((stavka) => {
        if (dateTwo >= new Date(moment(stavka.date, 'DD-MM-YYYY'))) {
          dateRate = stavka;
        }
      });
      if (dateRate) {
        this.setState({ cb: { value, items: [dateRate] } });
        this.handleInputChange(dateRate.rate / 100, 'cb');
      }
    } else if (cb.value === 2) {
      const dateRate = [];
      stavki.map((stavka) => {
        if (dateOne <= new Date(moment(stavka.date, 'DD-MM-YYYY')) && new Date(moment(stavka.date, 'DD-MM-YYYY')) <= dateTwo) {
          dateRate.push(stavka);
        }
      });
      this.setState({ cb: { value, items: dateRate } });
      this.handleInputChange(dateRate, 'cb');
    }
  }

  handleValidation = () => {
    const { inputValues } = this.state;
    const { calculator } = this.props;
    const { variables } = calculator;

    const errors = {};
    variables.map((variable) => {
      if (!inputValues[variable.id] && inputValues[variable.id] !== 0) {
        if (variable._type !== 'date-range') errors[variable.id] = 'Заполните поле, чтобы получить результат';
        else errors[variable.id] = 'Выбран некорректный интервал дат';
      }
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
      if (formula.includes(item)) {
        result[result.indexOf(item)] = inputValues[item];
      }
    });
    result = result.join('');
    this.setState({ result: parser.evaluate(result).toFixed(2) });
  }

  handleDateRange = (id) => {
    const { cb } = this.state;
    const dateOne = new Date(moment(this.first.input.value, 'DD-MM-YYYY'));
    const dateTwo = new Date(moment(this.second.input.value, 'DD-MM-YYYY'));
    if (dateOne <= dateTwo) {
      this.setState({ errors: {} });
      const result = Math.abs(dateTwo - dateOne) / 86400000;
      this.handleInputChange(result, id);
    } else {
      this.handleInputChange(undefined, id);
    }
    if (cb.value !== null) this.handleCb(dateOne, dateTwo);
  }

  handleFormula() {
    const { calculator } = this.props;
    const { formulas } = calculator;
    const { filter, cb } = this.state;
    const { items } = cb;
    formulas.map((formula) => {
      if (checkCondition(formula.condition, filter)) {
        this.setState({ formula: formula.formula });
        if (formula.formula.includes('cb')) this.setState({ cb: { value: 0, items } });
      }
    });
  }

  handleInputChange(e, fieldId) {
    const { inputValues } = this.state;
    if (Array.isArray(e)) inputValues[fieldId] = e;
    else if (e && typeof e !== 'number' && !Array.isArray(e)) inputValues[fieldId] = e.target.value;
    else inputValues[fieldId] = e;

    this.setState({ inputValues });
    // if (e && typeof e !== 'number' && !e.target.value) this.setState({ result: null });
    // else if (!e) this.setState({ result: null });
  }

  renderInput(_type, id) {
    const { errors } = this.state;
    switch (_type) {
      case 'input':
        return (
          <React.Fragment>
            <Input type='number' size='medium' onChange={e => this.handleInputChange(e, id)} r={(e) => { this.fields[id] = e; }} />
            <div className='calculator__error'>{errors[id]}</div>
          </React.Fragment>
        );
          case 'date-range':
        return (
          <div className='calculator__date-range'>
            <div className='calculator__date-range__input'>
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
            <div className='calculator__date-range__input'>
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
            <div className='calculator__error'>{errors[id]}</div>
          </div>
        );
      default:
    }
  }

  renderFormula() {
    const { formula, cb } = this.state;
    const { calculator } = this.props;
    const { variables } = calculator;
    const result = [...formula];

    variables.map((variable) => {
      if (cb.items.length >= 1 && variable.id === 'cb' && result.includes('cb')) {
        result[result.indexOf('cb')] = `${variable.label} = ${cb.items[0].rate}%`;
      }
      if (result.includes(variable.id)) {
        result[result.indexOf(variable.id)] = variable.label;
      }
      if (result.includes('*')) {
        result[result.indexOf('*')] = 'x';
      }
    });

    return result.map(el => (
      <div className={el === 'x' || el === '(' || el === ')' || el === '-' || el === '+' || el === '/'
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
    const { filter, formula, result, cb } = this.state;
    const { items } = cb;

    const params = {
      id: 'cb',
      defaultValue: [0],
      value: [
        { id: 0, value: 'на день наступления обязательств (начала периода)', default: true },
        { id: 1, value: 'на день завершения обязательств (конца периода)' },
        { id: 2, value: 'по периодам действия ставки' }
      ],
      onChange: (e, i) => this.setState({ cb: { value: i, items } })
    };

    return (
      <div className='calculator'>
        { template === 'small' && (
          <div className='calculator__section calculator__section-title'>
            <Title level={2} template='calculator'>{title}</Title>
          </div>
        )}
        {values.length > 0 && (
          <div className='calculator__section calculator__section-filter'>
            <Filter values={values} handleChange={this.handleChange} filter={filter} />
          </div>
        )}
        { cb.value !== null && (
          <div className='calculator__section calculator__section-cb'>
            <div className='calculator__cb__title'>
              Применять ключевую ставку ЦБ РФ:
            </div>
            <Radio {...params} />
          </div>
        )}
        <div className='calculator__section calculator__section-items'>
          {variables.map(variable => formula && formula.includes(variable.id) && variable.id !== 'cb' && (
          <div className='calculator__item'>
            <div className='calculator__item__section calculator__item__section-title'>
              <div className='calculator__item__title'>
                {variable.label}
              </div>
            </div>
            <div className='calculator__item__section calculator__item__section-input'>
              {this.renderInput(variable._type, variable.id)}
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

export default Calculator;
