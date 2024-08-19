import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOrdersService } from '../services/admin-orders.service';

@Component({
  selector: 'app-admin-edit-orders',
  templateUrl: './admin-edit-orders.component.html',
  styleUrl: './admin-edit-orders.component.css'
})
export class AdminEditOrdersComponent {
  orderForm: FormGroup;
  orderId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminOrdersService: AdminOrdersService,
    private router: Router
  ) {
    this.orderForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      driver_id: ['', Validators.required],
      orderDate: ['', Validators.required],
      totalPrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });
    if(this.orderId!=null)
      this.adminOrdersService.getOrder(this.orderId).subscribe(
        (data: any) => {
          this.orderForm = this.formBuilder.group({
            user_id: data.message.user_id,
            driver_id: data.message.driver_id,
            orderDate: data.message.orderDate,
            totalPrice: data.message.totalPrice,
          })
        },
        (error) => {
          console.error('Error fetching order details', error);
        }
      );
  }

  onSubmit() {
    if (this.orderForm.valid && this.orderId != null) {
      const { user_id, driver_id, orderDate, totalPrice } = this.orderForm.value;
      this.adminOrdersService.EditOrder(this.orderId, user_id, driver_id, totalPrice, orderDate).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error updating order', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/admin']);
  }
}
