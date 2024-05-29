import { getLatAndLong_Api } from "../../../endpoints/common";
import axios from "axios"

export const getLatAndLogFuntion = async (data: string) => {
  const bakendData = { id: data };
  const response = await axios.post(getLatAndLong_Api, bakendData);

  return response.data;
};
