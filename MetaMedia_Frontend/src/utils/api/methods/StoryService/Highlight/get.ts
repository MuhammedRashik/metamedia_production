import { GetHighlightData_Api } from "../../../endpoints/common";
import axios from "axios"

export const GetHighlightData = (userId: string) => {
  try {
    return axios.get(`${GetHighlightData_Api}/${userId}`);
  } catch (error) {
    return error;
  }
};
