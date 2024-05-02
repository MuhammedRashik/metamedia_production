import Meta from "../../Database"

export default {
  
    SelectNewCharactor:async(data:any)=>{
        const {userId,charactorName}=data
      try {
        const response=await Meta.findOneAndUpdate({userId},{
            charactorName:charactorName
        },{new:true})
        if(response){
            return {status:true,data:response}
        }else{
            return {status:false,message:"Charactor updation failed..!"}
        }

      } catch (error) {
        return {status:false,message:`Something Went Wrong..! ${error}`}
      }
    }


};