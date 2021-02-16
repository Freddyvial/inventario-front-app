import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InventoryMovementService{

    private REST_API_SERVER = "http://inventoryfg.ddns.net:8080/";

  constructor(private httpClient: HttpClient) { }
  public consultInventoryMoviment(idCampus) {
    return this.httpClient.get(`${this.REST_API_SERVER}/report?idCampus=`+idCampus);
  }
  public sendReport(body) {

    return this.httpClient.post(`${this.REST_API_SERVER}/reports`,body)
}


}
