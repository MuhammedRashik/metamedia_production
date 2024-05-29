import { UpdateComment_Api } from "../../../endpoints/common";
import axios from "axios"

export const UpdateCommentFuntion = async (data: any) => {
  try {
    const response = await axios.post(UpdateComment_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
