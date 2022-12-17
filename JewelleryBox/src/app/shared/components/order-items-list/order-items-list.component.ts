import { Component, Input } from '@angular/core';
import { Order } from '../../models/Order';
import { roundPrice } from '../../../shared/functions/priceRounder'

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent {

  @Input()
  order!: Order;
  roundPrice = roundPrice;
}
