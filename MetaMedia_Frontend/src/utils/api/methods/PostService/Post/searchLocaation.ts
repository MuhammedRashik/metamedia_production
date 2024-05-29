import { SearchLocation_Api } from "../../../endpoints/common";
import axios from "axios"
export const searchLocationFuntion = async (data: string) => {
  const bakendData = {
    data: data,
  };

  const response = await axios.post(SearchLocation_Api, bakendData);

  return response.data;
};
