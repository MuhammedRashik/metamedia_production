import express ,{Express} from 'express'
//write only express frame work things 
const expresscofig=(app:Express):void=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

export default expresscofig
//hi