const { createBank, readBankByEmail, readBank, updateBank, deleteBank } = require('../models/bank');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ErrorHandling } = require('../errors/ErrorHandling');
const { tokenGenerator } = require('../utils/tokenGenerator');
const { compareHash } = require('../utils/compareHash');

const postBankController = (req, res) => {
  const body = req.body;
  createBank(body, (err, result) => {
    if (err) {
      const error = ErrorHandling(err);
      res.json(error);
    } else if (result) {
      res.json({ success: 1, bank: result, message: 'Bank crée' });
      // const token = tokenGenerator(result.id);
    }
  });
};

const getBankByEmailController = (req, res) => {
  const body = req.body;
  readBankByEmail(body, async (err, result) => {
    if (err) {
      const error = ErrorHandling(err);
      res.json(error);
    } else {
      if (!result) {
        res.json({ success: 1, code: 'USER_NOT_FOUND' });
        return;
      }
      const isMatch = await compareHash(body.password, result.password);
      if (!isMatch) {
        res.json({ success: 1, code: 'WRONG_PASSWORD' });
        return;
      }
      const token = tokenGenerator(result.id);
      res.json({ success: 1, token, bank: result, message: 'Bank connecté' });
    }
  });
};

const getBankController = (req, res) => {
  readBank((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, banks: result });
    }
  });
};

// const patchBankController = (req, res) => {
// 	updateBank((err, result) => {
// 		if (err) {
// 			console.log(err);
// 			res.json({ success: 0 });
// 		} else if (id) {
// 			res.json({ success: 1, result });
// 		}
// 	});
// };

// const deleteBankController = (req, res) => {
// 	const id = req.params.id;
// 	deleteBank(id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else if (result) {
// 			res.json({ success: 1, message: 'DELETED' });
// 		}
// 	});
// };


const patchBankController = async (req, res) => {
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
const deleteBankController = async (req, res) => {
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
  postBankController,
  getBankByEmailController,
  getBankController,
  patchBankController,
  deleteBankController
};