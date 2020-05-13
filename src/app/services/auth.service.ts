import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public login(userInfo: User){
   return new Observable();
  }

  public isLoggedIn(){
    return localStorage.getItem('SESSION') !== null;
  }

  public logout(){
    localStorage.removeItem('SESSION');
    // redirect Login
  }
}
