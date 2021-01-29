import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const previousLocation = prevProps.location;

    if (location.pathname !== previousLocation.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter(ScrollToTop);
