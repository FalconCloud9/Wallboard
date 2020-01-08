export const initialState = {
  windows: ['yo']
};

const window = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  const payload = action.payload;
  switch (action.type) {
    case 'SAVE_WINDOWS':
      newState.windows = payload;
      return newState;
    default:
      return state;
  }
};

export default window;
