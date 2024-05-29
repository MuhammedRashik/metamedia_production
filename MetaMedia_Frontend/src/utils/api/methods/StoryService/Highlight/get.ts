import { GetHighlightData_Api } from "../../../endpoints/common";

export const GetHighlightData = (userId: string) => {
  try {
    return axios.get(`${GetHighlightData_Api}/${userId}`);
  } catch (error) {
    return error;
  }
};
