import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService } from '../services/admin-users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-users',
  templateUrl: './admin-edit-users.component.html',
  styleUrl: './admin-edit-users.component.css'
})
export class AdminEditUsersComponent {
  userForm: FormGroup;
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private adminUsersService: AdminUsersService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: [''],
      password: [''],
      phone: [''],
      birthDate: [''],
      img: [''],
      address: ['']
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    });
    if(this.userId){
      this.adminUsersService.getUser(+this.userId).subscribe(
        (data: any) => {
          this.userForm = this.formBuilder.group({
            firstname: data.message.firstname,
            lastname: data.message.lastname,
            username: data.message.username,
            email: data.message.email,
            address: data.message.address,
            password: [''],
            phone: data.message.phone,
            birthDate:data.message.birthDate,
            img: data.message.img
          })
        },
        (error) => {
          console.error('Error fetching restaurant', error);
        }
      );
    }
  }
  onSubmit() {
    console.log(this.userForm);
    if (this.userForm.valid && this.userId!=null) {
      const { firstname, lastname, username, email, password, phone, birthDate, img, address } = this.userForm.value;
      this.adminUsersService.EditUser(this.userId,username,email, address, password, firstname, lastname, phone, birthDate, img).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/admin']);
  }
}
