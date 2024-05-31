import http from 'http'
import serverConfig from './server'
import connectDB from '../Config/db.connect'
import {routes} from './Adapters/Routes/Index'
import config from '../Config/Config'
import expresscofig from './express'
// import express from 'express'
import dependencies from '../Src/Frameworks/Config/Dependencies'
import dotenv from 'dotenv'
const cookieParser = require("cookie-parser");
import express, { Express,Request,Response } from "express";
import cors from "cors";
import path from 'path'
import session, { SessionOptions, MemoryStore } from "express-session";
import socketConfig from './socket'
import {ExpressPeerServer} from 'peer'
import { error } from 'console'
const app=express()



const PEER_PATH = '/myapp';


const server=http.createServer(app)
dotenv.config()
connectDB(config)
const store = new MemoryStore();
expresscofig(app)
export const io: any = require('socket.io')(server, {
  cors: { origin: ["https://meta-media.in",'http://localhost:5173'] }
});




const peerServer = ExpressPeerServer(server, {
  path:'/peerjs'
});


peerServer.on('connection', (client) => {
  console.log('PEER IS CONNECTED',client);
});

peerServer.on('disconnect', (client) => {
  console.log('PEER IS DISCONNECTED',client);
});

peerServer.on('error', (error) => {
  console.log('PEER HAS ERROR:', error);
});





socketConfig(io)


app.use(
    cors({
      origin: ["https://meta-media.in",'http://localhost:5173'],
      methods: [  "GET,HEAD,PUT,PATCH,POST,DELETE"], 
    credentials: true

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

app.use('/peerjs', peerServer);

app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()
