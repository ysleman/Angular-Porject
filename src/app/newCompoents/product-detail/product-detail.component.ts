import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MenuItemsService } from '../../services/menu-items.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  Name: string = "None";
  count: number = 0;
  Price: string = "None";
  src: string = "../../assets/dummy.jpg";
  url: string = "";
  type: string = "";
  locationurl: string = "";
  product: any | undefined; // Added property to store the current product

  constructor(
    private menuitemsservice: MenuItemsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationurl = this.router.url;
    let productId = Number(this.locationurl.split("/")[2]);
    console.log(productId);
    this.menuitemsservice.getFood(productId).subscribe((data: any[]) => {
      this.product = data[0];
      this.Name = this.product?.name;
      this.Price = this.product?.price;
      this.src = this.product?.img || "../../assets/dummy.jpg";
      this.updateCartCount();
    });
  }

  incCart(event: Event): void {
    event.preventDefault(); 
    if (this.product) {
      this.cartService.addToCart(this.product);
      console.log('Product added to cart:', this.product);
      this.updateCartCount();
    } else {
      console.error('No product to add');
    }
  }
  viewOrder(): void {
    this.router.navigate(['/cart']);
  }
  updateCartCount(): void {
    this.count = this.cartService.getCartCount();
  }
}
