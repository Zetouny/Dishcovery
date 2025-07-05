import 'dotenv/config';
import crypto from 'crypto';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mongoClient } from '../app.js';

export const USERS_DATABASE = [];
const SALTS_ROUND = 12;
const TOKEN_KEY = process.env.TOKEN_KEY;

export const addUser = async (req, res) => {
  const { username, password } = req.body;

  const isValidUser = validateUser(username, password, res);
  if (!isValidUser) return;

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('dishcovery').collection('users');

    const findUser = await collection.findOne({
      username: new RegExp(`^${username}$`, 'i')
    });

    if (findUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const userData = {
      id: crypto.randomUUID(),
      username,
      password: await hash(password, SALTS_ROUND)
    };

    await collection.insertOne(userData);

    res.json({ id: userData.id, username });
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('dishcovery').collection('users');

    const findUser = await collection.findOne({
      username: new RegExp(`^${username}$`, 'i')
    });

    if (!findUser) {
      return res.status(404).json({ error: 'Username/password is incorrect' });
    }

    const comparePassword = await compare(password, findUser.password);
    if (!comparePassword) {
      return res.status(404).json({ error: 'Username/password is incorrect' });
    }

    const userData = {
      id: findUser.id
    };

    const token = jwt.sign(userData, TOKEN_KEY);
    res.json({ token });
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
};

const validateUser = (username, password, res) => {
  if (!username || !password) {
    res.status(400).json({ error: 'Missing request body' });
    return;
  }

  if (username.length < 3) {
    res
      .status(400)
      .json({ error: "User's username should be at least 3 characters long" });
    return;
  }

  if (password.length < 8) {
    res
      .status(400)
      .json({ error: "User's password should be at least 8 characters long" });
    return;
  }

  return true;
};
