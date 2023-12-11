import argon2 from 'argon2';
import prisma from '../prisma.js';

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

export { createSuperUser };
