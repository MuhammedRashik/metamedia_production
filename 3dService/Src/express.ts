import express, { Express,Request,Response } from "express";
import cors from "cors";
import path from 'path'
const cookieParser = require("cookie-parser");

import session, { SessionOptions, MemoryStore } from "express-session";
const expresscofig = (app: Express): void => {

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));


 
  app.use(
    cors({
      origin:["https://meta-media.in", "http://localhost:5173"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );


  
};

export default expresscofig;
