import express ,{Express} from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
const expresscofig=(app:Express):void=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.COOKIEPARSERSECRET));
    app.use(express.static('public/'))
    app.use(
        cors({
          origin: 'https://meta-media.in',
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true,
        })
      );
     
    
}

export default expresscofig 