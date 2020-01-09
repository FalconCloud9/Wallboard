export const initialState = {
  canvasList: [
    { 
      id: 'canvas-1',
      title: 'Canvas 1',
      order: 1,
      windows: [
        {
          title: 'window-1',
          url: 'https://weather.com/',
          id: 'canvas-1window-1',
          layout:  {i: 'canvas-1window-1', x: 0, y: 0, w: 4, h: 4}
        }
      ],
    }
  ]
};

const canvas = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  const payload = action.payload;
  switch (action.type) {
    case 'SAVE_CANVAS':
      newState.canvasList = payload;
      return newState;
    default:
      return state;
  }
};

export default canvas;
