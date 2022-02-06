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
export class MaestroService{

    private REST_API_SERVER = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { 
      
  }
  public consultMaestro() {
    return this.httpClient.get(`${this.REST_API_SERVER}/maestro`);
  }
}