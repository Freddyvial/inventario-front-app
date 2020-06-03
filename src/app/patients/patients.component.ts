import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsServices } from '../services/PatientsServices';
import { DepartmentService } from '../services/DepartmentService'
import { TownServices } from '../services/TownServices'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AnswerPatientServices } from '../services/AnswerPatientServices';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  startDate = new Date(1990, 0, 1);
  idDepartment;
  options: FormGroup;
  title = 'Patients';
  departments;
  towns;
  //---------------------
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private answerPatientServices: AnswerPatientServices, private router: Router, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private patientsServices: PatientsServices, private departmentService: DepartmentService, private townServices: TownServices) { }
  ngOnInit() {
    this.importDepartment();
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
          this.patient.latitude = this.latitude.toString();
          this.patient.longitude = this.longitude.toString();

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
        this.patient.latitude = this.latitude.toString();
        this.patient.longitude = this.longitude.toString();
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
    this.patient.latitude = this.latitude.toString();
    this.patient.longitude = this.longitude.toString();
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

  email = new FormControl('', [Validators.required, Validators.email]);
  importDepartment() {
    this.spinner.show();
    this.departmentService.getDepartment().subscribe(resp => {
      this.departments = resp;
      this.spinner.hide();
    }, error => {
      console.log('error::', error)
      this.spinner.hide();
    });
  }
  importTownByDepartment(id) {
    this.spinner.show();
    this.townServices.getTownByDepartment(id).subscribe(resp => {
      this.towns = resp;
      this.spinner.hide();
      console.log(this.towns)
    }, error => {
      console.log('error::', error)
      this.spinner.hide();
    });

  }

  getErrorMessage() {

    return this.email.hasError('email') ? 'Email incorrecto' : '';
  }
  patient = {
    id: "",
    documentNumber: "",
    fullName: "",
    direction: "",
    phone: "",
    email: "",
    documentType: {
      id: "",
    },
    town: {
      id: "",

    },
    department: {
      id: "",
    },
    state: {
      id: "",
    },
    birthDate: "",
    result: "",
    latitude: "",
    longitude: ""
  }
  clean() {
    this.router.navigateByUrl('/login');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }
  isFormInvalid() {
    if (!this.patient.documentNumber || !this.patient.documentType.id ||
      !this.patient.fullName || !this.patient.email ||
      !this.patient.direction || !this.patient.phone ||
      !this.patient.state.id || !this.patient.town.id ||
      !this.patient.department.id || !this.patient.birthDate || !this.latitude || !this.longitude) {
      return true;
    }

  }

  createPatient() {
    this.patient.result = localStorage.getItem('RESULT');
    this.spinner.show();
    localStorage.removeItem('RESULT');
    this.patientsServices.setPatient(this.patient).subscribe(resp => {
      this.patient = JSON.parse(JSON.stringify(resp));;
      this.spinner.hide();
      this.clean();
      this.openSnackBar('Guardado con Exito', 'Datos correctos');

    }, error => {
      if (error && error.message && error.message === 'Usuario ya existe') {
        console.info(error); // mostar mensaje en pantalla al usuario
        this.clean();
      } else {
        this.clean();
        console.error(error);
        this.openSnackBar('Error al guardar', 'Verifica la información');
      }
      this.spinner.hide();

    });

  }




}
