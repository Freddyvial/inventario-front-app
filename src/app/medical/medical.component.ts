import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MedicalService } from '../services/MedicalService';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
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

    constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router, private medicalService: MedicalService, private spinner: NgxSpinnerService) { }
    newPassword = "";
    hide = true;
    hide1 = true;
    userForm = false;
    form = false;
    displayedColumns: string[] = ['fullName', 'phone', 'documentType.id', 'state', 'medical', 'user'];
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
            id: "",
            value: ""
        },
        state: {
            id: "",
            name: ""
        },
        user: {
            id: "",
            passWord: "",
            role: {
                id: "", name: ""
            },
            userName: ""
        }



    }
    editUser(element) {
        this.medical = element;
        this.userForm = true;
        this.form = true;
    }
    isAdmin() {
        if (localStorage.getItem("ROLE") == "3") {
            return true;
        }
    }
    cancel() {
        this.userForm = false;
        this.form = false;
        this.clean();
        this.ngOnInit();
    }
    isPasswordInvalid() {
        if (!this.medical.user.passWord || !this.newPassword || this.medical.user.passWord.length <= 5 || this.newPassword.length <= 5) {
            return true;
        }

    }
    savePassword() {
        if (this.medical.user.passWord != this.newPassword) {
            return this.openSnackBar('Contraseñas NO COINCIDEN', 'VERIFICAR DATOS');
        }else{
            this.updatePassword();
        }

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
        this.medical.state.name = "";
        this.medical.user.userName = "";
        this.newPassword="";
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    updatePassword() {
        this.spinner.show();
        this.authService.upDatePassword(this.medical.user).subscribe(resp => {
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
                    this.cancel();

                }, error => {

                    if (error && error.message && error.message === 'Usuario ya existe') {
                        console.info(error); // mostar mensaje en pantalla al usuario
                        this.medical.email = "";
                        this.ngOnInit();
                    } else {
                        this.medical.email = "";
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

