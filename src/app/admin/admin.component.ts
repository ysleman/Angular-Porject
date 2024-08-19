import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/Resturant';
import { AdminRestaurantsService } from '../services/admin-restaurants.service';
import { AdminOrdersService } from '../services/admin-orders.service';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminDriversService } from '../services/admin-drivers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  restaurants: Restaurant[] | undefined;
  orders: any[] | undefined;
  users: any[] | undefined;
  drivers: any[] | undefined;
  selectedRestaurant: any | null = null;

  constructor(
    private adminRestaurantsService: AdminRestaurantsService,
    private adminOrdersService: AdminOrdersService,
    private adminUsersService: AdminUsersService,
    private adminDriverService: AdminDriversService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRestaurants();
    this.fetchOrders();
    this.fetchUsers();
    this.fetchDrivers();
  }

  fetchRestaurants(): void {
    this.adminRestaurantsService.fetchRestaurants().subscribe(
      (data: any) => {
        this.restaurants = data.message;
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
  }

  fetchOrders(): void {
    this.adminOrdersService.fetchlistofOrders().subscribe(
      (data: any) => {
        this.orders = data.message;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  fetchUsers(): void {
    this.adminUsersService.fetchUsers().subscribe(
      (data: any) => {
        this.users = data.message;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  fetchDrivers(): void {
    this.adminDriverService.fetchDrivers().subscribe(
      (data: any) => {
        this.drivers = data.message;
      },
      (error) => {
        console.error('Error fetching drivers', error);
      }
    );
  }

  selectRestaurant(restaurant: Restaurant) {
    this.selectedRestaurant = restaurant;
  }

  clearSelection() {
    this.selectedRestaurant = null;
  }

  deleteRestaurant(restaurantId: number) {
    this.adminRestaurantsService.deleteRestaurant(restaurantId).subscribe(
      () => {
        this.fetchRestaurants();
      },
      (error) => {
        console.error('Error deleting restaurant', error);
      }
    );
  }

  editRestaurant(restaurantId: number) {
    this.router.navigate(['/admin/restaurantEdit', restaurantId]);
  }

  addRestaurant() {
    this.router.navigate(['/admin/restaurantAdd']);
  }

  editOrder(orderId: number) {
    this.router.navigate(['/admin/orderEdit', orderId]);
  }

  deleteOrder(orderId: number) {
    this.adminOrdersService.deleteOrder(orderId).subscribe(
      () => {
        this.fetchOrders();
      },
      (error) => {
        console.error('Error deleting order', error);
      }
    );
  }


  editUser(userId: number) {
    this.router.navigate(['/admin/userEdit', userId]);
  }

  deleteUser(userId: number) {
    this.adminUsersService.deleteUser(userId).subscribe(
      () => {
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  addUser() {
    this.router.navigate(['/admin/addUser']);
  }

  editDriver(driverId: number) {
    this.router.navigate(['/admin/driverEdit', driverId]);
  }

  deleteDriver(driverId: number) {
    this.adminDriverService.deleteDriver(driverId).subscribe(
      () => {
        this.fetchDrivers();
      },
      (error) => {
        console.error('Error deleting driver', error);
      }
    );
  }

  addDriver() {
    this.router.navigate(['/admin/driverAdd']);
  }
}
