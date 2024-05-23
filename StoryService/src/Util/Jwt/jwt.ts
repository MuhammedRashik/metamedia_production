export const decodeDataFromHeaders = (headers: any) => {
  const { decodedTokenData } = headers;
  console.log(decodedTokenData,"decodedTokenData");
  
    if (decodedTokenData.user) {
    const userId = decodedTokenData?.user?.user?._id;
    return userId
  }else{
    return {status:false , message:"user Not Exist"}
  }
};