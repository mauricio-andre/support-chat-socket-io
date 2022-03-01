import { Request, Response } from 'express';
import MessageService from '../services/MessageService';

class MessagesController {
  async create(request: Request, response: Response) {
    const { userId, adminId, text } = request.body;
    const messageService = new MessageService();

    const message = await messageService.create({
      userId,
      adminId,
      text,
    });

    return response.json(message);
  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messageRepository = new MessageService();

    const list = await messageRepository.listByUser(id);

    return response.json(list);
  }
}

export default MessagesController;
