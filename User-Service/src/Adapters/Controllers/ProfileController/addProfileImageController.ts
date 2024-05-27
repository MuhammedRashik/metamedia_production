import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependencies:any)=>{
    const {useCase:{AddProfileImageUsecase}}=dependencies
    const AddProfileImageController=async (req:Request,res:Response)=>{
      console.log("AddProfileImageController");
      
      const userId = await decodeDataFromHeaders(req.headers)    
      if(userId){
          const imageUrl=req?.file?.filename
          console.log(imageUrl,"imageUrl");
          
          const response = await AddProfileImageUsecase(dependencies).executeFunction(imageUrl,userId);
          if (response) {
            console.log( response.status,  response.message ,response?.data ,"dataaa");
            
            res.json({ status: response.status, message: response.message ,data:response?.data });
          }
        } else {
          res.json({ status: userId.status, message: userId.message });
        }

    }
    return AddProfileImageController
}