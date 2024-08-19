import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantOrder } from '../model/Resturant_orders';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOrderService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchRestaurantOrders(restaurantId: number): Observable<RestaurantOrder[]> {
    return this.http.get<RestaurantOrder[]>(`${this.apiUrl}/resturant-orders?restaurantId=${restaurantId}`, this.httpOptions);
  }

  addRestaurantOrder(orderData: RestaurantOrder): Observable<RestaurantOrder> {
    return this.http.post<RestaurantOrder>(`${this.apiUrl}/resturant-orders`, orderData, this.httpOptions);
  }

  updateRestaurantOrder(orderData: RestaurantOrder): Observable<RestaurantOrder> {
    return this.http.put<RestaurantOrder>(`${this.apiUrl}/resturant-orders/${orderData.id}`, orderData, this.httpOptions);
  }

  deleteRestaurantOrder(orderId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/resturant-orders/${orderId}`, this.httpOptions);
  }
}
