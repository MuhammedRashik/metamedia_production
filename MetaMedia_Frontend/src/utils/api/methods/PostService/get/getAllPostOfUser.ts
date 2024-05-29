import { getUserPosts_Api } from "../../../endpoints/common";
import axios from "axios"
export const getAllPostOfUserFunction = (userId: any) => {
  try {
    return axios.get(`${getUserPosts_Api}?id=${userId}`);
  } catch (error) {
    return error;
  }
};
