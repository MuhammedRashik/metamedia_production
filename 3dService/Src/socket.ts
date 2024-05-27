import { Server, Socket } from 'socket.io';

const socketConfig = (io: any) => {
  let users: any[] = [];

  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Adding new user to virtual world
    socket.on("addNewUserToMeta", (data: any) => {
      const { userId, position } = data;
      const isUserExist = users.find((user: any) => user.userId === userId);

      if (!isUserExist) {
        const user = { userId, socketId: socket.id, position: position };
        users.push(user);
        console.log("Adding new user", user);
      } else {
        isUserExist.socketId = socket.id; 
        isUserExist.position = position;
        console.log("Updating socket ID and position for existing user", isUserExist);
      }

      // Notify all users about the new user
      io.emit("updateUsers", users);
    });

    // Set position for the user
    socket.on("setUserPosition", (data: any) => {
      const { userId, position } = data;
      const user = users.find((user: any) => user.userId === userId);

      if (user) {
        user.position = position;
        console.log("User position updated", user);

        // Notify all users about the updated position
        io.emit("updateUsers", users);
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      users = users.filter((user: any) => user.socketId !== socket.id);
      console.log(`User disconnected: ${socket.id}`);

      // Notify all users about the updated list
      io.emit("updateUsers", users);
    });
  });
}

export default socketConfig;
