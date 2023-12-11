import express from 'express';
import multer from 'multer';
import { addStudentList } from './studentList.controllers.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'studentsList.xlsx');
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('studentsList'), addStudentList);

export default router;
