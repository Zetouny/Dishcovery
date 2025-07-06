import express from 'express';
import {
  addUser,
  login,
  auth,
  logOut
} from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.post('/', addUser);
userRouter.post('/login', login);
userRouter.get('/auth', auth);
userRouter.post('/logout', logOut);

export default userRouter;
