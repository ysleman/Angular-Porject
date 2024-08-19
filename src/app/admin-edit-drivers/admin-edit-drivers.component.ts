import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminDriversService } from '../services/admin-drivers.service';

@Component({
  selector: 'app-admin-edit-drivers',
  templateUrl: './admin-edit-drivers.component.html',
  styleUrls: ['./admin-edit-drivers.component.css']
})
export class AdminEditDriversComponent implements OnInit {
  driverForm: FormGroup;
  driverId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminDriversService: AdminDriversService,
    private router: Router
  ) {
    this.driverForm = this.formBuilder.group({
      full_Name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.driverId = +params['id'];
      console.log(this.driverId);
    });
    if(this.driverId != null)
    this.adminDriversService.getDriver(+this.driverId).subscribe(
      (data: any) => {
        this.driverForm = this.formBuilder.group({
          full_Name: data.message.full_Name,
          phone: data.message.phone,
          username: data.message.username,
          password: [''],
        })
      },
      (error) => {
        console.error('Error fetching driver details', error);
      }
    );
  }

  onSubmit() {
    if (this.driverForm.valid&&this.driverId!=null) {
      const { full_Name, username, password, phone } = this.driverForm.value;
      this.adminDriversService.EditDrivers(this.driverId, full_Name, username, phone, password).subscribe(
        () => {
          this.router.navigate(['/admin']);
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
