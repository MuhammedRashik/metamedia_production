export const decodeDataFromHeaders = (headers: any) => {
  const { decodedTokenData } = headers;
  console.log(decodedTokenData, "decodedTokenData");
  if (decodedTokenData.user) {
    const userId =
      decodedTokenData?.user?._id ||
      decodedTokenData?.user?.response?._id;
    return userId;
  } else {
    return { status: false, message: "user Not Exist" };
  }
};
