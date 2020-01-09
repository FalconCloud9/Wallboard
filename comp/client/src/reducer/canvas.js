export const initialState = {
  canvasList: [
    {
      id: 'canvas-1',
      title: 'Canvas 1',
      order: 1,
      single: false,
      windows: [
        {
          title: 'window-1',
          url: 'https://docs.google.com/spreadsheets/d/12HBaG2yxOSQsM5VaUrSHRTjl5S7pgr1W07e0ZHhzFwA/edit#gid=369566078',
          id: 'canvas-1window-1',
          layout:  {i: 'canvas-1window-1', x: 0, y: 0, w: 3, h: 4},
          type: 'url'
        }
      ],
    },
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
