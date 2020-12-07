import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReportService{

    private REST_API_SERVER = "http://localhost:8090";

  constructor(private httpClient: HttpClient) { 
      
  }
  public consultReport(idCampus) {
    return this.httpClient.get(`${this.REST_API_SERVER}/report?idCampus=`+idCampus);
  }
  public sendReport(body) {

    return this.httpClient.post(`${this.REST_API_SERVER}/reports`,body)
}
public consulAriclesReport(idReport) {
  return this.httpClient.get(`${this.REST_API_SERVER}/articlesReported?idReport=`+idReport);
}
public sendArticlesReported(body) {

  return this.httpClient.post(`${this.REST_API_SERVER}/articlesReported`,body)
}
public consulMonitorModel(idMonitor) {
  return this.httpClient.get(`${this.REST_API_SERVER}/monitorModel?idMonitor=`+idMonitor);
}
public sendMonitorModel(body) {

  return this.httpClient.post(`${this.REST_API_SERVER}/monitorModel`,body)
}


}