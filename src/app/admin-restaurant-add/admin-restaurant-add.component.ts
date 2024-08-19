import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRestaurantsService } from '../services/admin-restaurants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-restaurant-add',
  templateUrl: './admin-restaurant-add.component.html',
  styleUrl: './admin-restaurant-add.component.css'
})
export class AdminRestaurantAddComponent {
  RestaurantForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private adminRestaurantsService: AdminRestaurantsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.RestaurantForm = this.formBuilder.group({
      name: [''],
      rating: [''],
      username: [''],
      phone: [''],
      address: [''],
      newpassword: [''],
      typeoftax: [''],
      moneyorpercentage:['']
    })}
  onSubmit() {
    console.log(this.RestaurantForm);
    if (this.RestaurantForm.valid) {
      const { name, rating, username, phone, address, newpassword ,typeoftax,moneyorpercentage} = this.RestaurantForm.value;
      this.adminRestaurantsService.AddRestaurant(name, rating, address, phone, username, newpassword,typeoftax,moneyorpercentage).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error updating restaurant', error);
        }
      );
    }
  }
  onCancel() {
    this.router.navigate(['/admin']);
  }
}
