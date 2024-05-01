
import express from 'express'

import MetaControllers from '../../Controllers/MetaControllers'

export default (dependencies:any)=> {

    const {
        GetUserDataByIdController,
        CreateNewUserController,
        SelectNewCharactorController,
        UserOnlineStatusUpdateController

    
    }= MetaControllers(dependencies)





    const router = express()
    
    router.get('/getUserDataById',GetUserDataByIdController)
    router.post('/createNewUser',CreateNewUserController)
    router.post("/selectNewCharactor",SelectNewCharactorController)
    router.post("/userOnlineStatusUpdate",UserOnlineStatusUpdateController)
    return router
}