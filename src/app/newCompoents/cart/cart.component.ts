import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../model/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: any, quantity: number }[] = [];

  constructor(private cartService: CartService,private router: Router  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(productId: number, event: Event): void {
    const quantity = (event.target as HTMLInputElement).valueAsNumber;
    if (quantity >= 0) {  
      this.cartService.updateItemQuantity(productId, quantity);
      this.cartItems = this.cartService.getCartItems();
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.cartItems = this.cartService.getCartItems();
  }
  gotopage(): void {
    this.router.navigate(['/payment']);
  }
}
