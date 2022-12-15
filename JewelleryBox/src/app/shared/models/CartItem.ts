import { Jewel } from "./Jewel";

export class CartItem{
    constructor(public jewel:Jewel){ }

    quantity:number = 1;
    price:number = this.jewel.price;
}