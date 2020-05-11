import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TownServices {


    private REST_API_SERVER = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {

    }
    public getTownByDepartment(id){
        return this.httpClient.get(`${this.REST_API_SERVER}/townByDepartment?id=`+id);
    }
}