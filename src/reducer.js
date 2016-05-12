import {
  setState,
  setFiltering,
  INITIAL_STATE
} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.newState);
    case 'SET_FILTERING':
      return setFiltering(state, action.filterId, action.val);
    default:
      return state;
  }

  return state;
}
