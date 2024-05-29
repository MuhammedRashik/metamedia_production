import { DeletePost_Api } from "../../../endpoints/common";
import axios from "axios"

export const DeletePostFuntion = async (data: any) => {
  try {
    const response = await axios.post(DeletePost_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
