import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MedicalService } from '../services/MedicalService';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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

    constructor(private _snackBar: MatSnackBar, private router: Router, private medicalService: MedicalService, private spinner: NgxSpinnerService) { }
    form = false;
    displayedColumns: string[] = ['id', 'numberDocument', 'fullName', 'email', 'phone', 'documentType.id', 'state', 'action'];
    medicals: any;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    medical = {
        id: "",
        numberDocument: "",
        fullName: "",
        email: "",
        phone: "",
        documentType: {
            id: ""
        },
        state: ""

    }
    cancel() {
        this.form = false;
        this.clean();
        this.ngOnInit();
    }
    new() {
        this.form = true;
    }
    isFormInvalid() {
        if (!this.medical.documentType.id || !this.medical.email || !this.medical.fullName ||
            !this.medical.numberDocument || !this.medical.phone || !this.medical.state) {
            return true;
        }

    }
    edit(element) {
        this.medical = element;
        this.form = true;
    }
    clean() {
        this.medical.id = "";
        this.medical.documentType.id = "";
        this.medical.email = "";
        this.medical.fullName = "";
        this.medical.numberDocument = "";
        this.medical.phone = "";
        this.medical.state = ""
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    save() {
        if (this.isNumberInvalid) {
            if (this.medical.phone.toString().length >= 11) {
                this.openSnackBar('phone Invalido', '1-10 Dígitos');
                this.medical.phone = "";
                if (this.medical.numberDocument.toString().length >= 11) {
                    this.openSnackBar('Numero Documento Invalido', '1-10 Dígitos');
                    this.medical.numberDocument = "";
                }
            } else {
                this.spinner.show();
                this.medicalService.sendMedical(this.medical).subscribe(resp => {
                    console.log(resp)
                    this.spinner.hide();
                    this.clean();
                    this.form = false;
                    this.ngOnInit();

                }, error => {

                    if (error && error.message && error.message === 'Usuario ya existe') {
                        console.info(error); // mostar mensaje en pantalla al usuario
                        this.medical.email="";
                        this.ngOnInit();
                      } else {
                        this.medical.email="";
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
        if (this.medical.numberDocument.toString().length >= 11 || this.medical.phone.toString().length >= 11) {
            return true;
        } else {
            return false;
        }

    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
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

