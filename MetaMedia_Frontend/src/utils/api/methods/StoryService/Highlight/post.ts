import {
  AddNewHighlight_Api,
  DeleteHighlight_Api,
} from "../../../endpoints/common";
import axios from "axios"


export const addNewHighlightFunction = (data: any) => {
  try {
    return axios.post(AddNewHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

export const DeleteHighlightFunction = (data: any) => {
  try {
    return axios.post(DeleteHighlight_Api, data);
  } catch (error) {
    return error;
  }
};
