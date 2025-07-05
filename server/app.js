import express from 'express';
import { MongoClient } from 'mongodb';
import usersRouter from './routes/users.js';
// import messagesRouter from './routes/messages.js';

const app = express();
export const mongoClient = new MongoClient(process.env.MONGODB_URL);

app.use(express.json());
app.use('/users', usersRouter);
// app.use('/messages', messagesRouter);

export default app;
