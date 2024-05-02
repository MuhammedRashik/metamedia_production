export const userOnlineStatusUpdateUseCase=(dependencies:any)=>{
    const {  repositery: { UserOnlineStatusUpdateRepo  }} = dependencies;
    const executeFunction=async(data:any)=>{ 
        const response =await UserOnlineStatusUpdateRepo.userOnlineStatusUpdate(data)
        if(response.status){
            return {status:true,data:response.data}
        }else{
            return {status:false,message:response.message}
        } 
    }
    return {executeFunction} 
}
