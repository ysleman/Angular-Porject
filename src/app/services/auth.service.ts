import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API domain

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  
  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData, this.httpOptions);
  }

  async login(credentials: { username: string, password: string }): Promise<Observable<any>> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, credentials).toPromise();
      this.setToken(response.access_token);
      return response;
    } catch (error) {
      throw error; // Handle error appropriately in your component/service
    }
  }
  
  async loginAdmin(credentials: any): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login__222__admin`, credentials).toPromise();
      this.setToken(response.access_token);
      return response;
    } catch (error) {
      throw error; // Handle error appropriately in your component/service
    }
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/fgpassword`, { email }, this.httpOptions);
  }

  async loginRestaurant(credentials: any): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login/res`, credentials).toPromise();
      this.setToken(response.access_token);
      return response;
    } catch (error) {
      throw error; // Handle error appropriately in your component/service
    }
  }

  async loginDeliveryDriver(credentials: any): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login/del`, credentials).toPromise();
      this.setToken(response.access_token);
      return response;
    } catch (error) {
      throw error; // Handle error appropriately in your component/service
    }
  }

  private setToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }
  isAuthenticated(): boolean {
    const authToken = sessionStorage.getItem('authToken');
    return authToken !== null && authToken !== undefined;
  }

  checkAuthenticationRequest(): Observable<boolean> {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      // Example: Make a request to check if authentication is successful
      return this.http.get<boolean>(`${this.apiUrl}/api/admin/check-auth`, {headers: new HttpHeaders({
        Authorization:`Bearer ${authToken}`,
      })});
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }
  checkAuthenticationResRequest(): Observable<boolean> {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      // Example: Make a request to check if authentication is successful
      return this.http.get<boolean>(`${this.apiUrl}/api/resturants/check-auth`, {headers: new HttpHeaders({
        Authorization:`Bearer ${authToken}`,
      })});
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }
  checkAuthenticationDelRequest(): Observable<boolean> {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      // Example: Make a request to check if authentication is successful
      return this.http.get<boolean>(`${this.apiUrl}/api/delivery_drivers/check-auth`, {headers: new HttpHeaders({
        Authorization:`Bearer ${authToken}`,
      })});
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }
}
