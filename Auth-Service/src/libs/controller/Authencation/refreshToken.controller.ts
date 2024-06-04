import {Request,Response} from 'express'
export default (dependencies:any)=>{
    const { useCase: { refreshTokenUsecase }} = dependencies;
const refreshToken=async(req:Request,res:Response)=>{
    const reference=await refreshTokenUsecase(dependencies)
    const {executeFunction}=reference
    const token = req.session.refreshToken
         if(!token)return  res.status(403).json('token is not found')
         const NewAccessToken=await executeFunction(token)
         if(!NewAccessToken.status) return res.status(203).json(NewAccessToken.message)
            res.cookie("accessToken", NewAccessToken.accessToken, {
                httpOnly: false,
                secure: true,
              });
         res.status(200).json({status:true,token:NewAccessToken.accessToken})
}

return refreshToken

}