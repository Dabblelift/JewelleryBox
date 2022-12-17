import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private cartService: CartService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.currentUser.token && this.cartService.getCart().items.length > 0) return true;
    else if (this.userService.currentUser.token && this.cartService.getCart.length === 0){
      this.router.navigate(['/cart-page'])
      return false;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }

}
