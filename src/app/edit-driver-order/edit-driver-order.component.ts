import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryDriverService } from '../services/delivery-drivers.service';

@Component({
  selector: 'app-edit-driver-order',
  templateUrl: './edit-driver-order.component.html',
  styleUrl: './edit-driver-order.component.css'
})
export class EditDriverOrderComponent {
  driverorderform: FormGroup;
  orderId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private deliverydriverService: DeliveryDriverService,
    private router: Router
  ) {
    this.driverorderform = this.formBuilder.group({
      delivered: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });
    if(this.orderId != null)
    this.deliverydriverService.fetchDeliveryDriverspost(+this.orderId).subscribe(
      (data: any) => {
        this.driverorderform = this.formBuilder.group({
          delivered: data.message.delivered,
        })
      },
      (error) => {
        console.error('Error fetching driver details', error);
      }
    );
  }

  onSubmit() {
    if (this.driverorderform.valid&&this.orderId!=null) {
      const { delivered } = this.driverorderform.value;
      console.log(delivered);
      this.deliverydriverService.updateDeliveryDriver(this.orderId, delivered).subscribe(
        () => {
          this.router.navigate(['/driver']);
        },
        (error) => {
          console.error('Error updating driver', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/admin']);
  }
}
