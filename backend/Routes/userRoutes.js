import express from 'express';
import auth from '../middleware/auth.js';
import { register , login , getUsers , deleteUser , getSingleUser , updateUser} from '../controller/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', auth(['admin']), getUsers);
router.get('/users/:id', auth(['admin']), getSingleUser);
router.delete('/users/:id', auth(['admin']), deleteUser);
router.put('/users/:id', auth(['admin']), updateUser);

export default router;
