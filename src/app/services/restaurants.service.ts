import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/Resturant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/resturants`, this.httpOptions);
  }

  addRestaurant(restaurantData: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/resturants`, restaurantData, this.httpOptions);
  }

  updateRestaurant(restaurantData: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/resturants/${restaurantData.id}`, restaurantData, this.httpOptions);
  }

  deleteRestaurant(restaurantId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/resturants/${restaurantId}`, this.httpOptions);
  }
}
