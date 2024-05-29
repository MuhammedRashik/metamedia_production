import { ChangePostStatus_Api, ChangeUserStatus_Api } from "../../endpoints/common";
import axios from 'axios'
export const ChangeUserStatusFunction = async (data:any) => {
  try {
    return axios.post(ChangeUserStatus_Api, data);
  } catch (error) {
    return error;
  }
};
export const ChangePostStatusFunction = async (data:any) => {
  try {
    return axios.post(ChangePostStatus_Api, data);
  } catch (error) {
    return error;
  }
};