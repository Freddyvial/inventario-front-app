import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = "http://localhost:8090";

  constructor(private httpClient: HttpClient) { }
  public login(userInfo: User){
  
   return this.httpClient.get(`${this.REST_API_SERVER}/consultUser?userName=`+userInfo.email+'&password='+userInfo.password);
  }
  public upDatePassword(body) {
    return this.httpClient.post(`${this.REST_API_SERVER}/upDatePassword`, body)
  }
  

  public isLoggedIn(){;
    return localStorage.getItem('SESION') !== null;
  }

  public getRole(){
    return localStorage.getItem('ROLE');
  }


  public logout(){
    localStorage.removeItem('SESION');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('USER');
    localStorage.removeItem('RESULT')
    localStorage.removeItem('USERNAME')
    // redirect Login
  }
}
