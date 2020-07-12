import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {MapServices} from '../services/MapServices'
import { from } from 'rxjs';
import { error } from 'protractor';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    title: string = 'COVID19 project';
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    locations:any;
    private geoCoder;

    @ViewChild('search')
    public searchElementRef: ElementRef;
    constructor(
        private mapServices: MapServices,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) { }
    consultResultByLocation(){
      this.mapServices.consultResultByLocation().subscribe(resp=>{
        console.log(resp)
        this.locations=resp;
      },error=>{
        console.log("Error:: " ,error)
      })
    }
      

    ngOnInit() {
      this.consultResultByLocation();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            this.setCurrentLocation();
            this.geoCoder = new google.maps.Geocoder;
          
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    this.getAddress(this.latitude, this.longitude);
                    
                });
            });
        });
    }
    // Get Current Location Coordinates
    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 15;
                this.getAddress(this.latitude, this.longitude);
            });
        }
    }
    markerDragEnd($event: MouseEvent) {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
      }
    
      getAddress(latitude, longitude) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
          console.log(results);
          console.log(status);
          if (status === 'OK') {
            if (results[0]) {
              this.zoom = 12;
              this.address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
    
        });
      }
}
