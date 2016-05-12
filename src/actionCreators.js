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