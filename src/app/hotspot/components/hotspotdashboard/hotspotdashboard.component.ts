import { Component, OnInit } from '@angular/core';
import { HotspotuserprofileService } from '../../services/hotspotuserprofile.service';
import { HotspotusersService } from '../../services/hotspotusers.service';
import { HotspotactiveusersService } from '../../services/hotspotactiveusers.service';
import { ServidoreshotspotfichasService } from 'src/app/demo/service/servidoreshotspotfichas.service';

@Component({
  selector: 'app-hotspotdashboard',
  templateUrl: './hotspotdashboard.component.html'
})
export class HotspotdashboardComponent implements OnInit {

  arrayPerfilFichas : any [] = [];
  arrayUsuariosFichas : any [] = [];
  arrayUsuariosFichasActivos : any [] = [];
  arrayServersHotspot : any [] = [];
  private intervalId: any;

  constructor(private _perfilesFichasService : HotspotuserprofileService, private _usuariosFichasService: HotspotusersService, private _usuariosFichasActivosService: HotspotactiveusersService, private _servidoresHostpotService : ServidoreshotspotfichasService) { }

  ngOnInit(): void {
    this.obtenerPerfilFichas();
    this.obtenerUsuariosFichas();
    this.obtenerUsuariosFichasActivos();// Cargar los datos cuando el componente se inicia
    this.obtenerServerHotspot();
    // Iniciar un intervalo para cargar los datos cada 2 segundos
    this.intervalId = setInterval(() => {
      this.obtenerUsuariosFichasActivos();
    }, 2000); // Actualizar cada 2 segundos
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);// Detener el intervalo cuando el componente se destruye
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
  // Método para cargar los datos desde la API utilizando el servicio
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

  // Método para cargar los datos desde la API utilizando el servicio
  obtenerServerHotspot(){
    this._servidoresHostpotService.getServerHotspot().subscribe(
      data => {
        console.log(data)
        this.arrayServersHotspot = data;
      }, error=> {
        console.log(error);
      }
    )
  }
}
