import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authToken = sessionStorage.getItem('authToken');
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  private httpOptionswithauth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${this.authToken}`
    })
  };

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, this.httpOptions);
  }

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, userData, this.httpOptions);
  }

  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userData.id}`, userData, this.httpOptions);
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/users/${userId}`, this.httpOptions);
  }
  GetUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/userdetails`, this.httpOptionswithauth);
  }
   // $username = $request->username;
    // $email = $request->email;
    // $address=$request->address;
    // $password = $request->password;
    // $firstname=$request->firstname;
    // $lastname=$request->lastname;
    // $phone=$request->phone;
    // $birthdate=$request->birthdate;
    // $img=$request->img;
    registerUser(username: string, email: string, password: string, firstname: string, lastname: string, phone:string,birthDate:string,gender:string,address:string){
    let image=''
    if(gender=="male"){
        image='Mavatar.jpg'
    }else if(gender=="female"){
        image='Favatar.jpg'
    }
    const body = {
      username: username,
      email: email !== '' ? email : null,
      password: password !== '' ? password : null,
      firstname: firstname !== '' ? firstname : null,
      lastname: lastname !== '' ? lastname : null,
      phone:phone!==''?phone:null,
      birthdate: birthDate!==''? birthDate : null,
      gender: gender!==''? gender : null,
      img: image ,
      address: address!==''? address : null
    };
  
    return this.http.post(`${this.apiUrl}/register`,body);
  }
}
