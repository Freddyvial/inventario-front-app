import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from '../services/usuarioService';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  dataSource: any;
  public usuarios = [];
  constructor(private usuarioService: UsuarioService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.consultUsuario();

  }
  consultUsuario() {
    this.spinner.show();
    this.usuarioService.consultUsuarios().subscribe(resp => {
      this.usuarios = JSON.parse(JSON.stringify(resp));;
      console.log(this.usuarios);
      this.spinner.hide();
    }, error => {
      console.log('Error:: ', error);
      this.spinner.hide();
    });
  }

}
