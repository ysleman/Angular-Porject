import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItemsService } from '../services/menu-items.service';
import { SessionStorageService } from '../services/session-storage.service';

declare const L: any;
declare const google: any;

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})
export class LocationSelectorComponent implements OnInit {
  title = 'locationApp';
  searchControl:any=null;
  stuff:any=null;
  @Output() closePopup = new EventEmitter<void>();
  constructor(private MenuItemsService: MenuItemsService,private sessionStorageService:SessionStorageService){}
  
  updateSessionStorage(newData: any) {
    this.sessionStorageService.updateSessionObject(newData);
  }
  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mymap);
      this.searchControl=L.Control.geocoder().addTo(mymap);
      
      let marker = L.marker(latLong).addTo(mymap);
      
      marker.bindPopup('<b>Hi</b>').openPopup();
      
      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('Current Location')
        .openOn(mymap);
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        if(this.searchControl != undefined){
          this.MenuItemsService.getFoodByLocation(this.searchControl['_results'][this.searchControl['_results'].length-1].center.lat,this.searchControl['_results'][this.searchControl['_results'].length-1].center.lng).subscribe((data)=>{
            this.stuff=data;
            this.updateSessionStorage(this.stuff);
          })
        }
         
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  confirmLocation(): void {
    setInterval(() => {
      location.reload();
      this.closePopup.emit();
    },1000);
  }

  closePopup1(): void {
    this.closePopup.emit();
  }
  
}

