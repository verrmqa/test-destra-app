import './Auth.style.css';
import './Auth.widescreen.css';
import './Auth.tablet.css';
import './Auth.mobile.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Layout from '../../containers/Layout';
import Header from '../../containers/Header';
import Footer from '../../containers/Footer';

import withAuth from './hoc/withAuth';
import useHelmet from '../../../helpers/useHelmet';

const Auth = ({ location, route }) => {
  const { routes } = route;

  if (location.pathname === '/auth') return <Redirect to='/auth/login' />;

  const [helmetParams, Helmet] = useHelmet({
    title: 'Юридический сервис destra | Destra',
    description: 'Destra ➡ пошаговые инструкции по решению юридических задач, юридический онлайн-сервис с подробными инструкциями по наиболее популярным проблемам, требующим услуг юриста',
    url: `${location.pathname}`
  });


  return (
    <Layout helmet={<Helmet {...helmetParams} />}>
      <Header template='contacts' />
      <div className='auth'>
        <div className='auth__section-form'>
          {renderRoutes(routes)}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};
export default connect()(withAuth(Auth));
