import express from 'express';
import cookieParser from 'cookie-parser';
import { MongoClient } from 'mongodb';
import usersRouter from './routes/users.js';
import favoritesRouter from './routes/favorites.js';

const app = express();
export const mongoClient = new MongoClient(process.env.MONGODB_URL);

app.use(express.json());
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/favorites', favoritesRouter);

export default app;
