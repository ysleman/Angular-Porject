import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDriversService } from '../services/admin-drivers.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-drivers-add',
  templateUrl: './admin-drivers-add.component.html',
  styleUrl: './admin-drivers-add.component.css'
})
export class AdminDriversAddComponent {
  driverForm: FormGroup;

  constructor(
    private adminDriversService: AdminDriversService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.driverForm = this.formBuilder.group({
      full_Name: [''],
      username: [''],
      password: [''],
      phone: ['']
    });
  }

  onSubmit() {
    if (this.driverForm.valid) {
      const { full_Name, username, password, phone } = this.driverForm.value;
      this.adminDriversService.AddDrivers(full_Name, username, phone, password).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error adding driver', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/admin']);
  }
}
