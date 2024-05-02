import { Request, Response } from "express";
export default (dependecies: any) => {
  const { selectNewCharactorUseCase } = dependecies.useCase;
  const  selectNewCharactorController= async (req: Request, res: Response) => {

    const {userId,charactorName}=req.body
    const data = { userId,charactorName};

    const response = await selectNewCharactorUseCase(dependecies).executeFunction(data);
    if (response.status) {
      res.status(200).json({ status: true, data: response.data });
    } else {
      res.status(400).json({ status: false,message:response.message});
    }
  };
  return selectNewCharactorController;
};