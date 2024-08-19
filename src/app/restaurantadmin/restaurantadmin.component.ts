import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAdminService } from '../services/restaurant-admin.service';

@Component({
  selector: 'app-restaurantadmin',
  templateUrl: './restaurantadmin.component.html',
  styleUrl: './restaurantadmin.component.css'
})
export class RestaurantadminComponent {
  restaurant:any;
  menuItems: any[] = [];
  orders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantadminService: RestaurantAdminService,
  ) {}

  ngOnInit(): void {
    const id=1;
    this.fetchRestaurantDetails(id);
    this.fetchOrders();
    this.fetchMenuItems();
  }

  fetchRestaurantDetails(id: number) {
    this.restaurantadminService.getDetails(id).subscribe(
      (data) => {
        this.restaurant = data;
      },
      (error) => {
        console.error('Error fetching restaurant details', error);
      }
    );
  }

  fetchMenuItems() {
    this.restaurantadminService.fetchMenuItems().subscribe(
      (data: any[]) => {
        this.menuItems = data;
      },
      (error) => {
        console.error('Error fetching menu items', error);
      }
    );
  }

  fetchOrders() {
    this.restaurantadminService.fetchOrders().subscribe(
      (data: any[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }


  deleteMenuItem(menuItemId: number) {
    this.restaurantadminService.deleteMenuItems(menuItemId).subscribe(
      () => {
        this.menuItems = this.menuItems.filter(item => item.id !== menuItemId);
      },
      (error) => {
        console.error('Error deleting menu item', error);
      }
    );
  }
  editMenuItem(menuItemId: number) {
    this.router.navigate([`/restaurant_admin/edit_menu_item/${menuItemId}`]);
  }

  navigateToAddMenuItem() {
   this.router.navigate([`/restaurant_admin/add_menu_item`]);
  }
  editOrder(id:number){
    this.router.navigate([`/restaurant_admin/edit_order/${id}`]);
  }
  deleteOrder(id:number){
    this.restaurantadminService.deleteOrder(id).subscribe((data)=>{
      this.router.navigate([`/restaurant_admin`]);
    })
  }
  acceptOrder(orderId: number): void {
    this.restaurantadminService.acceptOrder(true,orderId).subscribe((data)=>{});
  }

  rejectOrder(orderId: number): void {
    // Logic to reject the order
    this.restaurantadminService.acceptOrder(false,orderId).subscribe((data)=>{});
  }
}
