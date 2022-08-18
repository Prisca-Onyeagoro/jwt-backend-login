import React from 'react';
import express from 'express';
import {
  GetMe,
  LoginUser,
  RegisterUser,
} from '../Controller/UserController.js';
import { Protect } from '../middleware/authmiddleware.js';
const router = express.Router();

router.post('/', RegisterUser);
router.post('/login', LoginUser);
router.get('/me', Protect, GetMe);

export default router;
