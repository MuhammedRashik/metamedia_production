import { GetAllUsers_Api, GetAllUsersData_Api, GetSearchUserData_Api ,Suggetion_Api} from "../../endpoints/common";
import axios from "axios"

export const getAllUsersFunction = async () => {
    try {
      const response = await axios
        .get(GetAllUsers_Api);
      return response.data;
    } catch (error) {
      return error;
    }
  };


export const getAllUsersDataFunction = async () => {
    try {
      const response = await axios
        .get(GetAllUsersData_Api);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const GetSearchUserDataFunction = async (user:string) => {
    try {
      const response = await axios
        .get(`${GetSearchUserData_Api}/${user}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const suggetionFuntion = async (userId:any) => {
    try {
      const response = await axios
        .get(`${Suggetion_Api}?userId=${userId}`);

      return response.data;
    } catch (error) {
      return error;
    }
  };

