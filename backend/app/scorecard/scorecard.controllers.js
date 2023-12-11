import prisma from '../prisma.js';
/**
 * Создает оценочные листы для всех зарегистрированных сотрудников
 */
const createScorecards = async (req, res) => {
  const usersList = await prisma.user.findMany({});
  usersList.forEach(async (user) => {
    await prisma.scoreCard.create({
      data: {
        user: {
          connect: { id: user.id },
        },
      },
    });
  });
  res.status(200).send({ message: 'Оценочные листы успешно созданы' });
};
/**
 * Получает все оценочные листы
 */
const getAllScorecards = async (req, res) => {
  const scorecards = await prisma.scoreCard.findMany({
    include: { user: true },
  });
  res.status(200).send(scorecards);
};

const createPattern = async (req, res) => {
  const { name, positions, fields } = req.body;
  const pattern = await prisma.scoreCardPattern.create({
    data: {
      name,
      positions,
      fields,
    },
  });
  res.status(200).send(pattern);
};

const getAllPatterns = async (req, res) => {
  const patterns = await prisma.scoreCardPattern.findMany();

  res.status(200).send(patterns);
};

const updatePattern = async (req, res) => {
  const { id, name, positions, fields } = req.body;
  const pattern = await prisma.scoreCardPattern.update({
    where: {
      id,
    },
    data: {
      name,
      positions,
      fields,
    },
  });
  res.status(200).send(pattern);
};

const deletePattern = async (req, res) => {
  const { id } = req.params;
  await prisma.scoreCardPattern.delete({
    where: {
      id,
    },
  });
  res.status(200).send({ message: 'Паттерн успешно удален' });
};

export {
  createPattern,
  createScorecards,
  deletePattern,
  getAllPatterns,
  getAllScorecards,
  updatePattern,
};
