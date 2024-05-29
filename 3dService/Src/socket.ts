import { Server, Socket } from 'socket.io';

interface User {
  userId: string;
  socketId: string;
  position: { x: number; y: number; z: number };
}

const socketConfig = (io: Server) => {
  let users: User[] = [];

  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('addNewUserToMeta', (data: { userId: string; position: { x: number; y: number; z: number } }) => {
      const { userId, position } = data;
      const isUserExist = users.find((user) => user.userId === userId);

      if (!isUserExist) {
        const user: User = { userId, socketId: socket.id, position };
        users.push(user);
        console.log('Adding new user', user);
      } else {
        isUserExist.socketId = socket.id;
        isUserExist.position = position;
        console.log('Updating socket ID and position for existing user', isUserExist);
      }

      io.emit('updateUsers', users);
    });

    socket.on('setUserPosition', (data: { userId: string; position: { x: number; y: number; z: number } }) => {
      const { userId, position } = data;
      const user = users.find((user) => user.userId === userId);

      if (user) {
        user.position = position;
        console.log('User position updated', user);
        io.emit('updateUsers', users);
      }
    });

    

    socket.on('disconnect', () => {
      users = users.filter((user) => user.socketId !== socket.id);
      console.log(`User disconnected: ${socket.id}`);
      io.emit('updateUsers', users);
    });
  });
};

export default socketConfig;
