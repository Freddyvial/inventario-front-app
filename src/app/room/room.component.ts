import { Component, ViewChild, ɵConsole } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { from } from 'rxjs';
import { RoomServices } from '../services/RoomServices'
import { ArticleServices } from '../services/ArticleServices';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  newArticle=false;
  articleSelec=false;
  edit=false;
  url: any;
  users;
  rooms;
  articles;
  articles1;
  articlesInRoom = new Array;
  displayedColumns: string[] = ['name', 'serial', 'state', "article"];
  displayedColumnsRoom: string[] = ['name', 'responsible', "edit"];
  dataSource: MatTableDataSource<any>;
  dataSourceRooms: MatTableDataSource<any>;
  constructor(private userService:AuthService, private articleServices: ArticleServices, private roomServices: RoomServices, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) { };
  ngOnInit() {
    this.nameCampus=localStorage.getItem('NAMECAMPUS');
    this.room.campus.idCampus=localStorage.getItem("IDCAMPUS");
    this.importArticles();
    this.consulAllRooms(this.room.campus.idCampus);
    this.importUserByCampus(localStorage.getItem("IDCAMPUS"));
    this.logo=localStorage.getItem("LOGO");
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  nameCampus;
  logo;
  pothoOk=false;
  room = {
    idRoom: "",
    name: "",
    user: {idUser:"",userName:""},
    photo: Uint8Array,
    campus:{idCampus:""}
  }
  article = {
    id: "",
    name: "",
    photo: Uint8Array,
    serial: "",
    state: { id: "", name: "" },
    typeArticle: { idTypeArticle: "", name: "" },
    room:{idRoom:""},
    campus:{idCampus:""}
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.room.photo = this.url.split(",")[1];
        this.pothoOk=true;
      }
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  isFormInvalid() {
    if (!this.room.name || !this.pothoOk || !this.room.user|| this.articlesInRoom.length==0 ) {
      return true;
    }
  }
  createRoom() {
    this.spinner.show();
    this.roomServices.setRoom(this.room).subscribe(resp => {
      if (resp == null) {
        this.openSnackBar('Error de nombre', 'nombre NO existe');
        this.spinner.hide();
        this.room.name = "";
      } else {
        this.room = JSON.parse(JSON.stringify(resp));
        this.assignArticlesToRoom(this.room.idRoom);
        this.spinner.hide();
        this.clean();
        this.openSnackBar('Guardado con Exito', 'Datos correctos');
        this.edit=false;   
        this.newArticle=false; 
        this.ngOnInit();
            

      }
    }, error => {
      if (error && error.message && error.message === 'Nombre ya existe') {
        console.info(error); // mostar mensaje en pantalla al usuario
        this.clean();
      } else {
        this.clean();
        console.error(error);
        this.openSnackBar('Error al guardar', 'Verifica la información');
      }
      this.spinner.hide();
    });
  }
  assignArticlesToRoom(idRoom) {
    this.spinner.show();
    for (let index = 0; index < this.articlesInRoom.length; index++) {
      const element = this.articlesInRoom[index];
      element.room.idRoom = idRoom;
      this.articleServices.changeIdRoomArticle(element).subscribe(resp => {
      }, error => {
        console.log("Error:: ", error);
        this.spinner.hide();
      });

    }
    this.importArticles();
    this.spinner.hide();
  }
  clean() {
    this.room.idRoom = "";
    this.room.name = "";
    this.room.photo = null;
    this.room.user.idUser = "";
    this.url = null;
    this.articles1=null;
    this.articles=null;
    this.articlesInRoom = new Array;
    this.dataSource = new MatTableDataSource<any>(this.articlesInRoom);
    this.dataSource.paginator = this.paginator;

  }
  getUserSelect(user){
    this.room.user=user;
  }
  importArticles() {
    this.spinner.show();
    this.articleServices.consulAllArticles(localStorage.getItem("IDCAMPUS")).subscribe(resp => {
      this.articles = resp;
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }
  importUserByCampus(idCampus) {
    this.spinner.show();
    console.log(idCampus)
    this.userService.consultUserByCampus(idCampus).subscribe(resp => {
      console.log(resp)
      this.users = resp;
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }
  editRoom(element) {
    this.room=element;
    console.log(this.room)
    this.consulArticlesByRoom(this.room);
    this.url = ["data:image/jpeg;base64", this.room.photo].join(',');
    this.edit = true;
    this.pothoOk=true;
  }
  consulArticlesByRoom(room){
    this.spinner.show();
    console.log(room.idRoom);
    this.articleServices.consulArticesByRoom(room.idRoom).subscribe(resp => {
      console.log(resp)
     this.articles1=resp;
     this.articlesInRoom=this.articles1;
      this.dataSource = new MatTableDataSource<any>(this.articles1);
      this.dataSource.paginator = this.paginator;
  
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }

  getArticleSelect(article) {
    this.article = article;
    this.articleSelec=true;

  }
  chargeRoom() {
    this.article.state.id = "1";
    this.article.state.name = "En uso";
    this.changeStateArticle();
    this.articlesInRoom.push(this.article);
    this.dataSource = new MatTableDataSource<any>(this.articlesInRoom);
    this.dataSource.paginator = this.paginator;
    this.articleSelec=false;
  }
  changeStateArticle() {
    this.spinner.show();
    this.articleServices.changeStateArticle(this.article).subscribe(resp => {
      this.importArticles();
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);

    });
  }
  removeArticleRoom(article) {
    this.article = article;
    this.article.state.id = "3";
    this.article.state.name = "Bueno"; 
    this.removeIdRoom();
    this.changeStateArticle();
    for (let index1 = 0; index1 < this.articlesInRoom.length; index1++) {
      if (article.id == this.articlesInRoom[index1].id) {
        this.articlesInRoom.splice(index1, 1);
        console.log("Eliminando de la lista");
      }
    }
    this.article.room.idRoom=null;
    this.dataSource = new MatTableDataSource<any>(this.articlesInRoom);
    this.dataSource.paginator = this.paginator;
  }
  private removeIdRoom() {
    this.article.room.idRoom="0";
    this.articleServices.changeIdRoomArticle(this.article).subscribe(resp => {
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }

  consulAllRooms(idCampus) {
    this.spinner.show();
    this.roomServices.consulAllRooms(idCampus).subscribe(resp => {
      this.rooms = resp;
      console.log(resp)
      this.dataSourceRooms = new MatTableDataSource<any>(this.rooms);
      this.dataSourceRooms.paginator = this.paginator;
      this.spinner.hide();
    }, error => {
      console.log("Error:: ", error);
      this.spinner.hide();
    });
  }
  new(){
    this.clean();
    this.ngOnInit();
    this.newArticle=true;
  }
  cancel(){
    if(this.newArticle){
      for (let index = 0; index < this.articlesInRoom.length; index++) {
        this.removeArticleRoom(this.articlesInRoom[index]);
        index--;    
      }
    }
    this.ngOnInit();
    this.edit=false;
    this.newArticle=false;
  }
 

}