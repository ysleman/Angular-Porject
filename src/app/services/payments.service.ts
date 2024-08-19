import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  fetchPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/payments`, this.httpOptions);
  }

  addPayment(paymentData: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/payments`, paymentData, this.httpOptions);
  }

  updatePayment(paymentData: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/payments/${paymentData.id}`, paymentData, this.httpOptions);
  }

  deletePayment(paymentId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/payments/${paymentId}`, this.httpOptions);
  }
}
