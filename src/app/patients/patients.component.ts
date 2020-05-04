import { Component } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  
  title = 'Patients';
  patient = {
    documentNumber: "",
    fullName: "",
    direction: "",
    phone: "",
    email: "",
    documentType: {
      id: "0",
    },
    town: {
      id: "",
      department_id: "",
    },
    state: {
      id: "",
    }
  

    
  }

}
