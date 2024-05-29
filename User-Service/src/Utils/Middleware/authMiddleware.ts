import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
    const authMiddleware=(req: Request,res: Response,next: NextFunction)=>{
        console.log(`API Endpoint: ${req?.path}, Method: ${req?.method}`);
        
        if(!req.cookies.accessToken){
            res.status(401).json('Authorization header required');
        }else{
            try{
                const token = req.cookies.accessToken
                if(!token){
                    res.status(400).json('Token not found');
                }
                const decode:any = jwt.verify(token, process.env.ACCESS_SECRET_KEY!)
                console.log(decode,"decode");
                
                if (req.headers && decode) {
                    req.headers.decodedTokenData = decode;
                    console.log("Token verified")
                    next();
                }
            }catch(err){
                console.log("Catch in authMiddleware ==>",err);
                res.status(401).json('Invalid access token');
            }
        }
    }

export default authMiddleware;