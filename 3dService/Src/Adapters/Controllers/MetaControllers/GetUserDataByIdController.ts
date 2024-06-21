import { Request, Response } from "express";

export default (dependecies: any) => {
  const {  getUserDataByIdUseCase } = dependecies.useCase;
  const getUserDataBtIdController = async (req: Request, res: Response) => {
    const {userId}=req.query
    const data = { userId};

    const response = await getUserDataByIdUseCase(dependecies).executeFunction(data);
    if (response.status) {
      res.status(200).json({ status: true, data: response.data });
    } else {
      res.status(400).json({ status: false,message:response.message});
    }
  };
  return getUserDataBtIdController;
};
