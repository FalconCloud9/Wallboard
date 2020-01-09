import axios from 'axios';
import store from "../store";
import { fetchWallboardData } from "../action";

const base_url = "http://localhost:3000";

export const getWallboardData = async (name) => {
  const sample = {
    canvasList: [
      {
        id: 'canvas-1',
        title: 'Canvas 1',
        order: 1,
        windows: [
          {
            title: 'window-1',
            url: 'https://www.example.com',
            id: 'canvas-1window-1',
            layout: { i: 'canvas-1window-1', x: 0, y: 0, w: 3, h: 4 }
          }
        ],
      },
      {
        id: 'canvas-2',
        title: 'Canvas 2',
        order: 1,
        windows: [
          {
            title: 'window-1',
            url: 'https://falconcloud9.github.io/collections/waterify/',
            id: 'canvas-1window-1',
            layout: { i: 'canvas-1window-1', x: 0, y: 0, w: 3, h: 4 }
          }
        ],
      },
      ,
      {
        id: 'canvas-3',
        title: 'Canvas 3',
        order: 1,
        windows: [
          {
            title: 'window-1',
            url: 'https://falconcloud9.github.io/food-menu/',
            id: 'canvas-1window-1',
            layout: { i: 'canvas-1window-1', x: 0, y: 0, w: 3, h: 4 }
          }
        ],
      }
    ]
  }
  // const response = await axios.get(`${base_url}/wallboard/${name}`);
  // return response.data;
  store.dispatch(fetchWallboardData(sample));
};
