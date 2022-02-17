import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private loginService: AuthService) {
   }

  ngOnInit(): void {
      
  }
  isLogged() {
    if (this.loginService.isLoggedIn()) {
     
      return true;
    }
  }

}
