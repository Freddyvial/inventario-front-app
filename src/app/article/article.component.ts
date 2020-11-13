import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { type } from 'os';
import { NgxSpinnerService } from "ngx-spinner";
import { ArticleServices } from '../services/ArticleServices';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  new = false;
  edit = false;
  displayedColumns: string[] = ['name', 'serial', 'state', "article"];
  dataSource: MatTableDataSource<any>;

  url: any;
  array;
  constructor(private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService, private articleServices: ArticleServices, private _snackBar: MatSnackBar) { };
  ngOnInit() {
    this.nameCampus=localStorage.getItem('NAMECAMPUS');
    this.consulAllArticles();
    this.consulAllTypeArticle();
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  nameCampus;
  typesArticle:any;
  articles: any;
  typeArticleSelec:any;
  article = {
    id: "",
    name: "",
    photo: Uint8Array,
    serial: "",
    state: { id: "", name: "" },
    typeArticle: { idTypeArticle: "", name: "" },
    room:{idRoom:0},
    campus:{idCampus:""}

  }
  clean() {
    this.article.id = "";
    this.article.name = "";
    this.article.photo = null;
    this.article.serial = "";
    this.article.state.name = "";
    this.article.state.id = "";
    this.url = null;
  }
  cancel() {
    this.new = false;
    this.edit = false;
    this.clean();
    this.ngOnInit();
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.article.photo = this.url.split(",")[1];
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  consulAllArticles() {

    this.articleServices.consulAllArticles(localStorage.getItem("IDCAMPUS")).subscribe(resp => {
      this.articles = resp;
      console.log("consulAllArticles")
      console.log(resp);
      this.dataSource = new MatTableDataSource<any>(this.articles);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log("Error:: ", error);

    });
  }
  consulAllTypeArticle() {

    this.articleServices.consulAllTypeArticle().subscribe(resp => {
      this.typesArticle = resp;
      console.log("consulAllTypeArticle")
      console.log(resp);
    }, error => {
      console.log("Error:: ", error);

    });
  }
  isFormInvalid() {
    if (!this.article.name || !this.article.photo || !this.article.serial ||
       !this.article.state ) {//Pendiente la validacion, no funciona.
      return true;
    }

  }
  getTypeArticleSelect(typeArticle) {
    this.article.typeArticle = typeArticle;
    console.log("Articulo Seleccionado");
    console.log(typeArticle);
  }
  editArticle(element) {
    this.article = element;
    console.log(this.article);
    this.url = ["data:image/jpeg;base64", this.article.photo].join(',');
    this.edit = true;
  }
  createArticle() {
    this.article.campus.idCampus=localStorage.getItem("IDCAMPUS");
    console.log(this.article);
    this.spinner.show();
    this.articleServices.setArticles(this.article).subscribe(resp => {
      console.log("createArticle");
      console.log(resp);
      if (resp == null) {
        this.openSnackBar('Error de Serial', 'Serial NO existe');
        this.spinner.hide();
        this.article.serial="";
      } else {
        this.article = JSON.parse(JSON.stringify(resp));
        this.spinner.hide();
        this.clean();
        this.openSnackBar('Guardado con Exito', 'Datos correctos');
        this.edit = false;
        this.consulAllArticles();
        this.new=false;
      }

    }, error => {
      if (error && error.message && error.message === 'Usuario ya existe') {
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }
  newArticle() {
    this.new = true;

  }


}