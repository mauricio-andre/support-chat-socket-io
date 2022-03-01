import { getCustomRepository } from 'typeorm';
import Connection from '../entities/Connection';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socketId: string;
  userId: string;
  adminId?: string;
  id?: string;
}

class ConnectionService {
  private connectionsRepository: ConnectionsRepository;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socketId, userId, adminId, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socketId,
      userId,
      adminId,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(userId: string) {
    const connection = this.connectionsRepository.findOne({ userId });

    return connection;
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { adminId: null },
      relations: ['user'],
    });

    return connections;
  }

  async findBySocketId(socketId: string) {
    const connection = await this.connectionsRepository.findOne({ socketId });
    return connection;
  }

  async updateAdminId(userId: string, adminId) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ adminId })
      .where('userId = :userId', { userId })
      .execute();
  }
}

export default ConnectionService;
