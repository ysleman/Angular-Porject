import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() loggedIn:boolean=false;
  constructor(private router: Router){}
  ngOnInit(): void {
   this.router.events.subscribe((val:any)=>{
    if(val.url){
      if(sessionStorage.getItem('email') || sessionStorage.getItem('authToken')){
        this.loggedIn=true;
        console.log(this.loggedIn);
      }
    }
   })
  }
  SignOut(){
    this.loggedIn=false;
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('email');
    this.router.navigate(['']);
  }
}
