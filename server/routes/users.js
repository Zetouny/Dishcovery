import express from 'express';
import {
  addUser,
  login,
  auth,
  logOut,
  favorites
} from '../controllers/usersController.js';
const userRouter = express.Router();

userRouter.post('/', addUser);
userRouter.post('/login', login);
userRouter.get('/auth', auth);
userRouter.post('/logout', logOut);
userRouter.get('/favorites', favorites);

export default userRouter;
