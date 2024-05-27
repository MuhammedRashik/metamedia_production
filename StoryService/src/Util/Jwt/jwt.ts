export const decodeDataFromHeaders = (headers: any) => {
  const { decodedTokenData } = headers;
  console.log(decodedTokenData,"decodedTokenData");
  
  console.log(decodedTokenData.user?.response?.basicInformation,"decodedTokenData");
  
    if (decodedTokenData.user) {
      const userId = decodedTokenData?.user?._id ||  decodedTokenData?.user?.user?._id || decodedTokenData.user.response?.basicInformation.userId
            return userId
  }else{
    return {status:false , message:"user Not Exist"}
  }
};