import { GetLikedAndComentedPost_Api } from "../../../endpoints/common";
import axios from "axios"
export const GetLikedAndComentedPostFunction = (userId: any) => {
  try {
    return axios.get(`${GetLikedAndComentedPost_Api}?id=${userId}`);
  } catch (error) {
    return error;
  }
};
