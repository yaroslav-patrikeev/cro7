import express from 'express';
import {
  createSuperUser,
  createUser,
  getAllUsers,
  getUser,
} from './user.controllers.js';
import { createUserValidator } from './user.validation.js';

const router = express.Router();

router.get('/user', getUser);
router.post('/create', createUserValidator, createUser);
router.get('/all', getAllUsers);
router.get('/create-super', createSuperUser);

export default router;
