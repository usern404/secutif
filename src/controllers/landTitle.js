const { createLand, readLandById, readLand, updateLand, deleteLand } = require('../models/landTitle');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ErrorHandling } = require('../errors/ErrorHandling');


const postLandController = (req, res) => {
  const body = req.body;
  createLand(body, (err, result) => {
    if (err) {
      const error = ErrorHandling(err);
      res.json(error);
    } else if (result) {
      res.json({ success: 1, landTitle: result, message: 'Land crée' });
    }
  });
};

const getLandController = (_req, res) => {
  readLand((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, landTitles: result });
    }
  });
};

const getLandByIdController = (req, res) => {
  const id = req.params.id;
  readLandById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, landTitle: result[0] });
    }
  });
};

// const patchLandController = (req, res) => {
//   const data = req.body;
//   updateLand(data, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else if (result.affectedRows) {
//       res.json({ success: 1, message: 'LandTitle updated !' });
//     }
//   });
// };

// const deleteLandController = (req, res) => {
//   const id = req.params.id;
//   deleteLandTitle(id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     if (result.affectedRows) {
//       res.json({ success: 1, message: 'LandTitle deleted !' });
//     }
//   });
// };


const patchLandController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const bank = await prisma.landTitle.update({
      where: {
        id: id,
      },
      data: {
        number: data.number,
        department: data.department,
        vol: data.vol,
        folio: data.folio,
        status: data.status,
      },
    });
    res.json({ success: 1, bank });
  } catch (err) {
    console.log(err);
  }
  
};

// delete bank
const deleteLandController = async (req, res) => {
  try {
    const id = req.params.id;
    const bank = await prisma.landTitle.delete({
      where: {
        id: id,
      },
    });
    res.json({ success: 1, message: 'DELETED' });
  } catch (err) {
    console.log(err); 
  }
  
};

module.exports = {
  postLandController,
  getLandByIdController,
  getLandController,
  patchLandController,
  deleteLandController
};