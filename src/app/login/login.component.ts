import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: AuthService) { }

  user: User;

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.user).subscribe(resp => {
      if (resp != null) {
        localStorage.setItem('SESSION', 'LOGUEADO');
      } else {
        console.log('Usuario o contraseña incorrecta')
      }
    }, error => {
      console.error(error);
    })

  }
}
