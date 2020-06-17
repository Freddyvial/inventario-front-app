import { Component, OnInit, ViewChild } from '@angular/core';
import { TracingService } from '../services/TracingService';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'protractor';
import { MedicalService } from '../services/MedicalService';
@Component({
    selector: "app-tracing",
    templateUrl: './tracing.component.html',
    styleUrls: ['./tracing.component.css']
})
export class TracingComponent {
    idEditTracing;
    medical;
    buttonNew=false;
    editTracing = true;
    panelOpenState = false;
    tracings;
    ngOnInit() {
        this.spinner.show();
        this.consultIdMedical();
        
    }
    detailTracing;
    constructor(private medicalService:MedicalService,private tracingService: TracingService, private router: Router, private spinner: NgxSpinnerService) { }

    displayedColumns: string[] = ['id', 'patient', 'state', 'action'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    tracing = {
        id: "",
        date: "",
        medical: {
            documentType: { id: "", value: "" },
            email: "",
            fullName: "",
            id: "",
            numberDocument: "",
            phone: "",
            state: "",
            user: { id: "" }
        },
        patient: {
            answerPatient: { id: "", idPatient: "", result: "" },
            birthDate: "",
            changeDate: "",
            department: { id: "", name: "", code: "" },
            direction: "",
            documentNumber: "",
            documentType: { id: "", value: "" },
            email: "",
            fullName: "",
            id: "",
            phone: "",
            state: { id: "", value: "" },
            town: { id: "", idDepartment: "", name: "" },
            user: { id: "" }
        },
        observation: "",
        state: {
            id: "",
            value: ""
        }
    }
    newDetailTracing(){
        this.buttonNew=true;
    }
    cancel(){
        this.buttonNew=false;
        this.clean();
    }        
    closedEdit(){
       this.displayedColumns = ['id', 'patient', 'state', 'action'];
       this.dataSource = new MatTableDataSource<any>(this.tracings);
        this.editTracing = true;
       
    }
    isTracing(){
        if(this.tracing.state.id=="4"){
            return true;
        }
    }
    saveStateTracing(){
        this.tracingService.createTracing(this.tracing).subscribe(resul=>{
            console.log(resul);
            this.closedEdit();
            this.ngOnInit();
        },error=>{
            console.log("Error::  ",error);

        })
    }
    save(){
        this.createDetailTracing.idTracing=this.tracing.id;
        this.tracingService.sendDetailTracing(this.createDetailTracing).subscribe(resul=>{
            console.log(resul)
            this.clean();
            this.importDetailTracing(this.idEditTracing);
            this.buttonNew=false;
        },error=>{
            console.log("Error::  ",error)
        })
    }
    createDetailTracing = {
        id: "",
        checkObservation: "",
        medication: "",
        evolutionPatient: "",
        idTracing: ""
    }
    isFormInvalid(){
        if(!this.createDetailTracing.checkObservation || !this.createDetailTracing.medication || !this.createDetailTracing.evolutionPatient){
            return true;
        }

    }
    clean(){
        this.createDetailTracing.checkObservation="";
        this.createDetailTracing.evolutionPatient="";
        this.createDetailTracing.medication="";
    }
    edit(element) {
        this.tracing=element;
        if (this.editTracing) {
            this.importDetailTracing(element.id);
            this.displayedColumns = ['checkObservation', 'medication', 'evolutionPatient'];
        }

        this.editTracing = false;


    }
    consultIdMedical(){
    this.medicalService.checkMedical(localStorage.getItem("USERNAME")).subscribe(resul=>{
        this.medical=resul
        this.importTracing(this.medical.id);
       
    },error=>{
        console.log("Error:: ",error)
    })
    }
    importTracing(id) {
        this.tracingService.consultTracing(id).subscribe(resp => {
  
            this.tracings = resp;
            this.dataSource = new MatTableDataSource<any>(this.tracings);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });

    }
    importDetailTracing(id) {
        this.idEditTracing=id;
        this.tracingService.consultDetailTracing(id).subscribe(resp => {
            console.log(resp);
            this.detailTracing = resp;

            this.dataSource = new MatTableDataSource<any>(this.detailTracing);
        }, error => {
            console.log("Error:: ", error)
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}









