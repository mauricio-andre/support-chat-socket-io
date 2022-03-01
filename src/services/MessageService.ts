import { getCustomRepository } from 'typeorm';
import MessagesRepository from '../repositories/MessagesRepository';

interface IMessageCreate {
  adminId?: string;
  text: string;
  userId: string;
}

class MessageService {
  private messagesRepository: MessagesRepository;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ adminId, userId, text }: IMessageCreate) {
    const message = this.messagesRepository.create({
      userId,
      text,
      adminId,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(userId: string) {
    const list = await this.messagesRepository.find({
      where: { userId },
      relations: ['user'],
    });

    return list;
  }
}

export default MessageService;
