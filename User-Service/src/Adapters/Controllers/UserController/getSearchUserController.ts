import { NextFunction, Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependecies: any) => {
  const { getSearchUser_Usecase } = dependecies.useCase;
  const getSearchUserController = async (req: Request, res: Response, next:NextFunction) => {  
    try {
      console.log("getSearchUserController");
      console.log(req.params,"req.params");
      
      const {user} = req.params
      console.log(user,"userSEARCHED");
      
      const userId = await decodeDataFromHeaders(req.headers)  
      console.log(userId,"deco userId");
        
      if(userId){
      const response = await getSearchUser_Usecase(dependecies).executeFunction(user,userId);
      console.log(response,"responceresponce");
      if (response.status) {
        res.status(200).json({ status: true, data: response.data });
      } else {
        res.status(400).json({ status: false });
      }
    }else{
      res.status(400).json({ status: false, message:"User not found" });
    } 
    } catch (error) {
      console.log(error,"EEEEEE");
      next(error)
    }
  };
  return getSearchUserController;
};