const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const createLoans = async (data, callback) => {
  try {
    
    const client = await prisma.client.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        cni: data.cni,
        city: data.city,
        address: data.address,
        phone: data.phone,
        landTitle: {
          create: {
            number: data.number,
            department: data.department,
            vol: data.vol,
            folio: data.folio,
            status: data.status,
            bankId: bank.id
          }
        }
      }
    });
    
    const bank = await prisma.bank.findUnique({ where: { id: data.bankId } });
    
    const loan = await prisma.loans.create({
      data: {
        clientId: client.id,
        bankId: bank.id,
        amount: data.amount
      },
    });
    callback(null, loan);
  } catch (err) {
    callback(err, null);
  }
};

const readLoansById = async (data, callback) => {
  try {
    const loan = await prisma.loans.findUnique({ where: { userId: data.userId } });
    callback(null, loan);
  } catch (err) {
    callback(err, null);
  }
};

const readLoans = async (callback) => {
  try {
    const loans = await prisma.loans.findMany();
    callback(null, loans);
  } catch (err) {
    callback(err, null);
  }
};

// const updateLoans = async (callback) => {
//   try {
//     const data = data.body;
//     const id = data.params.id
// 		const loan = await prisma.userOnBank.update({
//       where: { id: id },
// 			data: {
//         name: data.name,
//         city: data.city,
//         locality: data.locality,
//         email: data.email,
//         password: data.password
//       },
// 		});
// 		callback(null, loan);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

// const deleteLoans = async (data, callback) => {
//   try {
// 		const loan = await prisma.userOnBank.delete({
// 			where: { id: data.id },
// 		});
// 		callback(null, loan);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

module.exports = {
  createLoans,
  readLoansById,
  readLoans,
  // updateLoans,
	// deleteLoans,
};
