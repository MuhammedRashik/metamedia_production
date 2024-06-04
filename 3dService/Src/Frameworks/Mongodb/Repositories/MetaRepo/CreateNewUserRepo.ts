import Meta from "../../Database"

export default {
  
    createNewUser:async(data:any)=>{
        const {userId}=data
        
      try {
        const userexist=await Meta.findOne({userId})
        if(userexist){
            return {status:false,message:"User already Exist"}
        }

        const newuser=await Meta.create({
            userId:userId
        })
        if(newuser){
            return  {status:true,data:newuser}
        }else{
            return {status:false,message:"Creation Failed ..!"}
        }

      } catch (error) {
        return {status:false,message:`Something Went Wrong..! ${error}`}
      }
    }
};