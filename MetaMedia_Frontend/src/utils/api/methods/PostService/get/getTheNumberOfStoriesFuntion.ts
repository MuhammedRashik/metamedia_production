import { getTheNumberOfStories_Api } from "../../../endpoints/common";
import axios from "axios"
export const getTheNumberOfStoriesFuntion = () => {
  try {
    return axios.get(getTheNumberOfStories_Api);
  } catch (error) {
    return error;
  }
};
