import { ReplayToComment_Api } from "../../../endpoints/common";

export const AddReplayToCommentFunction = async (data: any) => {
  try {
    const response = await axios.post(ReplayToComment_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
