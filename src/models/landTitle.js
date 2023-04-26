const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createLand = async (data, callback) => {
  try {
    const land = await prisma.landTitle.create({
      data: {
        number: data.number,
        department: data.department,
        vol: data.vol,
        folio: data.folio,
        status: data.status
      },
    });
    callback(null, land);
  } catch (err) {
    callback(err, null);
  }
};

const readLandById = async (data, callback) => {
  try {
    const land = await prisma.landTitle.findUnique({ where: { id: data.id } });
    callback(null, land);
  } catch (err) {
    callback(err, null);
  }
};

const readLand = async (callback) => {
  try {
    const lands = await prisma.landTitle.findMany();
    callback(null, lands);
  } catch (err) {
    callback(err, null);
  }
};

// const updateLand = async (callback) => {
//   try {
//     const data = data.body;
//     const id = data.params.id
// 		const land = await prisma.landTitle.update({
//       where: { id: id },
// 			data: {
//         name: data.name,
//         city: data.city,
//         locality: data.locality,
//         email: data.email,
//         password: data.password
//       },
// 		});
// 		callback(null, land);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

// const deleteLand = async (data, callback) => {
//   try {
// 		const land = await prisma.landTitle.delete({
// 			where: { id: data.id },
// 		});
// 		callback(null, land);
// 	} catch (err) {
// 		callback(err, null);
// 	}
// };

module.exports = {
  createLand,
  readLandById,
  readLand,
  // updateLand,
	// deleteLand,
};
