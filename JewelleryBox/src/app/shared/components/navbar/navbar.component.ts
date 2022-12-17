import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user!:User;
  cartQuantity = 0;
  constructor(private userService:UserService, cartService:CartService){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
  }

  logout(){
    this.userService.logout()
  }

  get isAuth(){
    return this.user.token;
  }
}
