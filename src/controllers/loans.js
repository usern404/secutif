const { createLoans, readLoansById, readLoans, updateLoans, deleteLoans } = require('../models/loans');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ErrorHandling } = require('../errors/ErrorHandling');


const postLoansController = (req, res) => {
  const body = req.body;
  createLoans(body, (err, result) => {
    if (err) {
      const error = ErrorHandling(err);
      res.json(error);
    } else if (result) {
      res.json({ success: 1, bank: result, message: 'Loans crée' });
    }
  });
};

const getLoansController = (_req, res) => {
  readLoans((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, landTitles: result });
    }
  });
};

const getLoansByIdController = (req, res) => {
  const id = req.params.id;
  readLoansById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, landTitle: result[0] });
    }
  });
};

// const patchLoansController = (req, res) => {
//   const data = req.body;
//   updateLoans(data, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else if (result.affectedRows) {
//       res.json({ success: 1, message: 'LoansTitle updated !' });
//     }
//   });
// };

// const deleteLoansController = (req, res) => {
//   const id = req.params.id;
//   deleteLoansTitle(id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     if (result.affectedRows) {
//       res.json({ success: 1, message: 'LoansTitle deleted !' });
//     }
//   });
// };


const patchLoansController = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const bank = await prisma.bank.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        city: body.city,
        locality: body.locality,
        email: body.email,
        password: body.password,
      },
    });
    res.json({ success: 1, bank });
  } catch (err) {
    console.log(err);
  }
  
};

// delete bank
const deleteLoansController = async (req, res) => {
  try {
    const id = req.params.id;
    const bank = await prisma.bank.delete({
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
  postLoansController,
  getLoansByIdController,
  getLoansController,
  patchLoansController,
  deleteLoansController
};