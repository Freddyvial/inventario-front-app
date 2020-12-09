import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class MenuServices{
    private REST_API_SERVER = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {

    }

    public consultMenu(idRole){
        return this.httpClient.get(`${this.REST_API_SERVER}/consultMenus?idRole=`+idRole)
    }
    

}