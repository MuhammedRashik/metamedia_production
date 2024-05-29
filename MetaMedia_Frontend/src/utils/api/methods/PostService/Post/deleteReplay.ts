import { DeleteReplay_Api } from "../../../endpoints/common";
import axios from "axios"

export const DeleteReplayFunction = async (data: any) => {
  try {
    const response = await axios.post(DeleteReplay_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
