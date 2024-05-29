import { SavePost_api } from "../../../endpoints/common";
import axios from "axios"

export const SavePostFunction = async (data: any) => {
  try {
    const response = await axios.post(SavePost_api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
