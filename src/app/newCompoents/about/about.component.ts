import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent{
  Name:string="Black";
  Color:string="white";
  Flag:boolean=true;
  Name1:string="hasan osman";
  Name2:string="Yousef Sleman";
  Id1:string="205877517";
  Id2:string="211402326";
  Src1:string="picture.jpg";
  Src2:string="picture2.jpg";
  onShow() {
    if(this.Flag){
      this.Color="Black";
      this.Name="Changed Colored to Black";
      this.Flag=false;
    }else {
      this.Color="White";
      this.Name="Changed Colored to White";
      this.Flag=true;
    }
  }
}
