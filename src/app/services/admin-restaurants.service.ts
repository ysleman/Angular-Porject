import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/Resturant';


@Injectable({
  providedIn: 'root'
})
export class AdminRestaurantsService {

  private apiUrl = 'http://localhost:8080'; // Replace with your API domain
  private authToken = sessionStorage.getItem('authToken');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${this.authToken}`
    })
  };
  
  constructor(private http: HttpClient) { }
  fetchRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/api/admin/resturants`, this.httpOptions);
  }
  fetchtotalResturant(Id:Number,year:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/admin/resturants/money/total`,{ id: Id , years:year },this.httpOptions);
  }
  fetchtaxResturant(Id:Number,year:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/admin/resturants/money/tax`,{ id: Id  , years:year},this.httpOptions);
  }
  getRestaurant(Id:Number):Observable<any>{
    return this.http.post<Restaurant>(`${this.apiUrl}/api/admin/resturants`,{id:Id}, this.httpOptions);
  }
  deleteRestaurant(Id:Number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/admin/resturants_remove`,{ resturant_id: Id },this.httpOptions);
  }
  EditRestaurant(Id: number, Name: string, Rating: number, Address: string, Phone: string, Username: string, NewPassword: string,typeoftax:string,moneyorpercentage:string): Observable<any> {
    const body = {
      id: Id,
      name: Name !== '' ? Name : null,
      rating: Rating !== null ? Rating : null,
      address: Address !== '' ? Address : null,
      phone: Phone !== '' ? Phone : null,
      username: Username !== '' ? Username : null,
      newpassword: NewPassword !== '' ? NewPassword : null,
      typeoftax: typeoftax !== '' ? typeoftax : null,
      moneyorpercentage: moneyorpercentage !== '' ? moneyorpercentage : null,
    };
  
    return this.http.post<any>(`${this.apiUrl}/api/admin/resturants_edit`, body, this.httpOptions);
  }
  AddRestaurant(Name: string, Rating: number, Address: string, Phone: string, Username: string, NewPassword: string,typeoftax:string,moneyorpercentage:string): Observable<any> {
    const body = {
      name: Name !== '' ? Name : null,
      rating: Rating !== null ? Rating : null,
      address: Address !== '' ? Address : null,
      phone: Phone !== '' ? Phone : null,
      username: Username !== '' ? Username : null,
      password: NewPassword !== '' ? NewPassword : null,
      typeoftax: typeoftax !== '' ? typeoftax : null,
      moneyorpercentage: moneyorpercentage !== '' ? moneyorpercentage : null,
    };
  
    return this.http.post<any>(`${this.apiUrl}/api/admin/resturants_add`, body, this.httpOptions);
  }

}
