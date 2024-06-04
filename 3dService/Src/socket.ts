import { Server, Socket } from 'socket.io';

interface User {
  userId: string;
  socketId: string;
  position: { x: number; y: number; z: number };
  peerId: string;
}

const socketConfig = (io: Server) => {
  let users: User[] = [];

  io.on('connection', (socket: Socket) => {

    socket.on('addNewUserToMeta', (data: { userId: string; position: { x: number; y: number; z: number }, peerId: string }) => {
      const { userId, position, peerId } = data;
      const isUserExist:any = users.find((user) => user.userId === userId);

      if (!isUserExist) {
        const user: User = { userId, socketId: socket.id, position, peerId };
        users.push(user);
      } else {
        isUserExist.socketId = socket.id;
        isUserExist.position = position;
        isUserExist.peerId = peerId;
      }

      io.emit('updateUsers', users);
    });

    socket.on('setUserPosition', (data: { userId: string; position: { x: number; y: number; z: number } }) => {
      const { userId, position } = data;
      const user = users.find((user) => user.userId === userId);

      if (user) {
        user.position = position;
        io.emit('updateUsers', users);
      }
    });

    socket.on('disconnect', () => {
      users = users.filter((user) => user.socketId !== socket.id);
      io.emit('updateUsers', users);
    });
  });
};

export default socketConfig;
