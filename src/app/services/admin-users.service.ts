import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  

  private apiUrl = 'http://localhost:8080'; // Replace with your API domain
  private authToken = sessionStorage.getItem('authToken');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${this.authToken}`
    })
  };
  
  constructor(private http: HttpClient) { }
  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/admin/users`, this.httpOptions);
  }
  deleteUser(userId: number):Observable<any> {
    return this.http.post<User[]>(`${this.apiUrl}/api/admin/users_remove`,{user_id:userId}, this.httpOptions);
  }
  getUser(Id:Number):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/admin/users`,{id:Id}, this.httpOptions);
  }
  EditUser(Id: number, username: string, email: number, address: string, password: string, firstname: string, lastname: string,phone:string,birthdate:string,img:string): Observable<any> {
    const body = {
      user_id: Id,
      username: username !== '' ? username : null,
      email: email !== null ? email : null,
      address: address !== '' ? address : null,
      password: password !== '' ? password : null,
      firstname: firstname !== '' ? firstname : null,
      lastname: lastname !== '' ? lastname : null,
      phone: phone !== '' ? phone : null,
      birthdate: birthdate!== ''? birthdate : null,
      img: img!== ''? img : null,
    };
  
    return this.http.post<any>(`${this.apiUrl}/api/admin/users_edit`, body, this.httpOptions);
  }
  addUser(username: string, email: number, address: string, password: string, firstname: string, lastname: string,phone:string,birthdate:string,img:string): Observable<any> {
    const body = {
      username: username !== '' ? username : null,
      email: email !== null ? email : null,
      address: address !== '' ? address : null,
      password: password !== '' ? password : null,
      firstname: firstname !== '' ? firstname : null,
      lastname: lastname !== '' ? lastname : null,
      phone: phone !== '' ? phone : null,
      birthdate: birthdate!== ''? birthdate : null,
      img: img!== ''? img : null,
    };
  
    return this.http.post<any>(`${this.apiUrl}/api/admin/users_add`, body, this.httpOptions);
  }
}
