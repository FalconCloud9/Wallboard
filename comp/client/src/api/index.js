import axios from 'axios';
import store from "../store";
import { fetchWallboardData } from "../action";

const base_url = "http://localhost:3000";

export const getWallboardData = async (name) => {
  const response = await axios.get(`${base_url}/wallboard/engineering`);
  const data = response.data
  console.log("data :: ", data, name)
  let canvasinfo = { canvasList: [] }
  if (data.Data && data.Data.length > 0) {
    canvasinfo = data.Data[0].wallboard.data
  }
  console.log({ canvasinfo })
  // return response.data.wallboard.data;
  store.dispatch(fetchWallboardData(canvasinfo));
};
