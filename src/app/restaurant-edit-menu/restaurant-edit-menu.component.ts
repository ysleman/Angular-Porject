import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAdminService } from '../services/restaurant-admin.service';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-restaurant-edit-menu',
  templateUrl: './restaurant-edit-menu.component.html',
  styleUrl: './restaurant-edit-menu.component.css'
})
export class RestaurantEditMenuComponent  implements OnInit {
  menuForm: FormGroup;
  ingredients: any = [];
  menuitemid: number | undefined;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantAdminService: RestaurantAdminService) {
    this.menuForm = this.fb.group({
      mainname: ['', Validators.required],
      description: ['', Validators.required],
      mainprice: ['', Validators.required],
      img: ['', Validators.required],
      quantity: ['', Validators.required],
      howmany: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.menuitemid = +params['id'];
      console.log(this.menuitemid);
    });
    this.getIngredients();
  }
  getIngredients():void{
    if(this.menuitemid)
    this.restaurantAdminService.getMenuItemDetails(this.menuitemid).subscribe(
      (data: any) => {
        this.menuForm = this.formBuilder.group({
          mainname: data[0].name,
          description: data[0].description,
          mainprice: data[0].price,
          img: data[0].img,
          quantity: data[0].quantity,
          howmany: data[0].howmany,
        })
        this.ingredients = data.slice(1);
        console.log(this.ingredients);
        this.updateIngredients();
      },
      (error) => {
        console.error('Error fetching ingredients', error);
      }
    );
  }
  updateIngredients(): void {
    const howmany = this.menuForm.get('howmany')?.value || 1;
    // Clear existing ingredient controls
    Object.keys(this.menuForm.controls).forEach(key => {
      if (key.startsWith('name') || key.startsWith('price')) {
        this.menuForm.removeControl(key);
      }
    });
    for (let i = 0; i < howmany; i++) {
      this.menuForm.addControl('name' + (i), this.fb.control(this.ingredients[i]?.IngredientID.name || '', Validators.required));
      this.menuForm.addControl('price' + (i), this.fb.control(this.ingredients[i]?.IngredientID.price || '', Validators.required));
    }
  }

  onSubmit(): void {
    if (this.menuForm.valid && this.menuitemid!=null) {
      this.restaurantAdminService.updateMenuItem(this.menuitemid,this.menuForm.value).subscribe(()=>{
        this.router.navigate(['/restaurant_admin']);
      })
    }
  }

  onCancel(): void {
    this.menuForm.reset();
  }
}
