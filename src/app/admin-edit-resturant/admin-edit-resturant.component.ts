import { Component } from '@angular/core';
import { Restaurant } from '../model/Resturant';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRestaurantsService } from '../services/admin-restaurants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-resturant',
  templateUrl: './admin-edit-resturant.component.html',
  styleUrl: './admin-edit-resturant.component.css'
})
export class AdminEditResturantComponent {
  restaurantId: number | undefined;
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
    });
    if(this.restaurantId){
      this.adminRestaurantsService.getRestaurant(+this.restaurantId).subscribe(
        (data: any) => {
          this.RestaurantForm = this.formBuilder.group({
            name: data.message.name,
            rating: data.message.rating,
            username: data.message.username,
            phone: data.message.phone,
            address: data.message.address,
            newpassword: [''],
            typeoftax: data.message.typeoftax,
            moneyorpercentage:data.message.moneyorpercentage
          })
        },
        (error) => {
          console.error('Error fetching restaurant', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.RestaurantForm.valid && this.restaurantId !== undefined) {
      const { name, rating, username, phone, address, newpassword,typeoftax,moneyorpercentage } = this.RestaurantForm.value;
      this.adminRestaurantsService.EditRestaurant(this.restaurantId, name, rating, address, phone, username, newpassword,typeoftax,moneyorpercentage).subscribe(
        () => {
          console.log("Sucessfully updated");
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
