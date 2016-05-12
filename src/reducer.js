import {
  setState,
  addCompetition,
  updateCompetition,
  removeCompetition,
  addPlacingToCompetition,
  updatePlacingToCompetition,
  removePlacingToCompetition,
  INITIAL_STATE
} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.newState);
  }

  return state;
}
