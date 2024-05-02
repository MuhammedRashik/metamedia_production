export const selectNewCharactorUseCase=(dependencies:any)=>{
    const {  repositery: { SelectNewCharactorRepo  }} = dependencies;
    const executeFunction=async(data:any)=>{ 
        const response =await SelectNewCharactorRepo.SelectNewCharactor(data)
        if(response.status){
            return {status:true,data:response.data}
        }else{
            return {status:false,message:response.message}
        } 
    }
    return {executeFunction} 
}
