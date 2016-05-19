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
const USER_STATES = [
	'good',
	'meh',
	'bad',
	'want',
	'-'
];

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
	rating: {
		id: 'rating',
		name: 'rating',
		type: 'select',
		values: USER_STATES,
		filter: function (val) {
			var ind = USER_STATES.indexOf(String(val));
			return function(beer) {
				return String(beer.userState) === String(ind);
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
	},
	rating: {
		id: 'rating',
		name: 'rating',
		sort: (a, b) => {
			let aState = a.userState ? Number(a.userState) : 4;
			let bState = b.userState ? Number(b.userState) : 4;
			return aState - bState;
		}
	}
};

let beerUserStates = (function() {
	let current = JSON.parse(localStorage.getItem('gabsuserstate')) || {};
	const set = (val) => localStorage.setItem('gabsuserstate', JSON.stringify(val));
	const update = function(key, val) {
		current[key] = val;
		set(current);
	}
	return {
		set,
		update,
		current
	}
})();

function insertUserStatesIntoBeer(states, beers) {
	Object.keys(states).forEach(function (beerId) {
		const ind = Number(beerId);
		beers[ind].userState = parseInt(states[beerId]);
	});
	return beers;
}
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

function filterBeers (beers, filtering) {
	const filterBeers = constructFilter(filtering);
	return beers.filter(filterBeers);
}

function sortBeers (beers, sortBy, sortDir) {
	const sortFn = sorters[sortBy].sort;
	let sortedBeers = beers.sort(sortFn);
	return (sortDir === 'ASC') ? sortedBeers.reverse() : sortedBeers;
}

function buildFilteredBeersFromState (state) {
	// TODO: this should be in it's own store and sub to the other changes to rebuild itself
	const beers = state.get('beers');
	const filtering = state.get('filtering');
	const sortBy = state.get('sortBy');
	const sortingDirection = state.get('sortingDirection');
	return sortBeers(filterBeers(beers, filtering), sortBy, sortingDirection);
}

function buildInitialState () {
	const beersWithStates = insertUserStatesIntoBeer(beerUserStates.current, BEERS);
	const state = Map({
	  beers: List(beersWithStates),
	  filteredBeers: List([]),
	  filters: Map(filters),
	  filtering: Map(filtering),
	  sorters: Map(sorters),
	  sortBy: Object.keys(sorters)[0],
	  sortingDirection: 'DESC'
	});

	return state.set('filteredBeers', buildFilteredBeersFromState(state));
};

export const INITIAL_STATE = buildInitialState();

export function setState (state, newState) {
  return state.merge(fromJS(newState));
};

export function setFiltering (state, filterId, val) {
	let newState = state.setIn(['filtering', filterId], { 'id': filterId, 'val': val });
	return newState.set('filteredBeers', buildFilteredBeersFromState(newState));
};

export function setSortBy (state, sortId) {
	let newState = state.set('sortBy', sortId);
	return newState.set('filteredBeers', buildFilteredBeersFromState(newState));
};

export function setShowing (state, toShow) {
	const CURRENTLY_SHOWING = state.get('showing');
	let newVal = toShow === CURRENTLY_SHOWING ? null : toShow;
	let newState = state.set('showing', newVal);
	return newState;
};

export function toggleSortDir (state) {
	let newVal = state.get('sortingDirection') === 'ASC' ? 'DESC' : 'ASC';
	let newState = state.set('sortingDirection', newVal);
	return newState.set('filteredBeers', buildFilteredBeersFromState(newState));
};

export function setBeerState (state, pos, beerState) {
	const beerInd = Number(pos);
	let newState = state.updateIn(['beers', beerInd], (beer) => Object.assign({}, beer, {'userState': beerState}) );
	beerUserStates.update(Number(pos), beerState);

	return newState.set('filteredBeers', buildFilteredBeersFromState(newState));
};