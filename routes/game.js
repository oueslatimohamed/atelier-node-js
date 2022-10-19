import express from 'express';
import { body } from 'express-validator';

import { getAll, addOnce, getOnce, putOnce } from '../controllers/game.js';

import multer from '../middleware/multer-config.js';
  
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(multer,addOnce);

router
  .route('/:id')
  .get(getOnce)
  .put(putOnce);
  
export default router;