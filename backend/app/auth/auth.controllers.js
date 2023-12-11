import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import NotFoundError from '../../errors/NotFoundError.js';
import UnauthorizedError from '../../errors/UnauthorizedError.js';
import prisma from '../prisma.js';

const { JWT_SECRET, NODE_ENV } = process.env;

// @desc Авторизация пользователя
// @route /api/login
// @access Public

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user === null) {
    return next(
      new NotFoundError('Сотрудника с указанным email не существует!'),
    );
  }

  if (!(await argon2.verify(user.password, password))) {
    return next(new UnauthorizedError('Неправильный email или пароль'));
  }

  const token = jwt.sign(
    { id: user.id },
    NODE_ENV === 'production' ? JWT_SECRET : 'secret-code',
  );

  return res
    .cookie('token', token, { maxAge: 60000 * 60 * 24 * 7, httpOnly: true })
    .send(user);
};

const logout = (req, res, next) => {
  res.clearCookie('token').send({ message: 'Выход' });
  next();
};

export { login, logout };
