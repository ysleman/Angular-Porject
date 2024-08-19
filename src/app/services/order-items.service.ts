import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '../model/Order_items';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchOrderItems(orderId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/order-items?orderId=${orderId}`, this.httpOptions);
  }

  addOrderItem(orderItemData: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.apiUrl}/order-items`, orderItemData, this.httpOptions);
  }

  updateOrderItem(orderItemData: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiUrl}/order-items/${orderItemData.id}`, orderItemData, this.httpOptions);
  }

  deleteOrderItem(orderItemId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/order-items/${orderItemId}`, this.httpOptions);
  }
}
