export const initialState = {
  canvasList: [
    {
      id: 'canvas-1',
      title: 'Canvas 1',
      order: 1,
      single: false,
      windows: [
        {
          type: 'url',
          content: {
            url: 'https://docs.google.com/spreadsheets/d/12HBaG2yxOSQsM5VaUrSHRTjl5S7pgr1W07e0ZHhzFwA/edit#gid=369566078',
          },
          id: 'canvas-1window-1',
          layout:  {i: 'canvas-1window-1', x: 0, y: 0, w: 4, h: 6}
        },
        {
          type: 'url',
          content: {
            url: 'https://falconcloud9.github.io/food-menu/',
          },
          id: 'canvas-1window-2',
          layout:  {i: 'canvas-1window-2', x: 0, y: 8, w: 12, h: 8}
        },
      ],
    },
    {
      id: 'canvas-2',
      title: 'Canvas 2',
      order: 2,
      single: true,
      windows: [
        {
          type: 'coverpage',
          content: {header: "Best Wishes", title: "Happy Birthday Madhuri", body: "May all of your dream come true, with full of happiness", footer: "Positive Vibes"},
          id: 'canvas-1window-2',
          layout:  {i: 'canvas-1window-2', x: 6, y: 0, w: 6, h: 8}
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
    case 'FETCH_WALLBOARD_DATA':
      newState.canvasList = payload;
      return payload;
    default:
      return state;
  }
};

export default canvas;
