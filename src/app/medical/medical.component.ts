import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MedicalService } from '../services/MedicalService';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { from } from 'rxjs';
@Component({
    selector: "app-medical",
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.css']
})
export class MedicalComponent {
    ngOnInit() {
        this.spinner.show();
        this.importMedical();
    }

    constructor(private router: Router,private medicalService: MedicalService, private spinner: NgxSpinnerService) { }
    form=false;
    displayedColumns: string[] = ['id', 'numberDocument', 'fullName', 'email', 'phone','documentType.id','state', 'action'];
    medicals: any;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    medical={
        id: "",
        numberDocument: "",
        fullName:"",
        email:"",
        phone: "",
        documentType:{
            id:""
        },
        state:""

    }
    cancel(){
        this.form=false;
        this.clean();
        this.ngOnInit();
    }
    new(){
        this.form=true;
    }
    isFormInvalid() {
        if (!this.medical.documentType.id || !this.medical.email || !this.medical.fullName || 
             !this.medical.numberDocument|| !this.medical.phone || !this.medical.state) {
          return true;
        }
       
      }
    edit(element){      
        this.medical=element;  
        this.form=true;
    }
    clean(){
        this.medical.id="";
        this.medical.documentType.id="";
        this.medical.email="";
        this.medical.fullName="";
        this.medical.numberDocument="";
        this.medical.phone="";
        this.medical.state=""
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    save(){
        this.spinner.show();
        this.medicalService.sendMedical(this.medical).subscribe(resp=>{
            console.log(resp)
            this.spinner.hide();           
            this.clean();
            this.form=false;
            this.ngOnInit();
            
        },error=>{
            console.log("error:: ", error)
            this.spinner.hide();
            this.clean();
            this.form=false;
            this.ngOnInit();
        });
    }





    importMedical() {
        this.medicalService.getMedical().subscribe(resp => {
            console.log(resp);
            this.medicals = resp;
            this.dataSource = new MatTableDataSource<any>(this.medicals);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });

    }
}

