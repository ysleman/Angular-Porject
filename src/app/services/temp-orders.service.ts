import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TempOrder } from '../model/Temp_orders';

@Injectable({
  providedIn: 'root'
})
export class TempOrderService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchTempOrders(): Observable<TempOrder[]> {
    return this.http.get<TempOrder[]>(`${this.apiUrl}/temp-orders`, this.httpOptions);
  }

  addTempOrder(orderData: TempOrder): Observable<TempOrder> {
    return this.http.post<TempOrder>(`${this.apiUrl}/temp-orders`, orderData, this.httpOptions);
  }

  updateTempOrder(orderData: TempOrder): Observable<TempOrder> {
    return this.http.put<TempOrder>(`${this.apiUrl}/temp-orders/${orderData.id}`, orderData, this.httpOptions);
  }

  deleteTempOrder(orderId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/temp-orders/${orderId}`, this.httpOptions);
  }
}
