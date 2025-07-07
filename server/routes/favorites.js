import express from 'express';
import {
  getFavorites,
  updateFavorite
} from '../controllers/favoritesController.js';

const favoritesRouter = express.Router();

favoritesRouter.get('/', getFavorites);
favoritesRouter.put('/', updateFavorite);

export default favoritesRouter;
