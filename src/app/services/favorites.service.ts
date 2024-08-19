import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorites } from '../model/Favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchFavorites(userId: number): Observable<Favorites[]> {
    return this.http.get<Favorites[]>(`${this.apiUrl}/favorites?userId=${userId}`, this.httpOptions);
  }

  addFavorite(favoriteData: Favorites): Observable<Favorites> {
    return this.http.post<Favorites>(`${this.apiUrl}/favorites`, favoriteData, this.httpOptions);
  }

  removeFavorite(favoriteId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/favorites/${favoriteId}`, this.httpOptions);
  }
}
