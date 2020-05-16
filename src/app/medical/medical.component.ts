import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MedicalService } from '../services/MedicalService';
import { NgxSpinnerService } from "ngx-spinner";
import { from } from 'rxjs';
@Component({
    selector: "app-medical",
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.css']
})
export class MedicalComponent {

    constructor(private medicalService: MedicalService, private spinner: NgxSpinnerService) { }

    displayedColumns: string[] = ['id', 'numberDocument', 'fullName', 'email', 'phone','documentType.id', 'action'];
    medicals: any;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    medical: any;

    ngOnInit() {
        this.spinner.show();
        this.importMedical();
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

