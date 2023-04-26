const { PrismaClient } = require('@prisma/client');

class Prisma {
  async start() {
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      console.log('secutif db connected!');
    } catch (err) {
      console.log('prisma ---> ', err);
    }
  }
}

module.exports = { Prisma };
