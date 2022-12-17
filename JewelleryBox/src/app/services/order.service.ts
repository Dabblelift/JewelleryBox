import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_BY_ID_URL, ORDER_BY_USERID_URL, ORDER_CREATE_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getOrderById(orderId:string):Observable<Order>{
    return this.http.get<Order>(ORDER_BY_ID_URL + orderId);
  }

  getOrdersByUserId(userId: string):Observable<Order[]>{
    return this.http.get<Order[]>(ORDER_BY_USERID_URL + userId);
  }

}
