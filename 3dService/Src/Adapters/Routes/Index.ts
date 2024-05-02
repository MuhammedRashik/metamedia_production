import express from "express";
import metaRouter from "./MetaRouter/Meta.router";

export const  routes=(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/meta',metaRouter(dependencies))
    return routes
}