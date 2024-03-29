import { Request, Response } from 'express';
import SettingsService from '../services/SettingsService';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;
    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({ chat, username });

      return response.json(settings);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { chat } = request.body;
    const { username } = request.params;

    const settingsService = new SettingsService();

    await settingsService.update(username, chat);

    return response.status(201).send();
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUserName(username);

    return response.json(settings);
  }
}

export default SettingsController;
