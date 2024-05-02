import { Request, Response } from "express";
export default (dependecies: any) => {
  const { userOnlineStatusUpdateUseCase } = dependecies.useCase;
  const  userOnlineStatusUpdateController= async (req: Request, res: Response) => {

    const {userId,status}=req.body
    const data = {userId,status};

    const response = await userOnlineStatusUpdateUseCase(dependecies).executeFunction(data);
    if (response.status) {
      res.status(200).json({ status: true, data: response.data });
    } else {
      res.status(400).json({ status: false,message:response.message});
    }
  };
  return userOnlineStatusUpdateController;
};