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