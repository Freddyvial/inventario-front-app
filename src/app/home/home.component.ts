import { Component } from '@angular/core';
import{AuthService} from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';

import { Router } from '@angular/router';
  import { from } from 'rxjs';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  idRole;
  title = 'Home';

  constructor(public dialog: MatDialog,private router: Router,private loginService: AuthService) { }
  isLogged(){
    if(this.loginService.isLoggedIn()){
      return true;
    }
    }
    isMedical(){
      if(localStorage.getItem("ROLE")!="2")
      return true;
    }
    isPatient(){
      if(localStorage.getItem("ROLE")!="1")
      return true;
    }
    isAdmin(){
      if(localStorage.getItem("ROLE")!="3")
      return true;
    }
    openDialog() {
      const dialogRef = this.dialog.open(LoginComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
  logout(){
    console.log('logout');
    this.loginService.logout();
    this.router.navigateByUrl('/login')

  }

}
