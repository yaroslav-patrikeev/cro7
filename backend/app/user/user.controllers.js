import argon2 from 'argon2';
import ForbiddenError from '../../errors/ForbiddenError.js';
import NotFoundError from '../../errors/NotFoundError.js';
import prisma from '../prisma.js';
// @desc Создание пользователя
// @route /api/users/create
// @access Private
const createUser = async (req, res) => {
  const { email, password, name, positions, accesses } = req.body;
  const hash = await argon2.hash(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      name,
      positions,
      accesses,
    },
  });

  res.send(user);
};

// @desc Создание супер-пользователя
// @route /api/users/create-super
// @access Public
const createSuperUser = async (req, res) => {
  const hash = await argon2.hash('123456Aa!');
  await prisma.user.create({
    data: {
      email: 'admin@admin.ru',
      password: hash,
      name: 'Super User',
      positions: [],
      accesses: ['administrator'],
    },
  });

  res.send({
    message: 'Супер-пользователь успешно создан',
    login: 'admin@admin.ru',
    password: '123456Aa!',
  });
};

// @desc Получить всех пользователей
// @route /api/users/all
// @access Private
const getAllUsers = async (req, res, next) => {
  const { id } = req.user;
  const currentUser = await prisma.user.findFirst({
    where: { id },
  });
  if (!currentUser.accesses.includes('administrator')) {
    return next(new ForbiddenError('Нет доступа'));
  }
  const users = await prisma.user.findMany();
  return res.send(users);
};

const getUser = async (req, res, next) => {
  const { id } = req.user;
  const currentUser = await prisma.user.findFirst({
    where: { id },
    include: {
      lunches: true,
    },
  });
  if (!currentUser) {
    next(new NotFoundError('Необходимо авторизоваться!'));
  }
  return res.send(currentUser);
};

export { createSuperUser, createUser, getAllUsers, getUser };
