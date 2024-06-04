export const chooseInterest_Usecase = (dependecies: any) => {
    
  const {
    repository: { userRepository }
  } = dependecies;
  const executeFunction = async (data: any, userId: string) => {

    const response = await userRepository.createInterest(data, userId);
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};
