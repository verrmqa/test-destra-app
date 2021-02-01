import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import generateFilter from '../../../helpers/generateFilter';
import decrypt from '../../../helpers/decrypt';

import Loader from '../../Loader';

import { fetchInstruction } from '../redux/actions';
import compileInstruction from '../../../helpers/compileInstruction';
import isWindowDefined from '../../../helpers/isWindowDefined';


export default function (WrappedComponent) {
  const mapStateToProps = ({ category, instruction }) => ({
    instruction: instruction.item,
    categories: category.items
  });
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchInstructionDispatcher: fetchInstruction,
  }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(class WithInstruction extends Component {
    static propTypes = {
      instruction: PropTypes.string,
      fetchInstructionDispatcher: PropTypes.func,
      match: PropTypes.object,
      location: PropTypes.object,
      staticContext: PropTypes.object
    };

    static fetchData = (store, request) => {
      const url = request.params[0].split('/');
      const promises = [
        store.dispatch(fetchInstruction(url[url.length - 1])),
      ];

      return Promise.all(promises);
    }

    constructor(props) {
      super();

      const { match, instruction } = props;
      console.log(instruction)
      const { params } = match;
      const { slug } = params;
      let decrypted;
      if (instruction) decrypted = decrypt(instruction);

      this.slug = slug;
      this.state = {
        loading: !decrypted || (isWindowDefined() && decrypted.slug !== slug)
      };
    }

    componentDidMount() {
      const { loading } = this.state;
      const { fetchInstructionDispatcher } = this.props;

      if (loading) {
        Promise.all([
          fetchInstructionDispatcher(this.slug),
        ]).then(() => this.setState({ loading: false }));
      }
    }

    render() {
      const { instruction, location, match } = this.props;
      const { loading } = this.state;
      const { params } = match;
      const { categorySlug } = params;
      let decrypted;
      if (instruction) decrypted = decrypt(instruction);

      if (loading) {
        // Loader here
        return <Loader />;
      }

      if (!decrypted || decrypted.name === 'Error' || decrypted.category.slug !== categorySlug) {
        return <span>404</span>;
      }

      const filter = generateFilter(decrypted, location);
      const compiled = compileInstruction(decrypted, filter);
      const props = {
        ...this.props,
        instruction: compiled,
        filter
      };

      return <WrappedComponent {...props} />;
    }
  });
}
