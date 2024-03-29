import { Router } from 'express';
import MessagesController from '../controllers/messagesController';
import SettingsController from '../controllers/SettingsController';
import UsersController from '../controllers/UsersControllers';

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post('/settings', settingsController.create);
routes.put('/settings/:username', settingsController.update);
routes.get('/settings/:username', settingsController.findByUsername);
routes.post('/users', usersController.create);
routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByUser);

export default routes;
