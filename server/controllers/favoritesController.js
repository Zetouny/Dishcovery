import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { mongoClient } from '../app.js';

const TOKEN_KEY = process.env.TOKEN_KEY;

export const getFavorites = async (req, res) => {
  const token = req?.cookies?.token;

  if (!token) return res.json(null);

  try {
    const decodedToken = jwt.verify(token, TOKEN_KEY);

    await mongoClient.connect();
    const collection = mongoClient.db('dishcovery').collection('users');

    const findUser = await collection.findOne({ id: decodedToken.id });

    if (!findUser) {
      return res
        .status(404)
        .json({ error: 'Invalid User, Please login again' });
    }

    res.json(findUser.favorites);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
};

export const updateFavorite = async (req, res) => {
  const { favoriteId } = req.body;

  if (!favoriteId) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const token = req?.cookies?.token;

  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = jwt.verify(token, TOKEN_KEY);

    await mongoClient.connect();
    const collection = mongoClient.db('dishcovery').collection('users');

    const findUser = await collection.findOne({ id: decodedToken.id });

    if (!findUser) {
      return res
        .status(404)
        .json({ error: 'Invalid User, Please login again' });
    }

    const favorites = findUser.favorites;

    if (favorites.includes(favoriteId)) {
      const updateFavorite = await collection.updateOne(
        { id: decodedToken.id },
        { $pull: { favorites: favoriteId } }
      );

      return res.json(updateFavorite);
    } else {
      const updateFavorite = await collection.updateOne(
        { id: decodedToken.id },
        { $addToSet: { favorites: favoriteId } }
      );

      return res.json(updateFavorite);
    }
  } catch (error) {
  } finally {
    await mongoClient.close();
  }
};
