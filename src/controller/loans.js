const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// get alls Loanss

const getLoansController = async (req, res) => {
    const loans = await prisma.loans.findMany();
    res.json({
      success: 1,
      allLoanss: loans
    })
};

// get Loans by id
const getLoansByIdController = async (req, res) => {
  try {
      const id = req.params.id;
      const Loans = await prisma.loans.findUnique({
        where: {
          id: id
        },
      });
      res.json({ success: 1, Loans })
    } catch (err) {
      console.log(err);
    }
  };

  // post Loans
  const postLoansController = async (req, res) => {
    try {
      const data = req.body;
      const bank = await prisma.bank.findUnique({ where: { id: data.bankId } });
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
      
      
      const loan = await prisma.loans.create({
        data: {
          clientId: client.id,
          bankId: bank.id,
          amount: data.amount
        },
      });
      res.json({
        success: 1,
        message: "Loans crée avec success",
        Loans: loan
      })
    } catch (err) {
      console.log(err);
    }
    
  };
  
// update Loans
const patchLoansController = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const Loans = await prisma.loans.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
          city: body.city,
          locality: body.locality,
          email: body.email,
          hash: body.hash,
        },
      });
      res.json({ success: 1, Loans })
    } catch (err) {
      console.log(err);
    }
    
};
  
// delete Loans
const deleteLoansController = async (req, res) => {
    try {
      const id = req.params.id;
      const Loans = await prisma.loans.delete({
        where: {
          id: id,
        },
      });
      res.send('Loans deleted successfully...');
    } catch (err) {
      console.log(err); 
    }
    
  };

module.exports = {
    getLoansByIdController,
    getLoansController,
    deleteLoansController,
    patchLoansController,
    postLoansController,
};
