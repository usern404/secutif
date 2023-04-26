const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// get alls Users

const getUserController = async (req, res) => {
    const Users = await prisma.user.findMany();
    res.json({
      success: 1,
      allUsers: Users
    })
};

// get User by id
const getUserByIdController = async (req, res) => {
  try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: id
        },
      });
      res.json({ success: 1, user })
    } catch (e) {
      console.log(e);
    }
  };

// post User
const postUserController = async (req, res) => {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
            firstname: body.firstname,
            lastname: body.lastname,
            emailUser: body.emailUser,
            cni_number: body.cni_number,
            city: body.city,
            address: body.address,
            phone: body.phone,
        },
      });
      res.json({
        success: 1,
        message: "User crée avec success",
        user: user
      })
    } catch (e) {
      console.log(e);
    }
    
  };
  
// update User
const patchUserController = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
            firstname: body.firstname,
            lastname: body.lastname,
            emailUser: body.email,
            cni_number: body.cni,
            city: body.city,
            address: body.address,
            phone: body.phone,
        },
      });
      res.json({ success: 1, user })
    } catch (e) {
      console.log(e);
    }
    
};
  
// delete User
const deleteUserController = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.send('User deleted successfully...');
    } catch (e) {
      console.log(e); 
    }
    
  };

module.exports = {
    getUserByIdController,
    getUserController,
    deleteUserController,
    patchUserController,
    postUserController,
};
