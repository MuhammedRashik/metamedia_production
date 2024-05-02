export const createNewUserUseCase=(dependencies:any)=>{
    const {  repositery: { CreateNewUserRepo  }} = dependencies;
    const executeFunction=async(data:any)=>{ 
        const response =await CreateNewUserRepo.createNewUser(data)
        if(response.status){
            return {status:true,data:response.data}
        }else{
            return {status:false,message:response.message}
        } 
    }
    return {executeFunction} 
}
