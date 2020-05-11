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
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.importDepartment();
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  importDepartment() {
    this.departmentService.getDepartment().subscribe(resp => {
      this.departments = resp;
    }, error => {
      console.log('error::', error)
    });

  }
  importTownByDepartment(id) {
    this.spinner.show();
    this.townServices.getTownByDepartment(id).subscribe(resp => {
      this.towns = resp;
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
    }, error => {
      console.log('error::', error)
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
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
    console.log(this.patient)
    this.patientsServices.setPatient(this.patient).subscribe(resp => {

    }, error => {
      console.error(error);

    });

  }




}
