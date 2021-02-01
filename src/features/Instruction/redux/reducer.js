import { COMPONENT_INSTRUCTION_FETCH } from './types';

const initialState = {
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPONENT_INSTRUCTION_FETCH:
      return Object.assign({}, state, { item: action.item });
    default:
      return state;
  }
};
