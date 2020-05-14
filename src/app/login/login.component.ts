import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private loginService: AuthService,private router: Router) { }

  user = new User();
  options: FormGroup;
  ngOnInit(): void {
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);
  
  getErrorMessage() {

    return this.email.hasError('email') ? 'Email incorrecto' : '';
  }
  
  login() {   
     
    this.loginService.login(this.user).subscribe(resp => {
      if (resp != null) {
        console.log(resp)
        localStorage.setItem('SESSION','LOGUEADO');
        this.router.navigateByUrl('/patients')
      } else {
        console.log('Usuario o contraseña incorrecta')
      }
    }, error => {
      console.error(error);
    })

  }
}
