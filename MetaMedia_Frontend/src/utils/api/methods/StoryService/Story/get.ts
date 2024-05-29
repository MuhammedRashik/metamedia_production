import { GetAllStories_Api, GetStories_Api } from "../../../endpoints/common";
import axios from "axios"


export const getStoriesFunction = () => {
  try {
    return axios.get(GetStories_Api);
  } catch (error) {
    return error;
  }
};

export const getAllStoriesFunction = () => {
  try {
    return axios.get(GetAllStories_Api);
  } catch (error) {
    return error;
  }
};
