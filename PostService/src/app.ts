import http from 'http'
import serverConfig from './server'
import connectDB from '../config/db.connect'
import {routes} from './Adapter/Routes'
import config from '../config/config'
import expresscofig from './express'
import dependencies from './frameworks/config/dependencies'
import dotenv from 'dotenv'
const cookieParser = require("cookie-parser");
import express, { Express,Request,Response } from "express";
import cors from "cors";
import path from 'path'
import session, { SessionOptions, MemoryStore } from "express-session";
  

const app=express()
const server=http.createServer(app)
dotenv.config()
connectDB(config)
const store = new MemoryStore();
expresscofig(app)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIEPARSERSECRET));
app.use(
    cors({
      origin:"https://meta-media.in",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
  app.use( 
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      },
      store: store,
    } as SessionOptions)
  );
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('public/'))
app.use('/api/post/img', express.static('public/img')) 

app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()
  