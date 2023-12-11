import express from 'express';
import { cancelLunch, signUpForLunch } from './lunch.controllers.js';

const router = express.Router();

router.put('/add', signUpForLunch);
router.put('/delete', cancelLunch);

export default router;
