import { ReportPost_Api } from "../../../endpoints/common";
import axios from "axios"

export const ReportPostFunction = async (data: any) => {
  try {
    const response = await axios.post(ReportPost_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
