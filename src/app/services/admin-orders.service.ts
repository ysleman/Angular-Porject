import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/Orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  

  private apiUrl = 'http://localhost:8080'; // Replace with your API domain
  private authToken = sessionStorage.getItem('authToken');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${this.authToken}`
    })
  };
  
  constructor(private http: HttpClient) { }
  fetchOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/resturants/order/list`, this.httpOptions);
  }

  fetchlistofOrders():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/admin/orders`, this.httpOptions);
  }
  deleteOrder(orderId: number):Observable<any>  {
    return this.http.post<any>(`${this.apiUrl}/api/admin/orders_remove`,{order_id:orderId}, this.httpOptions);
  }
  getOrder(Id:Number):Observable<any>{
    return this.http.post<Order>(`${this.apiUrl}/api/admin/orders`,{id:Id}, this.httpOptions);
  }
  EditOrder(Id: number, user_id: string, driver_id: number, totalPrice: string, orderDate: string): Observable<any> {
    const body = {
      order_id: Id,
      user_id: user_id !== '' ? user_id : null,
      driver_id: driver_id !== null ? driver_id : null,
      totalPrice: totalPrice !== '' ? totalPrice : null,
      orderDate: orderDate !== '' ? orderDate : null,
    };
    return this.http.post<any>(`${this.apiUrl}/api/admin/orders_edit`, body, this.httpOptions);
  }
  
}
