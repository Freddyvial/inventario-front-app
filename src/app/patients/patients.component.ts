import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsServices } from '../services/PatientsServices';
import { DepartmentService } from '../services/DepartmentService'
import { TownServices } from '../services/TownServices'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  idDepartment;
  options: FormGroup;
  title = 'Patients';
  departments;
  towns;
  
  constructor(private router: Router,private _snackBar: MatSnackBar,private spinner: NgxSpinnerService, private patientsServices: PatientsServices, private departmentService: DepartmentService, private townServices: TownServices) { }
  ngOnInit() { 
       this.importDepartment();
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
    birthDate: ""
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
      !this.patient.department.id || !this.patient.birthDate) {
      return true;
    }
   
  }

  createPatient() {
    this.spinner.show();
    this.patientsServices.setPatient(this.patient).subscribe(resp => {
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
