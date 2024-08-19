import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantAdminService {
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
    return this.http.get(`${this.apiUrl}/api/resturants/orders`, this.httpOptions);
  }
  fetchMenuItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/resturants/menu_items`, this.httpOptions);
  }
  getDetails(id:number): Observable<any> {
  return this.http.post(`${this.apiUrl}/resturant_id`,{id:id},this.httpOptions);
  }
  getOrderDetails(id:number):Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resturants/orders`,{id:id}, this.httpOptions);
  }
  updateOrder(id:number,finished:string,prcie:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resturants/edit_order`, {id:id,finished:finished,price:prcie}, this.httpOptions);
  }
  getMenuItemDetails(id:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/resturants/menu_items`, {id:id},this.httpOptions);
  }
  addMenuItems(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resturants/menu_items_add`, data, this.httpOptions);
  }
  deleteMenuItems(id:number): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/resturants/menu_items_remove`, {menu_item_id:id}, this.httpOptions);
  }
  updateMenuItem(id:number,menuItemData: any): Observable<any> {
    const payload = {
      menu_items_id: id,
      ...menuItemData
    };
    return this.http.post(`${this.apiUrl}/api/resturants/menu_items_edit`, payload, this.httpOptions);
  }
  deleteOrder(id:number): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/resturants/remove_order`, {order_id:id}, this.httpOptions);
  }
  acceptOrder(idk:boolean,id:number): Observable<any>{
    if(idk==true)
      return this.http.post(`${this.apiUrl}/api/resturants/accept_order`, {id:id}, this.httpOptions);
    return this.http.post(`${this.apiUrl}/api/resturants/remove_order`, {order_id:id}, this.httpOptions);
  }
}
