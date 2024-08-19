import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryDriver } from '../model/Delivery_drivers';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDriverService {
  private apiUrl = 'http://localhost:8080';
  private authToken = sessionStorage.getItem('authToken');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
       Authorization:`Bearer ${this.authToken}`
    })
  };

  constructor(private http: HttpClient) {}

  fetchDeliveryDrivers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/delivery_drivers/orders`, this.httpOptions);
  }
  fetchDeliveryDriverspost(id:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/delivery_drivers/orders`,{id:id}, this.httpOptions);
  }
 
  updateDeliveryDriver(id:number,driverData: any): Observable<any> {
    const payload ={
      order_id:id,
      delivered:driverData
    }
    return this.http.post(`${this.apiUrl}/api/delivery_drivers/edit_order`, payload, this.httpOptions);
  }
}
