export const saveCanvas = (canvasList) => ({
  type: 'SAVE_CANVAS',
  payload: canvasList,
});

export const fetchWallboardData = (canvasList) => ({
  type: 'FETCH_WALLBOARD_DATA',
  payload: canvasList,
});
