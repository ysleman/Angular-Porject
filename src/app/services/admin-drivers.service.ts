import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryDriver } from '../model/Delivery_drivers';

@Injectable({
  providedIn: 'root'
})
export class AdminDriversService {
 

  private apiUrl = 'http://localhost:8080'; // Replace with your API domain
  private authToken = sessionStorage.getItem('authToken');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${this.authToken}`
    })
  };
  
  constructor(private http: HttpClient) { }
  fetchDrivers(): Observable<DeliveryDriver[]> {
    return this.http.get<DeliveryDriver[]>(`${this.apiUrl}/api/admin/delivery_drivers`, this.httpOptions);
  }
  deleteDriver(driverId: number):Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admin/delivery_drivers_remove`,{driver_id:driverId}, this.httpOptions);
  }
  getDriver(Id:Number):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/admin/delivery_drivers`,{id:Id}, this.httpOptions);
  }
  EditDrivers(Id: number, Name: string, username: string, phone: string,  NewPassword: string): Observable<any> {
    const body = {
      delivery_driver_id: Id,
      fullname: Name !== '' ? Name : null,
      username: username !== '' ? username : null,
      password: NewPassword !== '' ? NewPassword : null,
      phone: phone !== '' ? phone : null,
    };
  
    return this.http.post<any>(`${this.apiUrl}/api/admin/delivery_drivers_edit`, body, this.httpOptions);
  }
  AddDrivers(Name: string, username: string, phone: string,  NewPassword: string): Observable<any> {
    const body = {
      fullname: Name !== '' ? Name : null,
      username: username !== null ? username : null,
      phone: phone !== '' ? phone : null,
      password: NewPassword !== '' ? NewPassword : null,
    };
  
    return this.http.post<any>(`${this.apiUrl}/api/admin/delivery_drivers_add`, body, this.httpOptions);
  }
}
