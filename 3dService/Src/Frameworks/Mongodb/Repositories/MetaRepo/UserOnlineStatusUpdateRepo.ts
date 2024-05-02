import Meta from "../../Database"

export default {
  
    userOnlineStatusUpdate:async(data:any)=>{
        const {userId,status}=data
      try {
        const response=await Meta.findOneAndUpdate({userId},{
           status:status
        },{new:true})
        if(response){
            return {status:true,data:response}
        }else{
            return {status:false,message:"Status updation failed..!"}
        }

      } catch (error) {
        return {status:false,message:`Something Went Wrong..! ${error}`}
      }
    }


};