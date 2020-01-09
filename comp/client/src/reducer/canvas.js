export const initialState = {
  canvasList: [
    { 
      id: 'canvas-1',
      title: 'Canvas 1',
      order: 1,
      windows: [
        {
          type: 'url',
          title: 'window-1',
          url: 'https://falconcloud9.github.io/food-menu/',
          id: 'canvas-1window-1',
          layout:  {i: 'canvas-1window-1', x: 0, y: 0, w: 3, h: 4}
        },
        {
          type: 'text',
          title: 'window-2',
          content: {header: "Best Wishes", title: "Happy Birthday Madhuri", body: "May all of your dream come true, with full of happiness", footer: "Positive Vibes"},
          id: 'canvas-1window-2',
          layout:  {i: 'canvas-1window-2', x: 3, y: 10, w: 3, h: 4}
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
