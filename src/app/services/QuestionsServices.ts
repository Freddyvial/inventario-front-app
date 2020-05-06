import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionsServices {

  private REST_API_SERVER = "http://localhost:8080";
  //   private REST_API_SERVER = "../assets";
  constructor(private httpClient: HttpClient) { 
      
  }

  public getQuestions() {
    return this.httpClient.get(`${this.REST_API_SERVER}/questions`);
  }
}