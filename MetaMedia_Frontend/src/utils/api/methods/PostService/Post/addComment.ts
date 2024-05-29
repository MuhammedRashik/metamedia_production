import { AddComent_Api } from "../../../endpoints/common";
import axios from "axios"

export const AddCommentFunction = async (data: any) => {
  try {
    const response = await axios.post(AddComent_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
