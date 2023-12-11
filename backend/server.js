import { errors } from 'celebrate'
import 'colors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import authRouter from './app/auth/auth.routes.js'
import { cron } from './app/lunch/cron.js'
import lunchRouter from './app/lunch/lunch.routes.js'
import authorization from './app/middlewares/auth.js'
import handleErrors from './app/middlewares/handleErrors.js'
import prisma from './app/prisma.js'
import scorecardRouter from './app/scorecard/scorecard.routes.js'
import studentListRouter from './app/studentList/studentList.routes.js'
import superRouter from './app/superUser/user.routes.js'
import userRouter from './app/user/user.routes.js'

dotenv.config();

const __dirname = path.resolve();

const { PORT = 3000 } = process.env;
const app = express();

const main = async () => {
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
    }),
  );
  cron.start();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/uploads', express.static(path.join(__dirname, '/uploads/')));
  app.use('/api', authRouter);
  app.use('/api/create-super', superRouter);
  app.use(authorization);
  app.use('/api/users', userRouter);
  app.use('/api/student-list', studentListRouter);
  app.use('/api/lunch', lunchRouter);
  app.use('/api/scorecard', scorecardRouter);

  app.use(errors());
  app.use(handleErrors);

  app.listen(PORT, () => {
    console.log(`Сервер работает на порте ${PORT}`.blue.bold);
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
