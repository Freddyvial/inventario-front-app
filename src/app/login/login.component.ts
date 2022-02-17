import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
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

  userForm: FormGroup;
  durationInSeconds = 3;
  constructor(private roleService: RoleService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private loginService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],

    });
  }
  user = new User();
  options: FormGroup;
  ngOnInit(): void {

    this.consultRole();
  }



  login() {
    this.spinner.show();
    Object.assign(this.user, this.userForm.value);
    this.loginService.login(this.user).subscribe(resp => {
      const user = JSON.parse(JSON.stringify(resp));

      if (resp != null) {
        sessionStorage.setItem('SESION', 'LOGUEADO');
        sessionStorage.setItem('USER', user.idUser);
        sessionStorage.setItem('USERNAME', user.userName);
        sessionStorage.setItem('ROLE', user.role.idRole);
        if (user) {
          console.log('LOGEADO:::')
          this.router.navigateByUrl('/pageBlank')
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

