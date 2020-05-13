import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsServices } from '../services/PatientsServices';
import { DepartmentService } from '../services/DepartmentService'
import { TownServices } from '../services/TownServices'
import { NgxSpinnerService } from "ngx-spinner";
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

  constructor(private spinner: NgxSpinnerService, private patientsServices: PatientsServices, private departmentService: DepartmentService, private townServices: TownServices) { }
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    this.importDepartment();
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  importDepartment() {
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

  createPatient() {
    this.spinner.show();
    this.patientsServices.setPatient(this.patient).subscribe(resp => {
      this.spinner.hide();
    }, error => {
      if (error && error.message && error.message === 'Usuario ya existe') {
        console.info(error); // mostar mensaje en pantalla al usuario
      } else {
        console.error(error);
      }
      this.spinner.hide();

    });

  }




}
