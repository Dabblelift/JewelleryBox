import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Jewel } from '../shared/models/Jewel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() { }

  addToCart(jewel:Jewel):void{
    let cartItem = this.cart.items.find(item => item.jewel.id === jewel.id)
    if(cartItem) return;

    this.cart.items.push(new CartItem(jewel));
    this.setCartToLocalStorage();
  }

  removeFromCart(jewelId: string):void{
    this.cart.items = this.cart.items.filter(item => item.jewel.id != jewelId);
    this.setCartToLocalStorage();
  }

  changeQuantity(jewelId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.jewel.id === jewelId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.jewel.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
