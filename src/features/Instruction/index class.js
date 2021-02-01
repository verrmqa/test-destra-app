import React, { Component, useEffect, useState } from 'react';
import { getInstruction } from '../../services/instructionService';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegistrationLock from '../../containers/RegistrationLock';
import Render from '../../containers/Render';
import Filter from '../../containers/Filter';
import Stage from '../../containers/Stage';

class Instruction extends Component {
  static propTypes = {
    instruction: PropTypes.object,
    filter: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    categories: PropTypes.array,
    documents: PropTypes.array,
    user: PropTypes.object,
    handleCreatePaymentDispatcher: PropTypes.func,
  };


  constructor(props) {
    super();
    const { filter, location } = props;

    let mobileFilterIsOpen = false;

    if (typeof (window) !== 'undefined') {
      if (location.search.includes('params_open')) mobileFilterIsOpen = true;
    }

    this.state = {
      filter,
      isOpen: false, // TODO: Describe which isOpen that is
      mobileFilterIsOpen,
      docsCards: [],
      loading: true
    };
    this.arrayStages = [];
    this.detectFilterCLick = false;
    this.blocks = [];
  }


  componentDidMount() {
    const { location, instruction } = this.props;
    const { slug } = instruction;

    this.setState({ lockCounter: typeof document !== 'undefined' && document.querySelectorAll('.stage').length });
    if (!document.cookie.includes('instructionLock=true')) this.handleRegistrationLock();

    if (document.cookie.includes('return-promo=notpaid') || location.search.includes('return-promo')) {
      this.setState({ promoLock: true });
    }

    if (typeof window !== 'undefined') {
      const storage = window.localStorage;
      if (storage.getItem(slug)) this.setState({ block: Number(storage.getItem(slug)) });
    }

    this.handleRefundBanner();
    this.handleFaq();
    this.handleDocsHead();
    this.handleDocsCallPromo();
    this.handleDocBlock();
    this.handleHorizontalPromo();
    this.handleWidgetCookie();
    this.handleDocDownload();
    this.handleDocPromoView();
    this.handleCustomFilter();
    this.handlePostPayment();

    if (document.cookie.includes('widget=inst')) {
      setTimeout(() => this.handleWidget(), 90000);
    }
    this.handleDocBanner();
    this.handleIntroHelp();

    setTimeout(this.handleDocsCards, 1000);

    window.addEventListener('keydown', e => this.handleCopy(e));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleCopy(e));
  }

  handleChange = (id, newValue, type) => {
    console.log(id)
    console.log(newValue)
    console.log(type)

    const { filter } = this.state;
    const selectedId = filter[id];

    if (window.gtag) window.gtag('event', 'click_on_elements');

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

    this.updateQueryStringWithParams();
    this.setState({ filter });
  }

  updateQueryStringWithParams = () => {
    console.log(this.props)
    console.log(this.state)
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

  renderFilter() {
    console.log("this render filter", this)
    const { instruction } = this.props;
    const { values } = instruction;
    const { filter } = this.state;

    return <Filter type='instruction' values={values} handleChange={this.handleChange} filter={filter} />;
  }

  renderStages = () => {
    const { filter, lockCounter, promoLock, block } = this.state;
    const { instruction, user } = this.props;
    const { stages } = instruction;
    let counter = 0;

    return (
      <div className='instruction__content__section instruction__content__section-stages'>
          <div className='instruction__stages' ref={(e) => { this.stagesBlock = e; }}>
            {stages.map((stage, index) => (
              <div key={stage._id} className='instruction__stages__section' ref={(e) => { this.arrayStages[index] = e; }}>
                {stage.data.map((data) => {
                    const { content, title, button } = data;
                    const handleRandomLock = typeof document !== 'undefined' && document.cookie.includes('instructionLock=true') && !user;
                    const promoPayCheck = typeof document !== 'undefined' && (document.cookie.includes('promo=paid') || document.cookie.includes('return-promo=paid'));
                    const handlePromoBlock = promoLock && !promoPayCheck && instruction._id === '5dcddf317f955fec3ac82867';
                    const handleReturnPromoBLock = promoLock && !promoPayCheck && instruction.category._id === '5c8e33c8b0f061081143feea';
                    counter++;

                    if (button) {
                      if (this.blocks.length === 0) this.setState({ block: index });
                      if (!this.blocks.includes(index)) this.blocks.push(index);
                    }

                    if (block && index <= block) {
                      return (
                        <Stage template={(handlePromoBlock || handleRandomLock || handleReturnPromoBLock) && counter > 2 && 'blur'} filter={filter} counter={counter} key={data._id} title={title} isButtonShown={index === block} button={button} handleNext={this.handleBlocks}>
                          {((handlePromoBlock || handleRandomLock || handleReturnPromoBLock) ? counter < 3 : true) && content.map(element => (
                              <div key={element._id} className='instruction__block__content__section'>
                                <Render filter={filter} element={element} />
                              </div>
                            ))}
                        </Stage>
                      );
}

                    if (!block) {
                      return (
                        <React.Fragment key={data._id}>
                          <Stage template={(handlePromoBlock || handleRandomLock || handleReturnPromoBLock) && counter > 2 && 'blur'} filter={filter} counter={counter} title={title}>
                            {((handlePromoBlock || handleRandomLock || handleReturnPromoBLock) ? counter < 3 : true) && content.map(element => (
                                <div key={element._id} className='stage__content__section'>
                                  <Render filter={filter} element={element} />
                                </div>
                              ))}
                          </Stage>
                          {((handlePromoBlock || handleRandomLock || handleReturnPromoBLock) && counter === 2) && (
                            <div className='instruction__stages__section-lock'>
                              <RegistrationLock
                                message={promoLock ? 'Оплатите полный доступ, чтобы получить всю инструкцию' : `Вы видите 2 из ${lockCounter} шагов инструкции. Зарегистрируйтесь, чтобы дочитать`}
                                promo={promoLock}
                                handlePromoPay={this.handlePromoPay}
                                user={user}
                              />
                              <div className='instruction__stages__section-promo'>
                                <div className='instruction__promo'>
                                  <div className='instruction__promo__title'>Вы получите полную инструкцию и все необходимые документы:</div>
                                  <div className='instruction__promo__list'>
                                    <div className='instruction__promo__list__item'>акт</div>
                                    <div className='instruction__promo__list__item'>претензия</div>
                                    <div className='instruction__promo__list__item'>исковое</div>
                                  </div>
                                  <div className='instruction__promo__description'>со скидкой до 15 декабря</div>
                                  <div className='instruction__promo__price'>899₽</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    }
                })}
              </div>
            ))}
          </div>
      </div>
    );
  }


  render() {
    const { horizontalPromo } = this.state;
    const { instruction, location } = this.props;
    const { title } = instruction;
    const showLawyerBanner = location.search.indexOf('utm=lawyer') >= 0;
    const showHelpBanner = location.search.indexOf('utm=wrong_inst') >= 0;
    return (
      <div className="App">
      {this.state.loading && <Loader />}
      {!this.state.loading && instruction && 
        <div>
          <span>{instruction.description}</span>
          {this.renderFilter()}
          {this.renderStages()}
        </div>
      }
      </div>
    );
  }

}

export default connect(withInstruction(Instruction));




/* 
    return (
      <div className="App">
      {loading && <Loader />}
      {!loading && instruction && 
        <div>
          <span>{instruction.description}</span>
          {renderFilter()}
          {renderStages()}
        </div>
      }
      </div>
    );
}
  
  export default Instruction; */