// src/app/services/menu-items.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../model/MenuItem';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyCaKbVhcX_22R_pRKDYuNA7vox-PtGaDkI';

// export type Maps = typeof google.maps;

@Injectable({
  providedIn: 'root'
})


export class MenuItemsService {
  private apiUrl = 'http://localhost:8080';
  // public readonly api = this.load();


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {}

  getFoods(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu_items`, this.httpOptions);
  }

  addFood(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem, this.httpOptions);
  }

  removeFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
  
  GetFoodByResturant(resturant_id:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/menu_items_id`,{id:resturant_id});
  }

  getFoodByLocation(lat:string, lon:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resturants_address`,{lat:lat, lon:lon});
  }

  getFoodByLocationandFood(lat:string, lon:string,food:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resturants_address_food`,{food:food,lat:lat, lon:lon});
  }
  
  getFood(id:Number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/menu_item_id`,{id:id},this.httpOptions);
  }
  

}
