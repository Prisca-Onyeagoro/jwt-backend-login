import express from 'express';
import {
  deleteGoals,
  getGoals,
  postGoals,
  updateGoals,
} from '../Controller/Goalcontroller.js';
import { Protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.route('/').get(Protect, getGoals).post(Protect, postGoals);
router.route('/:id').put(Protect, updateGoals).delete(Protect, deleteGoals);

export default router;
