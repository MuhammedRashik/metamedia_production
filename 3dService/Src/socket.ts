import { Server, Socket } from 'socket.io';
import dependencies from './Frameworks/Config/Dependencies';


const socketConfig = (io:any)=>{
 let users:any=[];
 io.on("connection",(socket:Socket)=>{

    //adding new user to virtual world
    socket.on("addNewUserToMeta", (data: any) => {
        const { userId } = data;
        const isUserExist = users.find((user: any) => user.userId === userId);
        
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            console.log("adding new user", user);
            users.push(user);
        } else {
            isUserExist.socketId = socket.id;
            console.log("updating socket ID for existing user", isUserExist);
        }
    });


    //set possition for the user
    socket.on("setUserPossition",(data:any)=>{
        // const {}
    })










    socket.on("disconnect", () => {
        users = users.filter((user:any) => user.socketId !== socket.id);
    });
 })

}

export default socketConfig