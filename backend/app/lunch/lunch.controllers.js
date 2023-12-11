import prisma from '../prisma.js';

const signUpForLunch = async (req, res) => {
  const { id } = req.user;
  const { date } = req.body;

  const lunch = await prisma.lunch.findFirst({
    where: { date },
    include: {
      users: true,
    },
  });

  const updateLunchUsers =
    lunch === null || !lunch?.users[0]
      ? [{ id }]
      : [...lunch.users.map((user) => ({ id: user.id })), { id }];

  let newLunch;

  if (lunch !== null) {
    newLunch = await prisma.lunch.update({
      where: { id: lunch.id },
      data: {
        users: {
          connect: updateLunchUsers,
        },
      },
      include: {
        users: true,
      },
    });
  }

  if (lunch === null) {
    newLunch = await prisma.lunch.create({
      data: {
        date,
        users: {
          connect: updateLunchUsers,
        },
      },
      include: {
        users: true,
      },
    });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id },
    include: {
      lunches: true,
    },
  });

  await prisma.user.update({
    where: { id },
    data: {
      lunches: {
        connect: [
          ...currentUser.lunches.map((l) => ({ id: l.id })),
          { id: newLunch.id },
        ],
      },
    },
  });

  return res.status(200).send(newLunch);
};

const cancelLunch = async (req, res) => {
  const { date } = req.body;
  const { id } = req.user;
  const lunch = await prisma.lunch.findFirst({
    where: {
      date,
    },
    include: {
      users: true,
    },
  });

  const updateUsers = lunch.users
    .map((user) => ({ id: user.id }))
    .filter((_id) => _id.id !== id);

  const currentUser = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      lunches: true,
    },
  });

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      lunches: {
        set: currentUser.lunches
          .map((l) => ({ id: l.id }))
          .filter((obj) => obj.id !== lunch?.id),
      },
    },
    include: {
      lunches: true,
    },
  });

  const newLunch = await prisma.lunch.update({
    where: {
      id: lunch.id,
    },
    data: {
      users: {
        connect: updateUsers,
      },
    },
    include: {
      users: true,
    },
  });

  return res.status(200).send(newLunch);
};

export { cancelLunch, signUpForLunch };
