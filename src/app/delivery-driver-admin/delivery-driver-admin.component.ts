import { Component } from '@angular/core';
import { DeliveryDriverService } from '../services/delivery-drivers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-driver-admin',
  templateUrl: './delivery-driver-admin.component.html',
  styleUrl: './delivery-driver-admin.component.css'
})
export class DeliveryDriverAdminComponent {
  orders: any[] = [];

  constructor(private orderService: DeliveryDriverService, private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentOrders();
  }

  loadCurrentOrders(): void {
    this.orderService.fetchDeliveryDrivers().subscribe(
      (data: any) =>
         this.orders = data.message,
      error => console.error('Error loading orders', error)
    );
  }

  editOrder(order: any): void {
    this.router.navigate(['driver/edit-order', order]);
  }
}
