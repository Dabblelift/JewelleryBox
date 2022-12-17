import { model, Schema, Types } from 'mongoose';
import { OrderStatus } from '../constants/order_status';
import { Jewel, JewelSchema } from './jewel.model';

export interface OrderItem {
    jewel: Jewel;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        jewel: { type: JewelSchema, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }
)

export interface Order {
    id: string;
    items: OrderItem[];
    totalPrice: number;
    name: string;
    address: string;
    status: OrderStatus;
    phoneNumber: string;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<Order>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.WAITING },
    user: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
})

export const OrderModel = model('order', orderSchema);