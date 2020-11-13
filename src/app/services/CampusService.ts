import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CampusService{

    private REST_API_SERVER = "http://localhost:8090";

  constructor(private httpClient: HttpClient) { 
      
  }
  public consultCampus() {
    return this.httpClient.get(`${this.REST_API_SERVER}/campus`);
  }
}