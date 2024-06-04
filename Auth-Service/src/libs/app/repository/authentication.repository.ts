import { verifyHashPassword } from "../../../helper";
import schema from "../database/schema";
export default {
  userEmailExist: async (email: string) => {
    try {
      const responce = await schema.Auth.findOne({
        "basicInformation.email": email,
      });
      return responce;
    } catch (error) {
       return error
    }
  },

  createUser: async (data: any) => {
    const userData = {
      "basicInformation.fullName": data.name,
      "profile.profileUrl": data.profile,
      "basicInformation.email": data.email,
      "basicInformation.password": data.password,
      "basicInformation.isGoogle": data.isGoogle,
      "basicInformation.isFacebook": data.isFacebook,
    };
    const response = await schema.Auth.create(userData);
    if (response) {
      return { status: true, message: "user created sucessfull", response };
    } else {
      return { status: false, message: "user cretion failed" };
    }
  },
  finduser: async (email: string) => {
    try {
      const finduser = await schema.Auth.findOne({
        "basicInformation.email": email,
      });

      if (finduser) {
        return { status: true, user: finduser };
      } else {
        return { status: false };
      }
    } catch (error) {
      return error
    }
  },
  changePassword: async (email: string, hashedPassword: string,oldPassword:string) => {
    
    const user:any = await schema.Auth.findOne(
      { "basicInformation.email": email });
      const isVerified = await verifyHashPassword(oldPassword,user?.basicInformation?.password)
      if(isVerified){
        const passwordChange = await schema.Auth.findOneAndUpdate(
          { "basicInformation.email": email },
          { $set: { "basicInformation.password": hashedPassword } },
          { new: true }
        );
        if (passwordChange) {
          return { status: true, message: "Password Changed" };
        } else {
          return { status: false, message: "Password Error" };
        }
      }else{
        return { status: false, message: "Old Password is Wrong" };
      }
  },

  createInterest: async (data: any, id: string) => {
    try {

      const createInterest = await schema.Auth.findOneAndUpdate(
        { _id: id },
        { $set: { "profile.interests": data } }
      );
      if (createInterest) {
        return { status: true, message: "Interest added" };
      }
      return { status: false, message: "Internal error" };
    } catch (error) {

      return error;
    }
  },

  getuserbyId: async (id: any) => {
    try {
      const user = await schema.Auth.findById(id);
      if (user) {
        return { status: true, user };
      } else {
        return { status: false };
      }
    } catch (error) {

      return { status: false, error };
    }
  },

  ChangeUserStatus: async (userId: string, status: boolean) => {
    const user: any = await schema.Auth.findById(userId);

    if (user) {
      const response: any = await schema.Auth.findByIdAndUpdate(
        userId,
        { $set: { "basicInformation.blocked": status } },
        { new: true }
      );

    }
  },
};
