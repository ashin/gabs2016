import {List, Map, fromJS} from 'immutable';
import BEERS from './data/2016';


function getStates(beers){
	return beers.map(beer => beer.state).reduce(function(arr, curr) {
		if(arr.indexOf(curr) === -1) {
			arr.push(curr);
		}
		return arr;
	}, []);
}

function isFoundIn(isThis, inThis) {
	return (String(inThis).toLowerCase().indexOf(String(isThis).toLowerCase()) > -1);
}

let filters = {
	search: {
		id: 'search',
		name: 'search',
		type: 'text',
		filter: function(val) {
			return function(beer) {
				return isFoundIn(val, beer.brewer) || isFoundIn(val, beer.name);
			}
		}
	},
	state: {
		id: 'state',
		name: 'state',
		type: 'select',
		values: getStates(BEERS),
		filter: function (val) {
			return function(beer) {
				return beer.state === val
			}
		}
	}
};

let filtering = {
}

function constructFilter (filtering) {
	const filteringArr = filtering.toList();
	return function(beer) {
		return filteringArr
			.map(filter => {
				const filterFunc = filters[filter.id].filter;
				return filterFunc(filter.val)(beer);
			})
			.reduce((state, filterResult) => {
				return (state === false) ? false : filterResult;
			}, true);
	}
}
export function objectToArray (obj) {
	return Object.keys(obj).map(objKey => obj[objKey])
}
export const INITIAL_STATE = Map({
  beers: List(BEERS),
  filters: Map(filters),
  filtering: Map(filtering)
});

export function setState (state, newState) {
  return state.merge(fromJS(newState));
}

export function setFiltering (state, filterId, val) {
	let newState = state.setIn(['filtering', filterId], { 'id': filterId, 'val': val });
	return newState;
};

export function filterBeers (beers, filtering) {
	const filterBeers = constructFilter(filtering);
	return beers.filter(filterBeers);
}