import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080'; // Replace with your API domain
  private authToken = localStorage.getItem('authToken');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${this.authToken}`
    })
  };

  cartItems: { product: any, quantity: number }[] = [];
  cartCount: number = 0;
  private storageKey = 'cartItems';

  constructor(private http: HttpClient) {
    this.loadCartItems();
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  addToCart(product: any): void {
    console.log(this.cartItems);
    const existingItem = this.cartItems.find(item => item.product['id'] === product['id']);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCartCount();
    this.saveCartItems();
  }

  updateCartCount(): void {
    this.cartCount = this.getCartCount();
  }

  getCartItems(): { product: any, quantity: number }[] {
    return this.cartItems;
  }

  updateItemQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product['id'] === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCartCount();
      this.saveCartItems();
    }
  }

  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product['id'] !== productId);
    this.updateCartCount();
    this.saveCartItems();
  }

  private saveCartItems(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  private loadCartItems(): void {
    const savedItems = localStorage.getItem(this.storageKey);
    if (savedItems) {
      this.cartItems = JSON.parse(savedItems);
      this.updateCartCount(); 
    }
  }
  async addorder(): Promise<any> {
    let i = 0;
    let free_drivers: any[] = [];
    const cartItemsidk = localStorage.getItem('cartItems');

    if (cartItemsidk) {
        const items = JSON.parse(cartItemsidk);
        let uniq = this.getunique(items);
        console.log(uniq);
        for (let x = 0; x < uniq.length; x++) {
            // Use a Promise and await the response
            await this.getwhofree(uniq[x].toString()).toPromise().then((data) => {
                free_drivers[i++] = data.message;
            });
        }
    }

    if (free_drivers.length > 0 && free_drivers[0].length >0) {
        console.log(free_drivers);
        return free_drivers[0][0]['id'];
    } else {
        return null;
    }
}


  getunique(idk:any){
    let arrlist:number[]=[];
    let i=0;
    for(const m of idk)
      arrlist[i++]=m['product']['resturant_id']
    i=0;
    let uniq = [...new Set(arrlist)];
    return uniq;
  }
  getwhofree(x:string):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/whofree`, {restuarant_id:x}, this.httpOptions);
  }
  process(name:string,cardNumber:string,expirationDate:string,cvv:string,order_id:string):Observable<any>{
    let price=0;
    const cartItemsidk=localStorage.getItem('cartItems');
    if(cartItemsidk){
      const items=(JSON.parse(cartItemsidk));
      for(const item of items)
        price+=(item['product']['price'])*item['quantity'];
    }
    const body={Name:name,cardNumber:cardNumber,expirationDate:expirationDate,cvv:cvv,status:"processed",payment_method:"credit_card",currency:"ILS",
      amount:price,order_id:order_id,cardlist:JSON.parse(JSON.stringify(cartItemsidk))};
    return this.http.post<any>(`${this.apiUrl}/api/payment/process`, body, this.httpOptions);
  }
  async addorderrequest():Promise<Observable<any>>{
    const cartItemsidk=localStorage.getItem('cartItems');
    let price=0;
    let len=0;
    let i=0;
    let driverid=await this.addorder();
    let something:any={};
    if(cartItemsidk){
     const items=(JSON.parse(cartItemsidk));
     for(const item of items){
        len++;
       price+=(item['product']['price'])*item['quantity'];
       something['item_id'+i]=item['product']['id'];
       something['quantity'+i]=item['quantity'];
       something['resturant_id'+i]=item['product']['resturant_id'];
       i++;
      }
    }
    
    const body={
      driver_id:driverid,
      totalprice:price,
      howmany:len,
      ...something
    };
    console.log(body);
    return this.http.post<any>(`${this.apiUrl}/api/add_order`, body, this.httpOptions);
  }
}
