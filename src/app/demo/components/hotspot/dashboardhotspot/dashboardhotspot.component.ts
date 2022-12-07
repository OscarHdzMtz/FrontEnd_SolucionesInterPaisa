import { UsuariosfichasService } from './../../../service/usuariosfichas.service';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';
import { Component, OnInit } from '@angular/core';
import { UsuariosfichasactivasService } from 'src/app/demo/service/usuariosfichasactivas.service';

@Component({
  selector: 'app-dashboardhotspot',
  templateUrl: './dashboardhotspot.component.html',
  styleUrls: ['./dashboardhotspot.component.scss']
})
export class DashboardhotspotComponent implements OnInit {

  arrayPerfilFichas : any [] = [];
  arrayUsuariosFichas : any [] = [];
  arrayUsuariosFichasActivos : any [] = [];
  constructor(private _perfilesFichasService : PerfilfichasService, private _usuariosFichasService: UsuariosfichasService, private _usuariosFichasActivosService: UsuariosfichasactivasService) { }

  ngOnInit(): void {
    this.obtenerPerfilFichas();
    this.obtenerUsuariosFichas();
    this.obtenerUsuariosFichasActivos();
  }
  obtenerPerfilFichas(){
      this._perfilesFichasService.getPlanesFichas().subscribe(
        (data) => {
          /* console.log(data); */
          this.arrayPerfilFichas = data;
        },
        (error)=>{
          console.log(error);
        }
      )
  }
  obtenerUsuariosFichas(){
    this._usuariosFichasService.getUsuariosFichas().subscribe(
      data => {
        /* console.log(data); */
        this.arrayUsuariosFichas = data
      },
      error => {
        console.log(error);
      }
    )
  }
  obtenerUsuariosFichasActivos(){
    this._usuariosFichasActivosService.getUsuariosFichasActivos().subscribe(
      data => {
        console.log(data)
        this.arrayUsuariosFichasActivos = data;
      }, error=> {
        console.log(error);
      }
    )
  }

}
