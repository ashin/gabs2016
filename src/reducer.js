import {
  setInitialState,
  setFiltering,
  setSortBy,
  toggleSortDir,
  setShowing,
  setBeerState,
  INITIAL_STATE
} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'SET_INITIAL_STATE':
      return setInitialState(state);
    case 'SET_FILTERING':
      return setFiltering(state, action.filterId, action.val);
    case 'SET_SORT_BY':
      return setSortBy(state, action.sortId);
    case 'TOGGLE_SORT_DIR':
      return toggleSortDir(state);
    case 'SET_SHOWING':
      return setShowing(state, action.toShow);
    case 'SET_BEER_STATE':
      return setBeerState(state, action.pos, action.beerState);
    default:
      return state;
  }

  return state;
}