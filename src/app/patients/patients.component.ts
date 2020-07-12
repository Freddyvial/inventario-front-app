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
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  adminEdit=false;
  newPassword = "";
  hide = true;
  hide1 = true;
  userForm = false;
  form = false;
  displayedColumns: string[] = ['fullName', 'phone', 'documentType.id', 'state', 'patient', 'user'];
  patients: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  startDate = new Date(1990, 0, 1);
  idDepartment;
  options: FormGroup;
  title = 'Patients';
  departments;
  towns;
  admin;
  //---------------------
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private authService: AuthService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private answerPatientServices: AnswerPatientServices, private router: Router, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private patientsServices: PatientsServices, private departmentService: DepartmentService, private townServices: TownServices) { }
  ngOnInit() {
    if(localStorage.getItem("ROLE")=="3"){
      this.consulAllPatients();
    }
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
  isAdmin(){
    if(localStorage.getItem("ROLE")=="3"){
      this.admin=true;
      return true;
    }
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
      id: "4",
      name:"",
    },
    birthDate: "",
    result: "",
    latitude: "",
    longitude: "",
    user:{
      id: "",
      passWord: "",
      role: {id: "", name: ""},
      userName: "@a"
    }




  }
  clean() {
    if(this.admin){
      this.clean1();
      this.cancel();
    }else{ this.router.navigateByUrl('/login');}
   
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
  consulAllPatients(){
    this.spinner.show();
    this.patientsServices.consulAllPatients().subscribe(resp=>{
      console.log(resp);
      this.patients = resp;
      this.dataSource = new MatTableDataSource<any>(this.patients);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide;
    },error=>{
      console.log("Error:: ",error);
    });
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
  editUser(element) {
    this.patient = element;
    this.userForm = true;
    this.form = true;
}

cancel() {
    this.userForm = false;
    this.form = false;
    this.clean1();
    this.ngOnInit();
    this.adminEdit=false;
}
isPasswordInvalid() {
    if (!this.patient.user.passWord || !this.newPassword || this.patient.user.passWord.length <= 5 || this.newPassword.length <= 5) {
        return true;
    }

}
savePassword() {
    if (this.patient.user.passWord != this.newPassword) {
        return this.openSnackBar('Contraseñas NO COINCIDEN', 'VERIFICAR DATOS');
    }else{
        this.updatePassword();
    }

}
new() {
    this.form = true;
}
isFormInvalid1() {
    if (!this.patient.documentType.id || !this.patient.email || !this.patient.fullName ||
        !this.patient.documentNumber || !this.patient.phone || !this.patient.state) {
        return true;
    }

}
edit(element) {
    this.patient = element;
    this.adminEdit=true;
}
clean1() {
    this.patient.id = "";
    this.patient.documentType.id = "";
    this.patient.email = "";
    this.patient.fullName = "";
    this.patient.documentNumber = "";
    this.patient.phone = "";
    this.patient.state.name = "";
    this.patient.user.userName = "";
    this.newPassword="";
}
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
updatePassword() {
    this.spinner.show();
    this.authService.upDatePassword(this.patient.user).subscribe(resp => {
        this.openSnackBar('Actualizado', 'Correcto');
        this.spinner.hide();
        this.cancel();
    }, error => {
        console.log("Error:: ", error)
        this.spinner.hide();
    });
}
save() {
    if (this.isNumberInvalid) {
        if (this.patient.phone.toString().length >= 11) {
            this.openSnackBar('phone Invalido', '1-10 Dígitos');
            this.patient.phone = "";
            if (this.patient.documentNumber.toString().length >= 11) {
                this.openSnackBar('Numero Documento Invalido', '1-10 Dígitos');
                this.patient.documentNumber = "";
            }
        } else {
            this.spinner.show();
            this.patientsServices.setPatient(this.patient).subscribe(resp => {
                console.log(resp)
                this.spinner.hide();
                this.clean1();
                this.form = false;
                this.ngOnInit();
                this.cancel();

            }, error => {

                if (error && error.message && error.message === 'Usuario ya existe') {
                    console.info(error); // mostar mensaje en pantalla al usuario
                    this.patient.email = "";
                    this.ngOnInit();
                } else {
                    this.patient.email = "";
                    console.error(error);
                    this.openSnackBar('Error al guardar', 'Verifica la información');
                    this.ngOnInit();
                }
                this.spinner.hide();


            });
        }
    }


}
isNumberInvalid() {
    if (this.patient.documentNumber.toString().length >= 11 || this.patient.phone.toString().length >= 11) {
        return true;
    } else {
        return false;
    }

}


}
