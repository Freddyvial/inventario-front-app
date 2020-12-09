import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CampusService } from '../services/CampusService'
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
@Component({
    selector: 'app-campus',
    templateUrl: './campus.component.html',
    styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {
    campuses;
    conquistadores;
    theWebcamLab;
    camSoda;
    role;
    url: any;
    new=false;
    photoOk=false;
    constructor(private spinner: NgxSpinnerService, private campusService: CampusService, private _snackBar: MatSnackBar) { }
    ngOnInit(): void {
        this.role = localStorage.getItem("ROLE")
        localStorage.removeItem('CAMPUS')
        this.consulCampus();
        this.isAdmin();
    }
    tabs = [];
    tabs2 = [];
    selected = new FormControl(0);
  
    campus = {
        idCampus: "",
        name: "",
        direction: "",
        logo: Uint8Array
    }
    isAdmin() {
        if (this.role == 1) {
            return true;
        }
        if (this.role!=1) {    
            return false
        }
    }
    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
                this.url = event.target.result;
                this.campus.logo = this.url.split(",")[1];
                this.photoOk=true;
            }
        }
    }

    consulCampus() {
        this.spinner.show();
        this.campusService.consultCampus().subscribe(resp => {
            console.log(resp);
            this.campuses = resp;
            this.addHedersLogo();
            if (this.isAdmin()) {
                this.tabs=this.campuses;       
            }else{
                let id = localStorage.getItem("CAMPUSUSER")
                for (let index = 0; index < this.campuses.length; index++) {
                    if (id==this.campuses[index].idCampus) {
                       this.tabs2.push(this.campuses[index])
                    }
                }
                this.tabs=this.tabs2;
        
                
            }
            this.spinner.hide();
        }, error => {
            console.log("ERROR::", error);
            this.spinner.hide();
        })

    }

    addHedersLogo(){

        for (let index = 0; index < this.campuses.length; index++) {
           let logo= this.campuses[index].logo;
           this.campuses[index].logo=["data:image/jpeg;base64", logo].join(',');
            
        }

    }
   
    getIn(tap){
        localStorage.setItem('IDCAMPUS', tap.idCampus);
        localStorage.setItem('NAMECAMPUS', tap.name);
        localStorage.setItem('LOGO',tap.logo);
        
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });

    }
    cancel(){
        this.new=false;
    }
    createCampus() {
        this.spinner.show();
            this.campusService.sendCampus(this.campus).subscribe(resp => {
            console.log("createCampus");
            console.log(resp);
            if (resp == null) {
                this.openSnackBar('Error de Nombre', 'Nombre NO existe');
                this.spinner.hide();
                this.campus.name = "";
            } else {
                this.campus = JSON.parse(JSON.stringify(resp));
                this.spinner.hide();
                this.openSnackBar('Guardado con Exito', 'Datos correctos');
                this.clean();
                this.photoOk=false;
                this.consulCampus();
                this.new=false;
            }

        }, error => {
            if (error && error.message && error.message === 'Sede ya existe') {
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
    newCampus(){
        this.new=true;
    }
    clean() {
        this.campus.direction = "";
        this.campus.logo = null;
        this.campus.name = "";
    }
    isFormInvalid() {
        if (!this.campus.name || !this.photoOk || !this.campus.direction) {
          return true;
        }    
      }

}