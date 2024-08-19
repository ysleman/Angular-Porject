import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients`, this.httpOptions);
  }

  addIngredient(ingredientData: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.apiUrl}/ingredients`, ingredientData, this.httpOptions);
  }

  updateIngredient(ingredientData: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/ingredients/${ingredientData.id}`, ingredientData, this.httpOptions);
  }

  deleteIngredient(ingredientId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/ingredients/${ingredientId}`, this.httpOptions);
  }
}
