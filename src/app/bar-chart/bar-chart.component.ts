import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Restaurant } from '../model/Resturant';
import { AdminRestaurantsService } from '../services/admin-restaurants.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() restaurant: Restaurant | undefined;
  dataPoints: any[] = [];
  dataPointstax:any[]=[];
  barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2024,2023];
  selectedYear: number = 2024;
  Display:String="Waiting";

  constructor(private adminRestaurantsService: AdminRestaurantsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant']) {
      this.getRestaurantTotal();
    }
  }

  ngOnInit(): void {   
    // Initial setup or fetching can be done here if needed
  }

  getRestaurantTotal() {
    if (this.restaurant && this.restaurant.id) {
      this.Display="Waiting";
      this.adminRestaurantsService.fetchtotalResturant(this.restaurant.id,this.selectedYear).subscribe(
        (data: any) => {
          this.dataPoints = this.barChartLabels
            .map((label, index) => ({ label: label, y: data.monthly_totals[index] }))
            .filter(point => point.y !== 0); // Only include data points with a non-zero value
            if (this.restaurant) { // Check if this.restaurant is not undefined
              if(this.dataPoints.length == 0) this.Display="No Result";
              else
              this.updateChartOptions(this.restaurant);
          }
        },
        (error) => {
          this.Display="No Result"
          console.error('Error fetching restaurant data', error);
        }
      );
      this.adminRestaurantsService.fetchtaxResturant(this.restaurant.id,this.selectedYear).subscribe(
        (data: any) => {
          this.dataPointstax = this.barChartLabels
            .map((label, index) => ({ label: label, y: data.monthly_totals[index] }))
            .filter(point => point.y !== 0); // Only include data points with a non-zero value
            if (this.restaurant) { // Check if this.restaurant is not undefined
              if(this.dataPoints.length == 0) this.Display="No Result";
              else
              this.updateCharttaxOptions(this.restaurant);
          }
        },
        (error) => {
          this.Display="No Result"
          console.error('Error fetching restaurant data', error);
        }
      );
    }
  }

  updateChartOptions(resturant: Restaurant ) {
    this.chartOptions = {
      title: {
        text: 'total ',
      },
      data: [
        {
          type: 'column',
          dataPoints: this.dataPoints,
        },
      ],
    };
    this.Display="idk";
  }
  updateCharttaxOptions(resturant: Restaurant ) {
    this.chartOptionstax = {
      title: {
        text: 'tax '
      },
      data: [
        {
          type: 'column',
          dataPoints: this.dataPointstax,
        },
      ],
    };
    this.Display="idk";
  }
  onYearChange(event: any): void {
    this.selectedYear = event.target.value;
    this.getRestaurantTotal();
  }
  public chartOptions: any = {};
  public chartOptionstax: any = {};

}
