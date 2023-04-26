const { Router } = require('express');
const {
    getLoansController,
    getLoansByIdController,
    postLoansController,
    patchLoansController,
    deleteLoansController,
} = require('../controller/loans');
// const { checkAuth } = require('../controllers/check-auth');

const router = Router();

router.get('/', getLoansController);
router.get('/:id', getLoansByIdController);
router.post('/', postLoansController);
router.patch('/:id', patchLoansController);
router.delete('/:id', deleteLoansController);

module.exports = router;
