import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  name: string = '';
  cardNumber: string = '';
  expirationDate: string = '';
  cvv: string = '';

  constructor(private router: Router, private cartService: CartService) {}

  async submitPayment(): Promise<void> {
    if (this.name && this.cardNumber && this.expirationDate && this.cvv) {
     
      (await this.cartService.addorderrequest()).subscribe((data)=>{
        console.log(data);
        this.cartService.process(this.name,this.cardNumber,this.expirationDate,this.cvv,data.order['id']).subscribe((data)=>{
          console.log(data);
          this.showalert();
        })
      });
      //this.router.navigate(['/confirmation']);
    } else {
      console.error('Please fill out all fields');
    }
  }
  showalert(){
    window.alert('Payment Success');
  }
}
