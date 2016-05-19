export function setState(state) {
  return {
    type: 'SET_STATE',
    newState: state
  };
}

export function setFiltering(filterId, val) {
	return {
		type: 'SET_FILTERING',
		filterId,
		val
	}
}

export function setSortBy(sortId) {
	return {
		type: 'SET_SORT_BY',
		sortId
	}
}

export function toggleSortDir() {
	return {
		type: 'TOGGLE_SORT_DIR'
	}
}

export function setShowing(toShow) {
	return {
		type: 'SET_SHOWING',
		toShow
	}
}

export function setBeerState(pos, state){
	return {
		type: 'SET_BEER_STATE',
		pos,
		beerState: state
	}
}