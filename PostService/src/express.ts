import express, { Express,Request,Response } from "express";
import cors from "cors";
import path from 'path'
// const cookieParser = require("cookie-parser");

import session, { SessionOptions, MemoryStore } from "express-session";
const expresscofig = (app: Express): void => {

  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  // app.use(cookieParser(process.env.COOKIEPARSERSECRET));

  // app.use('/api/post/img', express.static('public/img')) 
 
  // app.use(
  //   cors({
  //     origin:"http://meta-media.in",
  //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //     credentials: true,
  //   })
  // );


  
};

export default expresscofig;
