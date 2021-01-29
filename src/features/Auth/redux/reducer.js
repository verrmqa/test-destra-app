import { COMPONENT_AUTH_IDENTIFY, COMPONENT_AUTH_OPEN, COMPONENT_AUTH_CLOSE } from './types';

const initialState = {
  show: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPONENT_AUTH_IDENTIFY:
      return Object.assign({}, state, { user: action.user });
    case COMPONENT_AUTH_OPEN:
      return Object.assign({}, state, { show: action.view });
    case COMPONENT_AUTH_CLOSE:
      return Object.assign({}, state, { show: false });
    default:
      return state;
  }
};
