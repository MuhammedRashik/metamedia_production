import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
    const authMiddlewawre=(req: Request,res: Response,next: NextFunction)=>{
        console.log("AUTH MIDDLEWARE")
        console.log("STORYYYY")        
        console.log(`API Endpoint: ${req?.path}, Method: ${req?.method}`);
        console.log(process.env.ACCESS_SECRET_KEY,"process.env.ACCESS_SECRET_KEY");
        
        if(!req.headers.authorization){
            res.status(401).json('Authorization header required');
        }else{
            try{
                const token = req.headers.authorization.split(' ')[1];
                const decode:any = jwt.verify(token, process.env.ACCESS_SECRET_KEY!)
                console.log(decode,"decodedata");
                
                if (req.headers) {
                    req.headers.decodedTokenData = decode;
                }else{
                    res.status(400).json('Token not found');
                }
                console.log("Token verified")
                next();
            }catch(err){
                console.log("Catch in authMiddleware ==>",err);
                res.status(401).json('Invalid access token');
            }
        }
    }

export default authMiddlewawre;