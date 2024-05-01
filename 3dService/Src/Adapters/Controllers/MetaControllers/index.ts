import GetUserDataByIdController from "./GetUserDataByIdController";
import CreateNewUserController from "./CreateNewUserController";
import SelectNewCharactorController from "./SelectNewCharactorController";
import UserOnlineStatusUpdateController from "./UserOnlineStatusUpdateController";
export default (dependencies:any)=>{
    return {
        GetUserDataByIdController:GetUserDataByIdController(dependencies),
        CreateNewUserController:CreateNewUserController(dependencies),
        SelectNewCharactorController:SelectNewCharactorController(dependencies),
        UserOnlineStatusUpdateController:UserOnlineStatusUpdateController(dependencies),
        
    }
}