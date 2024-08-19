import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from '../services/admin-orders.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  dataPoints: any[] = [];
  years: number[] = [2024,2023 ];
  selectedYear: number = 2024;
  selectedMonth: number | null = null;
  monthlyTotals:any[]=Array(12).fill(0);
  Display:String="Waiting";
  months: { name: string, value: number }[] = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
  ];
  thestuff:any=null;
  public chartOptions = {
    animationEnabled: true,
    title: {
      text: "Orders List"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: this.dataPoints
    }]
  };

  constructor(private adminOrdersService: AdminOrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders(): void {
    this.adminOrdersService.fetchOrders().subscribe(
      (data: any) => {
        this.calculateOrders(data.data);
        this.thestuff=data.data;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  calculateOrders(data: any) {

    const year=this.selectedYear;

    data.forEach((ordersArray: any) => {
      for (let i = 0; i < ordersArray.orders.length; i++) {
        if(ordersArray.orders[i][12]==year)
          for (let y = 0; y < 12; y++) {
            if (ordersArray.orders[i][y] != 0) {
              this.monthlyTotals[y] += ordersArray.orders[i][y];
            }
          }
      }
    });
    this.updateMonthData(data);
  }
  updateMonthData(data: any){
    const year=this.selectedYear;
    this.dataPoints = [];
    data.forEach((ordersArray: any) => {
      console.log(ordersArray);
      let index=0;
      for(let i=0;i<ordersArray.orders.length;i++)
        if(ordersArray.orders[i][12]==year) break;
        else index++;
      if(index<ordersArray.orders.length){
          if(this.selectedMonth!=null)
          if (this.monthlyTotals[this.selectedMonth] != 0 && ordersArray.orders[index][this.selectedMonth]!=0) 
            this.dataPoints.push({ y: (ordersArray.orders[index][this.selectedMonth]/this.monthlyTotals[this.selectedMonth])*100, name:  ordersArray.restaurant_name});
      }
    });
   if(this.dataPoints.length!=0)
    this.updateChart();
  else this.Display="No Result";
  }

  getMonthName(index: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[index];
  }

  updateChart() {
    this.Display="idk";
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Orders List"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: this.dataPoints
      }]
    };
  }
  onYearChange(event: any): void {
    this.selectedYear = event.target.value;
    this.fetchOrders();
  }
  onMonthChange(event: any): void {
    this.selectedMonth = event.target.value;
    this.updateMonthData(this.thestuff);
  }
}

