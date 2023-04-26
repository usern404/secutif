const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const env = require('../config/env')
const bcrypt = require('bcrypt')
const ms = require('ms')
const jwt = require('jsonwebtoken');

// get alls banks

const getBankController = async (req, res) => {
    const banks = await prisma.bank.findMany();
    res.json({
      success: 1,
      allbanks: banks
    })
};

// get bank by id
const getBankByEmailController = async (req, res) => {
  try {
      // const id = req.params.id;
      const {email, password} = req.body
      const bank = await prisma.bank.findUnique({
        where: {
          email: email
        },
      });
    
      if (!bank) {
        return res.status(400).json({ message: 'Invalid email' });
      }
      const passwordMatch = await bcrypt.compare(password, bank.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

      const id = bank.id;
      const token = jwt.sign({ id }, env.secret_key, { expiresIn: ms("1y") })
      res.json({
        success: 1,
        message: "bank connecté avec success",
        bank: bank,
        token: token
      });
    
  //     const passwordMatch = await bcrypt.compare(password, bank.password);
  //     if (!passwordMatch) {
  //       return res.status(400).json({ message: 'Invalid password' });
  //     }
  //     const token = jwt.sign({ bankId: bank.id }, env.secret_key);
  //     res.json({ token });
    
      } catch (e) {
       console.log(e);
    };
  };

// post bank
const postBankController = async (req, res) => {
    try {
      const body = req.body;
      const hash = await bcrypt.hash(body.password, 10)
      const bank = await prisma.bank.create({
        data: {
          name: body.name,
          city: body.city,
          locality: body.locality,
          email: body.email,
          password: hash,
        },
      });
      const id = bank.id;
      const token = jwt.sign({ id }, env.secret_key, { expiresIn: ms("1y") })
      res.json({
        success: 1,
        message: "bank crée avec success",
        bank: bank,
        token: token
      });
    } catch (e) {
      console.log(e);
    }
    
  };
  
// update bank
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
      res.json({ success: 1, bank })
    } catch (e) {
      console.log(e);
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
      res.send('Bank deleted successfully...');
    } catch (e) {
      console.log(e); 
    }
    
  };

module.exports = {
    getBankByEmailController,
    getBankController,
    deleteBankController,
    patchBankController,
    postBankController,
};
