
import { COMPONENT_INSTRUCTION_FETCH } from './types';
import { getInstruction } from '../../../services/instructionService';

import encrypt from '../../../helpers/encrypt';

export const fetchInstruction = instruction => dispatch => getInstruction(instruction)
  .then((data) => {
    dispatch({ type: COMPONENT_INSTRUCTION_FETCH, item: encrypt(data) });
  });
