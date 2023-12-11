import express from 'express';
import { createSuperUser } from './user.controllers.js';

const router = express.Router();
router.get('/', createSuperUser);

export default router;
