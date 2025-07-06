import express from 'express';
import {
  getFavorites,
  addFavorite
} from '../controllers/favoritesController.js';

const favoritesRouter = express.Router();

favoritesRouter.get('/', getFavorites);
favoritesRouter.post('/', addFavorite);

export default favoritesRouter;
