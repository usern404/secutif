const { createClient, readClientById, readClient, updateClient, deleteClient } = require('../models/client');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ErrorHandling } = require('../errors/ErrorHandling');


const postClientController = (req, res) => {
  const body = req.body;
  createClient(body, (err, result) => {
    if (err) {
      const error = ErrorHandling(err);
      res.json(error);
    } else if (result) {
      res.json({ success: 1, user: result, message: 'Client crée' });
    }
  });
};

const getClientController = (_req, res) => {
  readClient((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, users: result });
    }
  });
};

const getClientByIdController = (req, res) => {
  const id = req.params.id;
  readClientById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: 1, user: result[0] });
    }
  });
};

// const patchClientController = (req, res) => {
//   const data = req.body;
//   updateClient(data, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else if (result.affectedRows) {
//       res.json({ success: 1, message: 'ClientTitle updated !' });
//     }
//   });
// };

// const deleteClientController = (req, res) => {
//   const id = req.params.id;
//   deleteClientTitle(id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     if (result.affectedRows) {
//       res.json({ success: 1, message: 'ClientTitle deleted !' });
//     }
//   });
// };


const patchClientController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const bank = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        emailClient: data.emailClient,
        cni_number: data.cni_number,
        city: data.city,
        address: data.address,
        phone: data.phone,
      },
    });
    res.json({ success: 1, bank });
  } catch (err) {
    console.log(err);
  }
  
};

// delete bank
const deleteClientController = async (req, res) => {
  try {
    const id = req.params.id;
    const bank = await prisma.user.delete({
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
  postClientController,
  getClientByIdController,
  getClientController,
  patchClientController,
  deleteClientController
};