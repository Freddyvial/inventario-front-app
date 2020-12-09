import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
@Injectable()
export class ArticleServices{
    private REST_API_SERVER = "http://localhost:8080";
    constructor(private httpClient: HttpClient) {

    }
    public setArticles(body) {

        return this.httpClient.post(`${this.REST_API_SERVER}/articles`, body)
    }
    public consulAllArticles(idCampus){
        
        return this.httpClient.get(`${this.REST_API_SERVER}/articles?idCampus=`+idCampus)
        
    }
    public consulAllTypeArticle(){
        return this.httpClient.get(`${this.REST_API_SERVER}/typeArticle`)
    }
    public changeStateArticle(body){
        return this.httpClient.post(`${this.REST_API_SERVER}/changeStateArticle`,body)
    }
    public changeIdRoomArticle(body){
        return this.httpClient.post(`${this.REST_API_SERVER}/changeIdRoomArticle`,body)
    }
    public consulArticesByRoom(id){
        return this.httpClient.get(`${this.REST_API_SERVER}/articlesByRoom?idRoom=`+id);
    }
    

}
