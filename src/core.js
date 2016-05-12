import {List, Map, fromJS} from 'immutable';
import BEERS from './data/2016';

let filters = {

};
export const INITIAL_STATE = Map({
  beers: List(BEERS),
  filters: Map(filters)
});

export function setState (state, newState) {
  return state.merge(fromJS(newState));
}