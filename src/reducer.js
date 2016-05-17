import {
  setState,
  setFiltering,
  setSortBy,
  toggleSortDir,
  INITIAL_STATE
} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.newState);
    case 'SET_FILTERING':
      return setFiltering(state, action.filterId, action.val);
    case 'SET_SORT_BY':
      return setSortBy(state, action.sortId);
    case 'TOGGLE_SORT_DIR':
      return toggleSortDir(state);
    default:
      return state;
  }

  return state;
}
