import { io } from '../http';
import ConnectionService from '../services/ConnectionService';
import MessageService from '../services/MessageService';

io.on('connect', async socket => {
  const messagesService = new MessageService();
  const connectionService = new ConnectionService();

  const allConnectionsWithoutAdmin =
    await connectionService.findAllWithoutAdmin();

  io.emit('adminListAllUsers', allConnectionsWithoutAdmin);

  socket.on('adminListMessagesByUser', async (params, callback) => {
    const { userId } = params;

    const allMessages = await messagesService.listByUser(userId);

    callback(allMessages);
  });

  socket.on('adminSendMessage', async params => {
    const { userId, text } = params;

    await messagesService.create({
      text,
      userId,
      adminId: socket.id,
    });

    const { socketId } = await connectionService.findByUserId(userId);

    io.to(socketId).emit('adminSendToClient', { text, socketId: socket.id });
  });

  socket.on('adminUserInSupport', async params => {
    const { userId } = params;
    const connection = await connectionService.updateAdminId(userId, socket.id);

    const allConnectionsWithoutAdmin =
      await connectionService.findAllWithoutAdmin();

    io.emit('adminListAllUsers', allConnectionsWithoutAdmin);
  });
});
