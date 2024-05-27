import { Server, Socket } from 'socket.io';

const socketConfig = (io:any) => {
  let users:any = [];

  io.on("connection", (socket:Socket) => {

    // Adding new user to virtual world
    socket.on("addNewUserToMeta", (data: any) => {
        const { userId, position } = data;
        const isUserExist = users.find((user: any) => user.userId === userId);
  
        if (!isUserExist) {
          const user = { userId, socketId: socket.id, position: position };
          users.push(user);
          console.log("adding new user", user);
        } else {
          isUserExist.socketId = socket.id; 
          isUserExist.position = position
          console.log("updating socket ID for existing user", isUserExist);
        }
  
        // Notify all users about the new user
        console.log(users,'THIS IS UPDATED USERS');
        
        io.emit("updateUsers", users);
      });


    // Set position for the user
    socket.on("setUserPosition", (data: any) => {
        const { userId, position} = data;
        const user = users.find((user: any) => user.userId === userId);
        
        if (user) {
            console.log(user,'00');
            user.position =position
           


        //   user.position = position;
          io.emit("userPositionUpdated", { userId, position });
        }
      });

    // Handle user disconnection
    socket.on("disconnect", () => {
      users = users.filter((user:any) => user.socketId !== socket.id);
      io.emit("updateUsers", users);
    });
  });
}

export default socketConfig;
