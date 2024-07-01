const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getOrders, getUserOrders, createOrder, updateOrder,getOrderById } = require('../controllers/orderController');

router.get('/', authorization, getOrders);
router.get('/getuserorders', authorization, getUserOrders);
router.post('/', authorization, createOrder);
router.patch('/',authorization, updateOrder);
router.get('/getorderbyid/:orderId', authorization, getOrderById);

module.exports = router;
