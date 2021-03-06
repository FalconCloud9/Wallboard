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
            url: ' https://docs.google.com/spreadsheets/d/e/2PACX-1vS92wk2sSv5h3tbHf1gdpIVuQx9cHe0Lq_Hkq3mHrTyF9Rc3xVHGWX6OH6ko2_olSrxcNKO2Qn3Vorj/pubhtml',
          },
          id: 'canvas-1window-1',
          layout:  {i: 'canvas-1window-1', x: 0, y: 0, w: 6, h: 8},
        },
        {
          type: 'twitter',
          content: {
            twitterHandle: 'theCloudfactory',
          },
          id: 'canvas-1window-2',
          layout:  {i: 'canvas-1window-2', x: 6, y: 0, w: 6, h: 8}
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
          content: {header: "Best Wishes", title: "Happy Birthday Tim Pham", body: "May all of your dreams come true, with full of happiness", footer: "Positive Vibes"},
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
