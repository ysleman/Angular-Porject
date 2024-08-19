import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUsersService } from '../services/admin-users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-users-add',
  templateUrl: './admin-users-add.component.html',
  styleUrl: './admin-users-add.component.css'
})
export class AdminUsersAddComponent {
  userForm: FormGroup;

  constructor(
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

  onSubmit() {
    console.log(this.userForm);
    if (this.userForm.valid) {
      const { firstname, lastname, username, email, password, phone, birthDate, img, address } = this.userForm.value;
      this.adminUsersService.addUser(username,email, address, password, firstname, lastname, phone, birthDate, img).subscribe(
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
