const { Router } = require('express');
const {
  getBankController,
  getBankByEmailController,
  postBankController,
  patchBankController,
  deleteBankController
} = require('../controllers/bank');

const router = Router();

router.get('/', getBankController);
router.get('/login', getBankByEmailController);
router.post('/register', postBankController);
router.patch('/:id', patchBankController);
router.delete('/:id', deleteBankController)

module.exports = router;
