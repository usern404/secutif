const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// get alls Lands

const getLandController = async (req, res) => {
    const lands = await prisma.land.findMany();
    res.json({
      success: 1,
      allLands: lands
    })
};

// get Land by id
const getLandByIdController = async (req, res) => {
  try {
      const id = req.params.id;
      const land = await prisma.land.findUnique({
        where: {
          id: id
        },
      });
      res.json({ success: 1, land })
    } catch (e) {
      console.log(e);
    }
  };

// post Land
const postLandController = async (req, res) => {
    try {
      const body = req.body;
      const land = await prisma.land.create({
        data: {
          name: body.name,
          city: body.city,
          locality: body.locality,
          email: body.email,
          hash: body.hash,
        },
      });
      res.json({
        success: 1,
        message: "Land crée avec success",
        Land: land
      })
    } catch (e) {
      console.log(e);
    }
    
  };
  
// update Land
const patchLandController = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const land = await prisma.land.update({
        where: {
          id: id,
        },
        data: {
            number: body.number,
            department: body.department,
            vol: body.vol,
            folio: body.folio,
            status: body.status,
        },
      });
      res.json({ success: 1, land })
    } catch (e) {
      console.log(e);
    }
    
};
  
// delete Land
const deleteLandController = async (req, res) => {
    try {
      const id = req.params.id;
      const land = await prisma.land.delete({
        where: {
          id: id,
        },
      });
      res.send('Land deleted successfully...');
    } catch (e) {
      console.log(e); 
    }
    
  };

module.exports = {
    getLandByIdController,
    getLandController,
    deleteLandController,
    patchLandController,
    postLandController,
};
