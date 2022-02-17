import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};
@Injectable({providedIn: 'root'})
export class UsuarioService{

    private REST_API_SERVER = "http://localhost:9090/";

  constructor(private httpClient: HttpClient) { 
      
  }
  public consultUsuarios() {
    return this.httpClient.get(`${this.REST_API_SERVER}/consultUsers`);
  }
  public upDatePassword(body) {
    return this.httpClient.post(`${this.REST_API_SERVER}/upDatePassword`, body)
  }
   public createUser(body,idRole) {
    return this.httpClient.post(`${this.REST_API_SERVER}/createUser?idRole=`+idRole, body)
  }
}