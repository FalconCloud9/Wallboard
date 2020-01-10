import axios from 'axios';
import store from "../store";
import { fetchWallboardData } from "../action";

const base_url = "http://localhost:3000";

export const getWallboardData = async (departnemtName) => {
  const response = await axios.get(`${base_url}/wallboard/${departnemtName}`);
  const data = response.data;
  let canvasinfo = { canvasList: [] }
  if (data.Data && data.Data.length > 0) {
    canvasinfo = data.Data[0].wallboard
  }
  store.dispatch(fetchWallboardData(canvasinfo));
};
