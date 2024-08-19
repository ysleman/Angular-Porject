import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAdminService } from '../services/restaurant-admin.service';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-restaurant-add-menu',
  templateUrl: './restaurant-add-menu.component.html',
  styleUrl: './restaurant-add-menu.component.css'
})
export class RestaurantAddMenuComponent {
  menuForm: FormGroup;
  ingredients: any[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private restaurantAdminService: RestaurantAdminService) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      img: ['', Validators.required],
      quantity: ['', Validators.required],
      howmany: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateIngredients();
  }

  updateIngredients(): void {
    const howmany = this.menuForm.get('howmany')?.value || 1;
    this.ingredients = Array(howmany).fill(0);
    for (let i = 0; i < howmany; i++) {
      this.menuForm.addControl('name' + i, this.fb.control('', Validators.required));
      this.menuForm.addControl('price' + i, this.fb.control('', Validators.required));
    }
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      this.restaurantAdminService.addMenuItems(this.menuForm.value).subscribe(()=>{
        this.router.navigate(['/restaurant_admin']);
      })
    }
  }

  onCancel(): void {
    this.menuForm.reset();
  }
}
