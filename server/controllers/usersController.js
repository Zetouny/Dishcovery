import 'dotenv/config';
import crypto from 'crypto';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mongoClient } from '../app.js';

const SALTS_ROUND = 12;
const TOKEN_KEY = process.env.TOKEN_KEY;
const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_USERS = process.env.MONGODB_USERS;

export const addUser = async (req, res) => {
  const { username, password } = req.body;

  const isValidUser = validateUser(username, password, res);
  if (!isValidUser) return;

  try {
    await mongoClient.connect();
    const COLLECTION = mongoClient.db(MONGODB_DB).collection(MONGODB_USERS);

    const findUser = await COLLECTION.findOne({
      username: new RegExp(`^${username}$`, 'i')
    });

    if (findUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const userData = {
      id: crypto.randomUUID(),
      username,
      password: await hash(password, SALTS_ROUND),
      favorites: []
    };

    await COLLECTION.insertOne(userData);

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
    const COLLECTION = mongoClient.db(MONGODB_DB).collection(MONGODB_USERS);

    const findUser = await COLLECTION.findOne({
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
      id: findUser.id,
      username: findUser.username
    };

    const token = jwt.sign(userData, TOKEN_KEY, { expiresIn: '15d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days in milliseconds
    });

    res.json(userData);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
};

export const auth = async (req, res) => {
  const token = req?.cookies?.token;

  if (!token) return res.json(null);

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);

    res.json(decoded);
  } catch (err) {
    return res.sendStatus(401);
  }
};

export const logOut = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });
  res.json({ message: 'Logged out' });
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
