export const getUserDataByIdUseCase=(dependencies:any)=>{
    const {  repositery: { MetaRepo  }} = dependencies;
    const executeFunction=async(data:any)=>{ 
        const response =await MetaRepo.getUserDataById(data)
        if(response.status){
            return {status:true,data:response.data}
        }else{
            return {status:false,message:response.message}
        } 
    }
    return {executeFunction} 
}
