const app = require('./providers/express');
const { Prisma } = require('./providers/prisma');
const env = require('./config/env');

const startServer = async () => {
  const prisma = new Prisma();
  await prisma.start();

  app.listen(env.port, () => {
    console.log(`Serveur démarré sur le port ${env.port}`);
  });
};

startServer();