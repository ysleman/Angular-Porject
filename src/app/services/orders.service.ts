import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`, this.httpOptions);
  }

  addOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, orderData, this.httpOptions);
  }

  updateOrder(orderData: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/orders/${orderData.id}`, orderData, this.httpOptions);
  }

  deleteOrder(orderId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/orders/${orderId}`, this.httpOptions);
  }
}
