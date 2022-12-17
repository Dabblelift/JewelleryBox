import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderStatus } from "../constants/order_status";
import { OrderModel } from "../models/order.module";
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth)

router.post('/create',
    asyncHandler(async (req: any, res: any) => {
        const requestOrder = req.body;

        if (requestOrder.items.length <= 0) {
            res.status(HTTP_BAD_REQUEST).send('Cart Is Empty');
            return;
        }

        const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
        await newOrder.save();
        res.send(newOrder);
    })
)

router.get("/:orderId", asyncHandler(
    async (req, res) => {
        const order = await OrderModel.findById(req.params.orderId);
        res.send(order);
    }
))

router.get("/byuser/:userId", asyncHandler(
    async (req: any, res) => {
        const orders = await (await OrderModel.find({ user: req.params.userId }))
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        res.send(orders);
    }
))



export default router;
