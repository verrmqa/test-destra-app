import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Loader from '../../../containers/Loader';

import { fetchUser } from '../redux/actions';

export default function (WrappedComponent) {
  const mapStateToProps = ({ auth }) => ({ user: auth.user });
  const mapDispatchToProps = dispatch => bindActionCreators({ fetchUserDispatcher: fetchUser }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(class WithAuth extends Component {
    static propTypes = {
      user: PropTypes.object,
      location: PropTypes.object,
      fetchUserDispatcher: PropTypes.func,
    };

    constructor() {
      super();

      this.state = { loading: true };
    }

    componentDidMount() {
      const { user, fetchUserDispatcher } = this.props;

      if (!user) fetchUserDispatcher().then(() => this.setState({ loading: false }));
      else this.setState({ loading: false });
    }

    render() {
      const { user, location } = this.props;
      const { pathname } = location;
      const { loading } = this.state;

      if (loading) return <Loader />;

      const isAuthChildComponent = pathname.includes('auth');

      if (!user && !isAuthChildComponent) return <Redirect to='/auth/login' />;
      if (user && isAuthChildComponent) return <Redirect to='/account/documents' />;

      return <WrappedComponent {...this.props} />;
    }
  }));
}
