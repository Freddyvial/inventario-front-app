import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class PatientsServices{
    private REST_API_SERVER = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {

    }
    public setPatient(body) {

        return this.httpClient.post(`${this.REST_API_SERVER}/patients`, body)
    }

}