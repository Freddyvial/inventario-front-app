import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MedicalService{

    private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { 
      
  }
  public getMedical() {
    return this.httpClient.get(`${this.REST_API_SERVER}/medical`);
  }
  public sendMedical(body) {

    return this.httpClient.post(`${this.REST_API_SERVER}/medical`, body)
}
}