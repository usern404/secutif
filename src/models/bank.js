const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashGenerator } = require('../utils/hashGenerator');

const createBank = async (data, callback) => {
  const hash = await hashGenerator(data.password);
  try {
    const bank = await prisma.bank.create({
      data: {
        name: data.name,
        city: data.city,
        locality: data.locality,
        email: data.email,
        password: hash
       },
     });
    callback(null, bank);
  } catch (err) {
    callback(err, null);
  }
};

const readBankByEmail = async (data, callback) => {
  try {
    const bank = await prisma.bank.findUnique({ where: { email: data.email } });
    callback(null, bank);
  } catch (err) {
    callback(err, null);
  }
};

const readBank = async (callback) => {
  try {
    const banks = await prisma.bank.findMany();
    callback(null, banks);
  } catch (err) {
    callback(err, null);
  }
};

// const updateBank = async (callback) => {
//   try {
//     const data = data.body;
//     const id = data.params.id
// 		const bank = await prisma.bank.update({
//       where: { id: id },
// 			data: {
//         name: data.name,
//         city: data.city,
//         locality: data.locality,
//         email: data.email,
//         password: data.password
//       },
// 		});
// 		callback(null, bank);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

// const deleteBank = async (data, callback) => {
//   try {
// 		const bank = await prisma.bank.delete({
// 			where: { id: data.id },
// 		});
// 		callback(null, bank);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

module.exports = {
  createBank,
  readBankByEmail,
  readBank,
  // updateBank,
	// deleteBank,
};
