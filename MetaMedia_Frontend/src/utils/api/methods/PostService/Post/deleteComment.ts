import { DeleteComment_Api } from "../../../endpoints/common";
import axios from "axios"

export const DeleteCommentFuntion = async (data: any) => {
  try {
    const response = await axios.post(DeleteComment_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
