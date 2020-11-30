import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  idRole;
  subMenus = new Array;
  title = 'Home';
  objectKeys = Object.keys;
  constructor(public dialog: MatDialog, private router: Router, private loginService: AuthService) { }
  
  my_menu = {
    'OPCION': [],
  };
  isLogged() {
    if (this.loginService.isLoggedIn()) {
     
      return true;
    }
  }
  campusSelec(){
    if (localStorage.getItem("IDCAMPUS")) {
      this.getMenu();
      return true;
    }
  }

  isAdmin() {
    if (localStorage.getItem("ROLE") != "3")
      return true;
  }
  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getMenu() {
    this.subMenus=new Array;
    const menu = JSON.parse(localStorage.getItem("MENU"));
    for (let index = 0; index < menu.length; index++) {
      this.subMenus[index] = menu[index].nameSubmenu;
    }
    this.my_menu.OPCION = this.subMenus;
  }


  logout() {
    console.log('logout');
    this.loginService.logout();
    this.router.navigateByUrl('/login')

  }

  routerLink(subItem) {
    const menu = JSON.parse(localStorage.getItem("MENU"));
    for (let index = 0; index < menu.length; index++) {
      if (subItem == menu[index].nameSubmenu) {
        return menu[index].link
      }

    }
  }

}
