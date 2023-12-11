import { CronJob } from 'cron';
import prisma from '../prisma.js';
import { docxGenerator } from './docxGenerator.js';
import { sendLunchEmail } from './sendLunchEmail.js';

const job = new CronJob(
  '0 0 10 * * *',
  async () => {
    const d = new Date();
    d.setDate(new Date().getDate() + 1);
    const lunch = await prisma.lunch.findFirst({
      where: {
        date: new Date(d.toDateString()),
      },
      include: { users: true },
    });

    const users = lunch?.users.map((user, i) => ({
      number: i + 1,
      fio: user.name,
    }));

    docxGenerator(d, users);
    const message = {
      from: 'Корпоративная платформа ЦРО 7 <christina.corwin@ethereal.email>',
      to: 'yaroslav.patrikeev@gmail.com',
      subject: 'Тестовая рассылка',
      text: 'Пришло письмо?',
      attachments: [
        {
          filename: 'test.docx',
          path: './app/lunch/output.docx',
        },
      ],
    };
    sendLunchEmail(message);
    console.log('cron');
  },
  null,
  true,
  'Europe/Moscow',
);

export { job as cron };
