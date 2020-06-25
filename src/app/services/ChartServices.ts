import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ChartServices {

  private REST_API_SERVER = "http://localhost:8080";
  //   private REST_API_SERVER = "../assets";
  constructor(private httpClient: HttpClient) { 
      
  }

  public consultResultByDepartment() {
    return this.httpClient.get(`${this.REST_API_SERVER}/resultByDepartment`);
  }
  public consultResultByState() {
    return this.httpClient.get(`${this.REST_API_SERVER}/resultByState`);
  }
  public consultResultByDepartmentByState() {
    return this.httpClient.get(`${this.REST_API_SERVER}/resultByDepartmentByState`);
  }
  public consultResultByBirthDate() {
    return this.httpClient.get(`${this.REST_API_SERVER}/resultByBirthDate`);
  }
}
