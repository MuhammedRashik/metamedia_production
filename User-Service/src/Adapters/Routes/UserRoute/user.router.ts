import express from 'express'
import {profileController, userController} from '../../Controllers'
import { upload } from '../../../Utils/Multer/multer'
import authMiddleware from '../../../Utils/Middleware/authMiddleware'

export default (dependencies:any)=>{
    const router=express()
    const {chooseInterestController,getUserDataController,ChangeUserStatusController,followUserController,getSearchUserController,getAllUsersDataController,getAllUserForChatController,getUsersDataByIdController,getUsersByNameController,getUserById_Controller,savePostController,suggetionController,generatevapidKeysController,SubcribeToAwsSNSController,BlockAndUnblockUserController}=userController(dependencies)
    const {addProfileController,editProfileController,addProfileImageController}=profileController(dependencies)

    router.post('/getUserData' , getUserDataController)
    router.get('/getAllUsers' , authMiddleware , getAllUsersDataController)
    router.get('/getSearchUser/:user' , authMiddleware , getSearchUserController)
    router.post('/addProfile' , authMiddleware , addProfileController)
    router.post('/editProfile' , authMiddleware , editProfileController)
    router.post('/chooseInterest' , authMiddleware , chooseInterestController)
    router.post('/addProfileImage' , authMiddleware , upload.single("file") , addProfileImageController)
    router.post("/followUser" , authMiddleware , followUserController)
    router.get("/getAllUsersForChat" , authMiddleware , getAllUserForChatController)
    router.post('/getUsersByname' , authMiddleware , getUsersByNameController)
    router.post('/getUserById' , authMiddleware , getUserById_Controller)
    router.post('/getUsersDataById' , authMiddleware , getUsersDataByIdController)
    router.post('/changeUserStatus' , authMiddleware , ChangeUserStatusController)
    router.post('/savePost' , authMiddleware , savePostController)
    router.get('/suggetions' , authMiddleware , suggetionController)
    router.post('/BlockAndUnblockUser' , authMiddleware , BlockAndUnblockUserController)
    router.post("/vapidKeys" , authMiddleware , generatevapidKeysController)
    router.post("/subscribe" , authMiddleware , SubcribeToAwsSNSController)

    return router
}