import Meta from "../../Database"

export default {
  
    getUserDataById:async(data:any)=>{
        const {userId}=data
      try {
        const response=await Meta.findOne({userId})
        if(response){
            return {status:true,data:response}
        }else{
            return {status:false,message:"No User found ..!"}
        }

      } catch (error) {
        return {status:false,message:`Something Went Wrong..! ${error}`}
      }
    }


};