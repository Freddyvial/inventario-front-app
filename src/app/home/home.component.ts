import { Component } from '@angular/core';
import{AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
  import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  title = 'Home';

  constructor(private router: Router,private loginService: AuthService) { }
  
  isLoggedIn=this.loginService.isLoggedIn();

  logout(){
    console.log('logout');
    this.loginService.logout();
    this.router.navigateByUrl('/login')
  }
}
