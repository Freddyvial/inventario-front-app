import { Component,OnInit } from '@angular/core';
import { Console } from 'console';
import { NgxSpinnerService } from "ngx-spinner";
import { from } from 'rxjs';
import {CampusService} from '../services/CampusService'
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
    constructor(private spinner: NgxSpinnerService, private campusService:CampusService){}
    ngOnInit(): void {
        localStorage.removeItem('CAMPUS')
        this.consulCampus();
      }

     consulCampus(){
         this.spinner.show();
         this.campusService.consultCampus().subscribe(resp=>{
            console.log(resp);
            this.campuses=resp;
            this.upCampus(this.campuses);
            this.spinner.hide();
         },error=>{
            console.log("ERROR::",error);
            this.spinner.hide();
         })

     } 
     upCampus(campuses){
         for (let index = 0; index < campuses.length; index++) {
            if (campuses[index].name=="CONQUISTADORES") { 
                this.conquistadores=campuses[index];            
            }
            if (campuses[index].name=="THEWEBCAMLAB") {
                this.theWebcamLab=campuses[index];
            }
            if (campuses[index].name=="CAMSODA") {     
                this.camSoda=campuses[index];           
            }
         }
     }
    conq(){
        localStorage.setItem('IDCAMPUS',this.conquistadores.idCampus);
        localStorage.setItem('NAMECAMPUS',this.conquistadores.name);
    }
    cam(){
        localStorage.setItem('IDCAMPUS',this.camSoda.idCampus);
        localStorage.setItem('NAMECAMPUS',this.camSoda.name);
    }
    twl(){
        localStorage.setItem('IDCAMPUS',this.theWebcamLab.idCampus);
        localStorage.setItem('NAMECAMPUS',this.theWebcamLab.name);
    }
      
  }