import { Router } from 'express';
import UserController from './Controllers/UserController';

const router = Router();
router.get('/users', UserController.index);
router.get('/users/:id', UserController.indexById);
router.get('/usersByEmail', UserController.indexByEmail);
router.post('/users', UserController.create);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);

export default router;
