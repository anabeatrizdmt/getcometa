import express from 'express';
import { ordersController } from '../controllers/ordersController';

const router = express.Router();

router.post('/order', ordersController.receiveOrder);

router.get('/orders', ordersController.getOrders);

router.get('/customers', ordersController.getCustomers);

router.get('/bill', ordersController.getBill);

router.post('/pay', ordersController.payBill);


export default router;