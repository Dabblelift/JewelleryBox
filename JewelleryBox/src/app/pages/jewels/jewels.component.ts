import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { JewelsService } from 'src/app/services/jewels.service';
import { Jewel } from 'src/app/shared/models/Jewel';

@Component({
  selector: 'app-jewels',
  templateUrl: './jewels.component.html',
  styleUrls: ['./jewels.component.css']
})
export class JewelsComponent {

  jewels: Jewel[] = [];

  constructor(private jewelsService: JewelsService, private cartService:CartService, private router:Router) {
    this.jewelsService.getAll().subscribe((res) => {
      this.jewels = res;
    });

  }

  addToCart(jewel:Jewel){
    this.cartService.addToCart(jewel);
    this.router.navigateByUrl('/cart-page');
  }
}
