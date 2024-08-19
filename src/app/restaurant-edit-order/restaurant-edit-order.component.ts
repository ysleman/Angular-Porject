import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAdminService } from '../services/restaurant-admin.service';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-restaurant-edit-order',
  templateUrl: './restaurant-edit-order.component.html',
  styleUrl: './restaurant-edit-order.component.css'
})
export class RestaurantEditOrderComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });
    this.fetchOrderDetails();
  }
  orderForm: FormGroup;
  orderId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private restaurantAdminService: RestaurantAdminService
  ) {
    this.orderForm = this.formBuilder.group({
      price: ['', Validators.required],
      finished: ['', Validators.required],
    });
  }
 
  fetchOrderDetails() {
    if(this.orderId!=null)
    this.restaurantAdminService.getOrderDetails(this.orderId).subscribe(
      (data) => {
        this.orderForm = this.formBuilder.group({
          price: data.res.price,
          finished: data.res.finished,
        })
      },
      (error) => {
        console.error('Error fetching order details', error);
      }
    );
  }

  updateOrder() {
    const { price, finished} = this.orderForm.value;
    if(this.orderId!=null)
    this.restaurantAdminService.updateOrder(this.orderId,finished,price).subscribe(
      () => {
        this.router.navigate(['/restaurant_admin']);
      },
      (error) => {
        console.error('Error updating order', error);
      }
    );
  }
  onCancel() {
    this.router.navigate(['/restaurant_admin']);
  }
}
