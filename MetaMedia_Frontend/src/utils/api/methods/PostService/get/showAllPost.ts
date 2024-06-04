import { showAllPost_Api } from "../../../endpoints/common";
import axios from "axios"
export const showAllPostFuntion = async () => {
  try {
    const response = await axios.get(`${showAllPost_Api}`);
    return response.data;
  } catch (error) {
    return error
  }
};
