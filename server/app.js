import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { MongoClient, ServerApiVersion } from 'mongodb';
import usersRouter from './routes/users.js';
import favoritesRouter from './routes/favorites.js';

const app = express();
export const mongoClient = new MongoClient(process.env.MONGODB_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/api/users', usersRouter);
app.use('/api/favorites', favoritesRouter);

app.get('/*path', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error loading application');
  }
});

export default app;
