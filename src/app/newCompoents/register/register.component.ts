import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  Email = new FormControl("");
  Username=new FormControl("");
  Address=new FormControl("");
  Phone=new FormControl("");
  Password = new FormControl("");
  CPassword = new FormControl("");
  Fname = new FormControl("");
  Lname = new FormControl("");
  Gender=new FormControl("");
  Birth_Date=new FormControl("");
  email:string="";
  username:string="";
  password:string="";
  phone:string="";
  cpassword:string="";
  address:string="";
  fname:string="";
  lname:string="";
  gender:string="";
  birth_date:string="";
  Retry:boolean=false;
  switchit:boolean=true;
  switchit2:boolean=true;
  constructor(private userService : UserService , private router: Router){
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('authToken'))
      this.router.navigate(['/profile/user']);
  }
  validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  CheckRegister(event : Event){
    event.preventDefault();
    // $username = $request->username;
    // $email = $request->email;
    // $address=$request->address;
    // $password = $request->password;
    // $firstname=$request->firstname;
    // $lastname=$request->lastname;
    // $phone=$request->phone;
    // $birthdate=$request->birthdate;
    // $img=$request->img;
    this.address=this.Address.getRawValue() == null  ? "":this.Address.getRawValue()!;
    this.email=this.Email.getRawValue() == null  ? "":this.Email.getRawValue()!;
    this.username=this.Username.getRawValue() == null ? "":this.Username.getRawValue()!;
    this.password= this.Password.getRawValue() == null ? "":this.Password.getRawValue()!;
    this.cpassword= this.CPassword.getRawValue() == null ? "":this.CPassword.getRawValue()!;
    this.fname= this.Fname.getRawValue() == null ? "":this.Fname.getRawValue()!;
    this.lname= this.Lname.getRawValue() == null ? "":this.Lname.getRawValue()!;
    this.gender= this.Gender.getRawValue() == null ? "":this.Gender.getRawValue()!;
    this.phone= this.Phone.getRawValue() == null ? "":this.Phone.getRawValue()!;
    this.birth_date=this.Birth_Date.getRawValue()==null ? "":this.Birth_Date.getRawValue()!;
    if(this.email == "" || this.password == ""||this.cpassword == ""|| this.fname == ""|| this.gender == ""|| this.lname== "" || this.birth_date == ""){
      this.Retry=true
      alert("Fill the Fields correctly")
    }
    if (!this.Retry)
        if(this.validateEmail(this.email)&&this.password == this.cpassword){
          this.userService.registerUser(this.username,this.email,this.password,this.fname,this.lname,this.phone,this.birth_date,this.gender,this.address).subscribe(data=>{
            this.router.navigate(['profile/login/']);
          });
        }
        if(this.password != this.cpassword){
          alert("Confirm Password and Password should be same")
        }
        if(!this.validateEmail(this.email)){
          alert("Enter Email Correctly")
        }
  }
  showpassword(){
    let d=(document.getElementById('password-field') as HTMLInputElement);
    if(this.switchit)d.type= 'text';
    else d.type='password';
    this.switchit=!this.switchit;
  }
  showpassword2(){
    let d=(document.getElementById('password-field2') as HTMLInputElement);
    if(this.switchit2)d.type= 'text';
    else d.type='password';
    this.switchit2=!this.switchit2;
  }
}
