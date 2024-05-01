import { Request, Response } from "express";
export default (dependecies: any) => {
  const { createNewUserUseCase } = dependecies.useCase;
  const createNewUserController = async (req: Request, res: Response) => {

    const {userId}=req.body
    const data = { userId};

    const response = await createNewUserUseCase(dependecies).executeFunction(data);
    console.log(response,'HI----');
    
    if (response.status) {
      res.status(200).json({ status: true, data: response.data });
    } else {
      res.status(400).json({ status: false,message:response.message});
    }
  };
  return createNewUserController;
};