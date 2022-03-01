import Connection from '../entities/Connection';
import { io } from '../http';
import ConnectionService from '../services/ConnectionService';
import MessageService from '../services/MessageService';
import UsersService from '../services/UserService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', socket => {
  const usersService = new UsersService();
  const connectionService = new ConnectionService();
  const messageService = new MessageService();

  socket.on('clientFirstAccess', async params => {
    const socketId = socket.id;
    const { text, email } = params as IParams;

    let user = await usersService.findByEmail(email);
    if (!user) {
      user = await usersService.create(email);
    }

    let connection = await connectionService.findByUserId(user.id);
    if (!connection) {
      connection = {
        socketId,
        userId: user.id,
      } as Connection;
    }

    connection.socketId = socketId;
    await connectionService.create(connection);

    await messageService.create({
      text,
      userId: user.id,
    });

    const allMessages = await messageService.listByUser(user.id);
    socket.emit('clientListAllMessages', allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit('adminListAllUsers', allUsers);
  });

  socket.on('clientSendToAdmin', async params => {
    const { text, socketAdminId: socketId } = params;

    const { userId } = await connectionService.findBySocketId(socket.id);

    const message = await messageService.create({
      text,
      userId,
    });

    io.to(socketId).emit('adminReceiveMessage', {
      message,
      socketId,
    });
  });
});
