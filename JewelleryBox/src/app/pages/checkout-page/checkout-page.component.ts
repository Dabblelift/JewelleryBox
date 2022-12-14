import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(private cartService: CartService, private formBuilder: FormBuilder,
    private userService: UserService, private toastrService: ToastrService,
    private orderService: OrderService, private router: Router) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let name = this.userService.currentUser.firstName + ' ' + this.userService.currentUser.lastName;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: ['', [Validators.required, Validators.minLength(12)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{5,}')]  ],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;
    this.order.phoneNumber = this.fc['phoneNumber'].value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/orders/' + this.userService.currentUser.id);
        this.toastrService.success(
          `Congratulations, ${this.userService.currentUser.firstName}`,
          'You have successfully made a new order.'
        )
        this.cartService.clearCart();
      },
      error:(errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }
}
