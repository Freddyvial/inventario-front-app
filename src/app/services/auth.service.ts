import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = "http://localhost:9090/";

  constructor(private httpClient: HttpClient) { }
  public login(userInfo: User){  
   return this.httpClient.get(`${this.REST_API_SERVER}/consultUser?userName=`+userInfo.email+'&password='+userInfo.password);
  }


  

  public isLoggedIn(){;
    return sessionStorage.getItem('SESION') !== null;
  }

  public getRole(){
    return sessionStorage.getItem('ROLE');
  }
  public getMenu(){
    
    return sessionStorage.getItem("MENU");
  }


  public logout(){
    sessionStorage.removeItem('SESION');
    sessionStorage.removeItem('ROLE');
    sessionStorage.removeItem('USER');
    sessionStorage.removeItem('USERNAME');    
  }
}
