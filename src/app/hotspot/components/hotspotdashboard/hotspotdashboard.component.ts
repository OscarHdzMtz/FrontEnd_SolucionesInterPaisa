import { Component, OnInit } from '@angular/core';
import { HotspotuserprofileService } from '../../services/hotspotuserprofile.service';
import { HotspotusersService } from '../../services/hotspotusers.service';
import { HotspotactiveusersService } from '../../services/hotspotactiveusers.service';
import { ServidoreshotspotfichasService } from 'src/app/demo/service/servidoreshotspotfichas.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HotspotserverService } from '../../services/hotspotserver.service';
import { HotspothostsService } from '../../services/hotspothosts.service';
import { Column } from 'jspdf-autotable';

@Component({
  selector: 'app-hotspotdashboard',
  templateUrl: './hotspotdashboard.component.html'
})
export class HotspotdashboardComponent implements OnInit {

  arrayPerfilFichas : any [] = [];
  arrayUsuariosFichas : any [] = [];
  arrayUsuariosFichasActivos : any [] = [];
  arrayHostHotspot : any [] = [];
  arrayServersHotspot : any [] = [];
  private intervalId: any;
  loading: boolean = true;

  //GRAFICAS
  data: any;
  options: any;

  //columnas hosts Hotspot
  colsHostHotspot: Column[] = [];
  selectedColumnsHostHotspot: Column[] = [];

  constructor(private _HotspotuserprofileService : HotspotuserprofileService, private _HotspotusersService: HotspotusersService, private _HotspotactiveusersService: HotspotactiveusersService, private _HotspotserverService : HotspotserverService, private _HotspothostsService : HotspothostsService) 
  { 
      
  }

  ngOnInit(): void {
    this.obtenerPerfilFichas();
    this.obtenerUsuariosFichas();
    this.obtenerUsuariosFichasActivos();// Cargar los datos cuando el componente se inicia
    this.obteneHostsHostpot();
    this.obtenerServerHotspot();
    // Iniciar un intervalo para cargar los datos cada 2 segundos
    this.intervalId = setInterval(() => {
      this.obtenerUsuariosFichasActivos();
    }, 2000); // Actualizar cada 2 segundos     
    this.inicializarValoresGraficaConsumoMb();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);// Detener el intervalo cuando el componente se destruye    
  }

  obtenerPerfilFichas(){
      this._HotspotuserprofileService.getHotspotUserProfilesService().subscribe(
        (data) => {
          /* console.log(data); */
          this.arrayPerfilFichas = data.resultado;
          this.loading=false;
        },
        (error)=>{
          console.log(error);
        }
      )
  }
  obtenerUsuariosFichas(){
    this._HotspotusersService.getHotspotUsersService().subscribe(
      data => {
        /* console.log(data); */
        this.arrayUsuariosFichas = data.resultado        
      },
      error => {
        console.log(error);
      }
    )
  }
  // Método para cargar los datos desde la API utilizando el servicio
  obtenerUsuariosFichasActivos(){
    this._HotspotactiveusersService.getHotspotActiveUsersService().subscribe(
      data => {
        //console.log(data.resultado)
        this.arrayUsuariosFichasActivos = data.resultado;
      }, error=> {
        console.log(error);
      }
    )
  }

   // Método para cargar los datos desde la API utilizando el servicio
   obteneHostsHostpot(){
    this._HotspothostsService.getHotspotHostsService().subscribe(
      data => {
        console.log("hosts");
        console.log(data.resultado)
        this.arrayHostHotspot = data.resultado;
      }, error=> {
        console.log(error);
      }
    )
  }

  // Método para cargar los datos desde la API utilizando el servicio
  obtenerServerHotspot(){
    this._HotspotserverService.getServerHotspotMikrotiks().subscribe(
      data => {
        console.log(data.resultado)
        this.arrayServersHotspot = data.resultado;        
      }, error=> {
        console.log(error);        
      }
    )
  }

  inicializarValoresGraficaConsumoMb(){
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              tension: 0.4
          }
      ]
  };

  this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }

  columnasHostsHotspot(){

  }

}
