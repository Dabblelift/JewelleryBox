import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { roundPrice } from 'src/app/shared/functions/priceRounder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  
  orders: Order[] = [];
  roundPrice = roundPrice;
  constructor(private orderService: OrderService, activatedRoute: ActivatedRoute) { 
    let ordersObservable: Observable<Order[]>

    activatedRoute.params.subscribe((params) => {
      if(params['userId'])
      ordersObservable = this.orderService.getOrdersByUserId(params['userId']);
      ordersObservable.subscribe((orders) => {
        this.orders = orders;
      })
    })
  }
}
