import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../model/Product';
import { MenuItemsService } from '../../services/menu-items.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() dataToChildTwo: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  loading: boolean = true;
  count: number = 0;
  searchQuery: string = '';
  selectedLocation: string = '';
  locationPopupOpen: boolean = false;
  sessionObjectSubscription!: Subscription;
  sessionObject: any;
  stopdontcontiune: boolean = false;
  constructor(
    private cartService: CartService, 
    private router: Router,
    private menuitemsservice: MenuItemsService,
    private sessionStorageservice:SessionStorageService
  ) {}

  ngOnInit(): void {
     // Start watching sessionStorage changes
     this.sessionStorageservice.watchSessionStorage();

     // Subscribe to changes
     this.sessionObjectSubscription = this.sessionStorageservice.getSessionObject().subscribe(
       (sessionObject) => {
         this.sessionObject = sessionObject;
         if (this.sessionObject) {
           this.handleSessionObjectChange();
         }
       }
     );

    this.menuitemsservice.getFoods().subscribe({
      next: (data: any) => {
        if(!this.stopdontcontiune){
          this.products = data;
          this.filteredProducts = this.products; // Initialize filteredProducts
        }
        this.loading = false;
        this.updateCartCount();
      },
      error: (error: any) => console.error('Error fetching menu items', error)
    });
   
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.sessionObjectSubscription) {
      this.sessionObjectSubscription.unsubscribe();
    }
  }

  handleSessionObjectChange(): void {
    // Your logic here
    console.log('Session Object changed:', this.sessionObject);
    // Add your custom logic when the session storage changes
    if(this.sessionObject.length>0){
      this.stopdontcontiune=true; // Flag to stop the infinite loop
      this.products = [];  // Clear existing products
      for(let i=0; i<this.sessionObject.length; i++){
        this.menuitemsservice.GetFoodByResturant(this.sessionObject[i]['id']).subscribe(data=>{
          if(data.length==1)
            this.products.push(data[0]);
          else if (data.length>1)
            for(let j=0; j<data.length; j++){
              this.products.push(data[j]);
            }
        })
      }
      this.filteredProducts = this.products;
      console.log(this.filteredProducts);
    }
  }
  filterProducts() {
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedLocation === '' || product.location === this.selectedLocation)
    );
  }

  WhatType(isit: string): boolean {
    if (this.dataToChildTwo == null || this.dataToChildTwo == "Any") return true;
    return isit === this.dataToChildTwo;
  }

  incCart(event: Event, product: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.updateCartCount();
    console.log('Product added to cart:', product);
  }

  buyNow(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.updateCartCount();
    console.log('Buy Now clicked for product:', product);
    this.router.navigate(['/checkout']);
  }

  viewOrder(): void {
    this.router.navigate(['/cart']);
  }

  updateCartCount(): void {
    this.count = this.cartService.getCartCount();
  }

  gotopage(num: number): void {
    this.router.navigate(['/product', num]);
  }
  openLocationPopup(): void {
    this.locationPopupOpen = true;
  }
  closeLocationPopup(): void {
    this.locationPopupOpen = false;
  }
}
