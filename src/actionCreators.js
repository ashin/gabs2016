export function setState(state) {
  return {
    type: 'SET_STATE',
    newState: state
  };
}