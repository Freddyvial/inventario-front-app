import { Component, EventEmitter, OnInit,Output,ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service'
import { RoleService } from '../services/roleservice';
import { MatListOption } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { User } from '../user';
import { error } from 'protractor';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    constructor(private roleService: RoleService, private authService: AuthService, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) { }
    ngOnInit(): void {
        this.consulUserByCampus(localStorage.getItem("CAMPUSUSER"));
        this.consultRole();
        this.user.campus.idCampus = localStorage.getItem("CAMPUSUSER").toString();
        this.creatorRole = localStorage.getItem("ROLE");
        if (this.creatorRole != 1) {
            this.user.idUser = localStorage.getItem("USER");
        }
        console.log(this.user)
    }
    displayedColumns: string[] = ['userName','changePassword'];
    @Output() 
dateChange:EventEmitter< MatDatepickerInputEvent< any>>;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    email = new FormControl("", [Validators.required, Validators.email]);
    hide = true;
    hide1 = true;
    newPassword = "";
    roles;
    changePassword=false;
    new=false;
    date = new FormControl(new Date());
    edit=false;
    users;
    idCampus;
    creatorRole;
    consultRole() {
        this.spinner.show();
        this.roleService.consultRole().subscribe(resp => {
            this.roles = resp;
            this.roles.splice(0, 2);
            console.log(this.roles);
            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });

    }
    newUser(){
        this.new=true;
    }
    isAdmin(){
        if(localStorage.getItem("ROLE").toString()=="2" || localStorage.getItem("ROLE").toString()=="1"){
            return true;
        }
    }
    editUser(element){
        this.user=element;
        this.edit=true;
        this.changePassword=true;
        
    }
    cancel(){
        this.new=false;
        this.edit=false;
        this.changePassword=false;
        this.clean();
        this.ngOnInit();
        
       }
       clean(){
           this.user.password="";
           this.user.idUser="";
           this.newPassword="";
           this.user.userName="";

       }
    user = {
        idUser: "",
        userName: "",
        password: "",
        role: { idRole: "" },
        campus: { idCampus: "" }
    }
    getErrorMessage() {

        return this.email.hasError('email') ? 'Email incorrecto' : '';
    }
    //Tienes mucho que hacer... Que tengas lindo día. Quierete mucho Att:Yisus :)
    isFormInvalid() {
        if (!this.user.password || !this.newPassword || this.user.password.length <= 5 || this.newPassword.length <= 5 || !this.user.userName || !this.user.role.idRole || !this.user.campus.idCampus) {
            return true;
        }

    }
    getRole(element) {
        this.user.role.idRole = element.idRole;
        console.log(this.user);
        console.log(this.creatorRole)
    }
    checkPassword() {
        if (this.user.password != this.newPassword) {
            this.openSnackBar('Contraseñas NO COINCIDEN', 'VERIFICAR DATOS')
            this.user.password = "";
            this.newPassword = "";
            return false ;
        }else{return true}
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });

    }
    isFormPasswordInvalid(){
        if(!this.user.password || !this.newPassword || this.user.password.length <= 5 || this.newPassword.length <= 5){
            return true;
        }
    }
    updatePassword() {
        if(this.checkPassword()){
            this.spinner.show();
            this.authService.upDatePassword(this.user).subscribe(resp => {
                this.openSnackBar('Actualizado', 'Correcto');
                this.cancel();
                this.consulUserByCampus(localStorage.getItem("CAMPUSUSER"));
                this.spinner.hide();
            }, error => {
                console.log("Error:: ", error)
                this.spinner.hide();
            });
        }
        

    }
    save() {
      
        if(this.checkPassword()){
            this.spinner.show();
            this.authService.createUser(this.user, this.creatorRole).subscribe(resp => {
                console.log(resp);
                this.spinner.hide();
            }, error => {
                console.log(error);
                this.spinner.hide();
            });
        }
        
     
    }
    consulUserByCampus(idCampus){
        this.spinner.show();
        this.authService.consultUserByCampus(idCampus).subscribe(resp=>{
            this.users=resp;
            this.users.splice(0,1);
            this.dataSource = new MatTableDataSource<any>( this.users);
                    this.dataSource.paginator = this.paginator;
            console.log(this.users)
            this.spinner.hide();
        },error=>{
            console.log(error);
            this.spinner.hide();
        });
    }


}