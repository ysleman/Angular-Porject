import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{
  email:string=""
  name:string=""
  Birth_Date:string=""
  gender:string=""
  image:string=""
  address:string=""
  phone:string=""
  constructor(private userService : UserService, private router: Router){
    if(sessionStorage.getItem('authToken') != null){
      // if(this.email!=null){
      //   this.name=this.userService.DisplayUser(this.email)?.['Full_name']!;
      //   this.Birth_Date=this.userService.DisplayUser(this.email)?.['Birth_Date']!;
      //   this.gender=this.userService.DisplayUser(this.email)?.['gender']!;
      //   this.image=this.userService.DisplayUser(this.email)?.['image']!;
      // }else {
      //   this.router.navigate(['profile/login'])
      // }
     
      this.userService.GetUser().subscribe({
        next: (data: any) => {
         this.name=data.message['firstname'] + ' ' + data.message['lastname'];
         this.Birth_Date=data.message['birthDate'];
         this.gender=data.message['gender'];
         this.image=data.message['img'];
         this.email=data.message['email'];
         this.address=data.message['address'];
         this.phone=data.message['phone'];
        },
        error: (error: any) => console.error('Error fetching menu items', error)
      });
    }else{
      this.router.navigate(['profile/login'])
    }

  }
  ngOnInit(): void {
  }

}
