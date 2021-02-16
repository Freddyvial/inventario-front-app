import { Component, ViewChild, ɵConsole } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { NgxSpinnerService } from "ngx-spinner";
import { RoomServices } from '../services/RoomServices'
import { ArticleServices } from '../services/ArticleServices';
import { error } from 'protractor';
@Component({
  selector: 'app-inventoryMovement',
  templateUrl: './inventoryMovement.component.html',
  styleUrls: ['./inventoryMovement.component.css']
})
export class InventoryMovement {
  constructor(private articleServices: ArticleServices, private spinner: NgxSpinnerService, private roomServices: RoomServices) { };
  ngOnInit() {
    this.consulAllRooms(localStorage.getItem("IDCAMPUS"));
  }
  rooms;
  room;
  articlesReported;
  articles;
  articlesForChange=new Array;

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.articlesReported = options.map(o => o.value);
    console.log(this.articlesReported);
  
  }
  editRoom(element) {
    this.typesOfShoes = []
    this.room = element;
    this.consulArticlesByRoom(this.room);

  }
  consulArticlesByRoom(room) {
    this.spinner.show();
    this.articleServices.consulArticesByRoom(room.idRoom).subscribe(resp => {
      this.articles = resp;
     
      for (let index = 0; index < this.articles.length; index++) {
        this.typesOfShoes.push(this.articles[index].name+"::"+this.articles[index].serial);

      }
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }
  typesOfShoes: string[] = [];
  consulAllRooms(idCampus) {
    this.spinner.show();
    this.roomServices.consulAllRooms(idCampus).subscribe(resp => {
      this.rooms = resp;
      
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }
  checkArticles(articlesReported) {
  
    for(let i=0;i<articlesReported.length;i++){
      articlesReported[i]=articlesReported[i].split("::")[1];
    }

    for (let index = 0; index < this.articlesReported.length; index++) {
      for (let index2 = 0; index2 < this.articles.length; index2++) {
        if (articlesReported[index] == this.articles[index2].serial) {
       this.articlesForChange.push(this.articles[index2]);       
        }
      }
    }

    console.log(this.articlesForChange);
    this.articleServices.consulArticlesDisp(this.articlesForChange,localStorage.getItem("IDCAMPUS")).subscribe(resp =>{
      console.log(resp);
    },error=>{
      console.log(error);
    });
  }
}