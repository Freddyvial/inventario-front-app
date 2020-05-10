import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsServices } from '../services/PatientsServices';
import {DepartmentService} from '../services/DepartmentService'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  
  options: FormGroup;
  title = 'Patients';
  departments;

  constructor(private patientsServices:PatientsServices, private departmentService:DepartmentService){}
  ngOnInit(){
    this.importDepartment();
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);
  importDepartment() {
    this.departmentService.getDepartment().subscribe(resp => {
      this.departments = resp;  
      console.log(this.departments) ;
    }, error => {
      console.log('error::', error)
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
  
  createPatient(){   
    console.log(this.patient)
    this.patientsServices.setPatient(this.patient).subscribe(resp => {
 
    }, error => {
      console.error(error);

    });

  }




}
