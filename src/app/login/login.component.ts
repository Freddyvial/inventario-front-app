import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HomeComponent } from '../home/home.component';
import { RoleService } from '../services/roleservice';
import { error } from 'protractor';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  hide = true;
  roles;
  isPatient;
  isAdmin;
  isMedical;

  durationInSeconds = 3;
  constructor(private roleService: RoleService, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private loginService: AuthService, private router: Router) { }
  isLoggedIn: HomeComponent;
  user = new User();
  options: FormGroup;
  newUser = new User();
  ObjList;
  subMenus = new Array;
  ngOnInit(): void {

    this.consultRole();
  }


  email = new FormControl("", [Validators.required, Validators.email]);


  getErrorMessage() {

    return this.email.hasError('email') ? 'Email incorrecto' : '';
  }



  login() {
    this.spinner.show();

    this.loginService.login(this.user).subscribe(resp => {
      const user = JSON.parse(JSON.stringify(resp));

      if (resp != null) {        
        localStorage.setItem('SESION', 'LOGUEADO');
        localStorage.setItem('USER', user.idUser);
        localStorage.setItem('USERNAME', user.userName);
        localStorage.setItem('ROLE', user.role.idRole);
        if (user) {
          this.router.navigateByUrl('/maestro')
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.openSnackBar('Usuario o Contraseña invalidos', 'Verifica la información');
      }
    }, error => {
      console.error(error);
      this.spinner.hide();
    })

  }
  consultRole() {
    this.spinner.show();
    this.roleService.consultRole().subscribe(resp => {
      console.log(resp);
      this.isAdmin = resp[0];
      this.spinner.hide();
    }, error => {
      console.log('Error:: ', error);
      this.spinner.hide();
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }
}

