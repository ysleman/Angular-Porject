import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  Email = new FormControl("");
  Password = new FormControl("");
  credentials = { username: '', password: '' };


  
  email:string="";
  password:string="";
  switchit:boolean=true;
  validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('authToken'))this.router.navigate(['/profile/user']);
  }
  constructor(private authService: AuthService,private router: Router){}
  CheckLogin(event:Event){
    event.preventDefault();
    this.credentials.username=this.Email.getRawValue() == null || this.Email.getRawValue() == "" ? "Email":this.Email.getRawValue()!;
    this.credentials.password=this.Password.getRawValue()== null || this.Password.getRawValue() == "" ? "password":this.Password.getRawValue()!;
    this.login();
    // this.email=this.Email.getRawValue() == null || this.Email.getRawValue() == "" ? "Email":this.Email.getRawValue()!;
    // this.password=this.Password.getRawValue()== null || this.Password.getRawValue() == "" ? "password":this.Password.getRawValue()!;
    // if(this.validateEmail(this.email))
    //     if (this.userService.loginUser(this.email,this.password) ) 
    //     {
    //       sessionStorage.setItem('email', this.email);
    //       this.router.navigate(['profile/user/']);
    //     }
    //     else {
    //       alert("wrong username or password")
    //     }
    // else alert("Enter Email Correctly")
  }
  async login() {
    try {
      const response = await (await this.authService.login(this.credentials));
      console.log('Login successful!', response);

      // Redirect to dashboard or another route upon successful login
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (display error message, etc.)
    }
  }
  showpassword(){
    let d=(document.getElementById('password-field') as HTMLInputElement);
    if(this.switchit)d.type= 'text';
    else d.type='password';
    this.switchit=!this.switchit;
  }
}
