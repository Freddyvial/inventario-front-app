import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TracingService{

    private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { 
      
  }
  public consultTracing(id) {
    return this.httpClient.get(`${this.REST_API_SERVER}/tracing?id=`+id);
  }
  public consultDetailTracing(id){
    return this.httpClient.get(`${this.REST_API_SERVER}/detailTracing?id=`+id);
  }
  public sendTracing(body) {
    return this.httpClient.post(`${this.REST_API_SERVER}/createDetailTracing`, body)
}
}