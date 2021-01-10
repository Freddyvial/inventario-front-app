import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class RoomServices{
    private REST_API_SERVER = "http://inventoryfg.ddns.net:8080/";

    constructor(private httpClient: HttpClient) {

    }
    public setRoom(body) {

        return this.httpClient.post(`${this.REST_API_SERVER}/rooms`, body)
    }
    public consulAllRooms(idCampus){
        return this.httpClient.get(`${this.REST_API_SERVER}/rooms?idCampus=`+idCampus)
    }
    public consulRoomsByUser(idUser){
        return this.httpClient.get(`${this.REST_API_SERVER}/roomByUser?idUser=`+idUser)
    }

    

}