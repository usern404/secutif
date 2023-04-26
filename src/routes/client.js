const { Router } = require('express');
const {
    getClientController,
    getClientByIdController,
    postClientController,
    patchClientController,
    deleteClientController,
} = require('../controllers/client');
// const { checkAuth } = require('../controllers/check-auth');

const router = Router();

router.get('/', getClientController);
router.get('/:id', getClientByIdController);
router.post('/', postClientController);
router.patch('/:id', patchClientController);
router.delete('/:id', deleteClientController);

module.exports = router;
