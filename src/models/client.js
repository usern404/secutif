const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createClient = async (data, callback) => {
  try {
    const client = await prisma.client.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        cni: data.cni,
        city: data.city,
        address: data.address,
        phone: data.phone
      }
    });
    callback(null, client);
  } catch (err) {
    callback(err, null);
  }
};

const readClientById = async (data, callback) => {
  try {
    const client = await prisma.client.findUnique({ where: { id: data.id } });
    callback(null, client);
  } catch (err) {
    callback(err, null);
  }
};

const readClient = async (callback) => {
  try {
    const clients = await prisma.client.findMany();
    callback(null, clients);
  } catch (err) {
    callback(err, null);
  }
};

// const updateClient = async (callback) => {
//   try {
//     const data = data.body;
//     const id = data.params.id
// 		const client = await prisma.client.update({
//       where: { id: id },
// 			data: {
//         name: data.name,
//         city: data.city,
//         locality: data.locality,
//         email: data.email,
//         password: data.password
//       },
// 		});
// 		callback(null, client);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

// const deleteClient = async (data, callback) => {
//   try {
// 		const client = await prisma.client.delete({
// 			where: { id: data.id },
// 		});
// 		callback(null, client);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

module.exports = {
  createClient,
  readClientById,
  readClient,
  // updateClient,
	// deleteClient,
};
