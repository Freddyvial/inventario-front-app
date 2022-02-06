import { Component, OnInit } from '@angular/core';
import { MaestroService } from '../services/maestroService';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.css']
})
export class MaestroComponent implements OnInit {
  dataSource: any;
  constructor(private maestroService:MaestroService) { }

  ngOnInit(): void {
   this.consultMaestro();
    
  }
  consultMaestro() {
    this.maestroService.consultMaestro().subscribe(resp => {
      console.log(resp);
      this.dataSource=resp;
    }, error => {
      console.log('Error:: ', error);
    });

  }

}
