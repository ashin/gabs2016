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

function getLevels(beers){
	return beers.map(beer => beer.levelName).reduce(function(arr, curr) {
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
				return isFoundIn(val, beer.brewer) || isFoundIn(val, beer.name) || isFoundIn(val, beer.style) || isFoundIn(val, beer.character) || isFoundIn(val, beer.desc);
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
	},
	level: {
		id: 'level',
		name: 'level',
		type: 'select',
		values: getLevels(BEERS),
		filter: function (val) {
			return function(beer) {
				return beer.levelName === val
			}
		}
	},

};

let filtering = {};

let sorters = {
	pos: {
		id: 'pos',
		name: 'position',
		sort: (a, b) => (a.pos - b.pos)
	},
	abv: {
		id: 'abv',
		name: 'alcohol',
		sort: (a, b) => (a.abv - b.abv)
	},
	price: {
		id: 'price',
		name: 'price',
		sort: (a, b) => (a.glass.cost - b.glass.cost)
	}
};

function constructFilter (filtering) {
	const filteringArr = filtering.toList();
	return function(beer) {
		return filteringArr
			.map(filter => {
				const filterFunc = filters[filter.id].filter;
				return filter.val ? filterFunc(filter.val)(beer) : true;
			})
			.reduce((state, filterResult) => {
				return (state === false) ? false : filterResult;
			}, true);
	}
}

export const INITIAL_STATE = Map({
  beers: List(BEERS),
  filters: Map(filters),
  filtering: Map(filtering),
  sorters: Map(sorters),
  sortBy: Object.keys(sorters)[0],
  sortingDirection: 'DESC' // should be constant but fuck it #drunk
});

export function setState (state, newState) {
  return state.merge(fromJS(newState));
};

export function setFiltering (state, filterId, val) {
	let newState = state.setIn(['filtering', filterId], { 'id': filterId, 'val': val });
	return newState;
};

export function setSortBy (state, sortId) {
	let newState = state.set('sortBy', sortId);
	return newState;
};

export function setShowing (state, toShow) {
	let newState = state.set('showing', toShow);
	return newState;
};

export function toggleSortDir (state) {
	let newVal = state.get('sortingDirection') === 'ASC' ? 'DESC' : 'ASC';
	let newState = state.set('sortingDirection', newVal);
	return newState;
};

export function filterBeers (beers, filtering) {
	const filterBeers = constructFilter(filtering);
	return beers.filter(filterBeers);
}

export function sortBeers (beers, sortBy, sortDir) {
	const sortFn = sorters[sortBy].sort;
	let sortedBeers = beers.sort(sortFn);
	return (sortDir === 'ASC') ? sortedBeers.reverse() : sortedBeers;
}