import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../config/config'
import getDb from '../config/db'
import express, { NextFunction, Request, Response } from 'express'
import {routes} from './adapters/routes'
import dependencies from './frameworks/config/dependencies'
import { Server, Socket } from 'socket.io';
import { debounceMiddleware } from './events/DebouncingMiddleware'
import expressConfig from './express'
import socketConfig from './socket'
import { chatConsumer } from './events/KafkaConsumer'
const app=express()
expressConfig(app)  
dotenv.config()
getDb(config) 
const server=http.createServer(app)
export const io: Server = require('socket.io')(server, {
  cors: { origin: 'https://meta-media.in' }
});  
socketConfig()
 chatConsumer(dependencies)
 
 app.use('/api/chat/chat', express.static('public/chat')) 
app.use(debounceMiddleware)
app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()