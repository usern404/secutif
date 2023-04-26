const { Router } = require('express');
const {
  deleteLandController,
  getLandByIdController,
  getLandController,
  patchLandController,
  postLandController,
} = require('../controllers/landTitle');
// const { checkAuth } = require('../controllers/check-auth');

const router = Router();

router.get('/', getLandController);
router.get('/:id', getLandByIdController);
router.post('/', postLandController);
router.patch('/:id', patchLandController);
router.delete('/:id', deleteLandController);

module.exports = router;
