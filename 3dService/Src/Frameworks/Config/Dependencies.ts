
import {MetaRepo,CreateNewUserRepo,SelectNewCharactorRepo,UserOnlineStatusUpdateRepo} from '../Mongodb/Repositories'
import {getUserDataByIdUseCase,createNewUserUseCase,selectNewCharactorUseCase,userOnlineStatusUpdateUseCase} from '../../Applications/UseCases'

const useCase:any={
    getUserDataByIdUseCase,
    createNewUserUseCase,
    selectNewCharactorUseCase,
    userOnlineStatusUpdateUseCase
}
const repositery:any={
    MetaRepo,
    CreateNewUserRepo,
    SelectNewCharactorRepo,
    UserOnlineStatusUpdateRepo
}


export default {
    useCase,repositery
}