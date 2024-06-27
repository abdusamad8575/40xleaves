const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getAddress, addAddress, updateAddress, deleteAddress,setPrimaryAddress } = require('../controllers/addressController');

router.get('/', getAddress);
router.post('/', addAddress);
router.patch('/', updateAddress);
router.delete('/:id', authorization, deleteAddress);
router.patch('/setprimary', setPrimaryAddress);

module.exports = router;
