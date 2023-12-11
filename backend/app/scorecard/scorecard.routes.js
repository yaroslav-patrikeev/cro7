import express from 'express';
import {
  createPattern,
  createScorecards,
  deletePattern,
  getAllPatterns,
  getAllScorecards,
  updatePattern,
} from './scorecard.controllers.js';

const router = express.Router();

router.post('/create', createScorecards);
router.post('/create-pattern', createPattern);
router.get('/get-all-patterns', getAllPatterns);
router.get('/get-all', getAllScorecards);
router.patch('/update-pattern', updatePattern);
router.delete('/delete/:id', deletePattern);

export default router;
