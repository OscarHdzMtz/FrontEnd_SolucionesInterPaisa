import { Component, OnInit } from '@angular/core';
import { HotspotuserprofileService } from '../../services/hotspotuserprofile.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';

interface TipoFicha {
  nombre: string;
  value: string;
  status: boolean;
}

//CREAMOS LA INTERFAZ CON LOS DATOS QUE SE RECIBIRA DESDE EL MODAL
interface PerfilesFichaModal {
  idPerfilModal: string;
  nombrePerfilModal : string,
  tipodeFichas: string,
  velocidadSubidaModal: string,
  velocidadSubidaEnModal: string,
  velocidadBajadaModal: string,
  velocidadBajadaEnModal: string
  tiempoLimiteFichaDia: number
  tiempoLimiteFichaHora: number
  tiempoLimiteFichaMin: number,
  tiemoExpiracionFichaDia:number
  tiemoExpiracionFichaHora:number
  tiemoExpiracionFichaMin:number
  limiteDeTraficoFicha: number,
  limiteDeTraficoFichaEnKbMbGb: string
}

@Component({
  selector: 'app-perfilfichas',
  templateUrl: 'hotspotuserprofile.component.html',
  providers: [MessageService,ConfirmationService]
})
export class HotspotuserprofileComponent implements OnInit {
  //ARREGLO DONDE SE OBTIENEN LAS PERFILES DESDE EL FRONT

  listplanesfichas: any[] = [];

  // creamos una variable con el tipo de interface de los datos que vienen desde el modal y INICIALIZAMOS LOS VARIABLES QUE VENDRAN DESDE EL MODAL
  perfilDesdeModal: PerfilesFichaModal = {
  idPerfilModal: "",
  nombrePerfilModal : '',
  tipodeFichas: '',
  velocidadSubidaModal: "",
  velocidadSubidaEnModal: "",
  velocidadBajadaModal: "",
  velocidadBajadaEnModal: '',
  tiempoLimiteFichaDia: 0,
  tiempoLimiteFichaHora: 0,
  tiempoLimiteFichaMin: 0,
  tiemoExpiracionFichaDia:0,
  tiemoExpiracionFichaHora:0,
  tiemoExpiracionFichaMin:0,
  limiteDeTraficoFicha: 0,
  limiteDeTraficoFichaEnKbMbGb: ''
  }

  //VARIABLE DE LOS VALORES DEL MODAL
  //false para que el modal no se abre cuando carga la pagina
  perfilModalDialog: boolean = false;
  submitted?: boolean;

  //VARIABLES DE VALOR POR DEFAULT TIEMPO LIMITE DE FICHAS
  defaulttimpolimiteDia: string = '0';
  defaulttimpolimiteHora: string = '0';
  defaulttimpolimiteMin: string = '0';

  //VARIABLES DE VALOR POR DEFAULT EXOIRACION DE FICHAAS
  defaultExpiracionDia: string = '0';
  defaultExpiracionHora: string = '0';
  defaultExpiracionMin: string = '0';

  //VARIABLES DE SELECCION DE TIPO DE FICHAS
  selectTipoFicha: any[];
  fichaSelected?: TipoFicha;
  //VARIABLES DE VELOCIDAD DE TIPO DE DICHAS MB/KB
  seleccionVelocidadsubida: any[];
  seleccionVelocidadbajada: any[];
  seleccionLimiteDeTrafico: any[];


  constructor(private _perfilfichasService: HotspotuserprofileService, private toastr: ToastrService, private messageService: MessageService, private confirmationService: ConfirmationService) {
      this.selectTipoFicha = [
          "Corrido", "Pausado", "Megas"
      ];
      //VALORES QUE SE MOSTRARAN EN EL SELECT
      this.seleccionVelocidadsubida = [
          "Kbps", "Mbps"
      ];
      this.seleccionVelocidadbajada = [
          "Kbps", "Mbps"
      ];
      this.seleccionLimiteDeTrafico = [
          "Kbps", "Mbps", "Gbps"
      ]
  }

  ngOnInit(): void {
      this.obtenerplanesfichas();
      /* this._perfilfichas.getPlanesFichas().subscribe(data => this.listplanesfichas = data); */
  }

  //METODO QUE ABRE EL MODAL
  openNew() {
      this.submitted = false;
      this.perfilModalDialog = true;
  }

  //METODO PARA OBTENER LOS PERFILES DESDE EL BACKEND
  obtenerplanesfichas() {
      this._perfilfichasService.getHotspotUserProfilesService().subscribe(
          (data) => {
              console.log(data.resultado);
              this.listplanesfichas = data.resultado;
          },
          (error) => {
              console.log(error);
          }
      );
  }
  //METODO PARA GENERAR CADENA ALEATORIA
  CadenaAleatoria() {
      let result = '';
      const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
          result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
          );
      }
      return result;
  }


  agregarPlanesFichas() {
      this.submitted = true
      if(this.perfilDesdeModal.idPerfilModal !== ""){
              //VALIDAMOS SI LA HORA ES MENOR A 10 Y LE AGREGAMOS UN CERO ANTES PARA QUE LO RECONOSCA MIKROTIK
              var tiempoLimiteFichaHoraConCero
              var tiempoLimiteFichaMinConCero
              if(this.perfilDesdeModal.tiempoLimiteFichaHora < 10 || this.perfilDesdeModal.tiempoLimiteFichaMin < 10 ){
                  tiempoLimiteFichaHoraConCero ="0" + this.perfilDesdeModal.tiempoLimiteFichaHora
                  tiempoLimiteFichaMinConCero = "0" + this.perfilDesdeModal.tiempoLimiteFichaMin
              }else{
                  tiempoLimiteFichaHoraConCero = this.perfilDesdeModal.tiempoLimiteFichaHora
                  tiempoLimiteFichaMinConCero = this.perfilDesdeModal.tiempoLimiteFichaMin
              }

              //OBTENER EL PRIMER CARACTER DE Mbps Y Kbps ===> 'M', 'K'
              var velocidadSubidaEnModalSubstring = this.perfilDesdeModal.velocidadSubidaEnModal.substring(0, 1);
              var velocidadBajadaEnModalSubstring = this.perfilDesdeModal.velocidadBajadaEnModal.substring(0, 1);


              //CREAMOS UNA VARIABLE CON LOS DATOS QUE SE ENVIARA EL BACKEND Y GUARDAR AL MIKROTIK
              var PlanesFichas: any = {                    
                  idProfile : this.perfilDesdeModal.idPerfilModal,
                  tipoDeFichas: this.perfilDesdeModal.tipodeFichas,
                  nameProfile: this.perfilDesdeModal.nombrePerfilModal,
                  addressPoolProfile: 'none',
                  velocidadSubidaBajadaProfile: this.perfilDesdeModal.velocidadSubidaModal + velocidadSubidaEnModalSubstring + "/" + this.perfilDesdeModal.velocidadBajadaModal + velocidadBajadaEnModalSubstring,
                  limiteDeTiempoProfile: this.perfilDesdeModal.tiempoLimiteFichaDia + "d " + tiempoLimiteFichaHoraConCero + ":" + tiempoLimiteFichaMinConCero + ":00",
                  onLoginProfile: '',
                  onLogoutProfile: 'planesFichas.onLogoutProfil',
              };
              //Enviamos los datos del variable al
              this._perfilfichasService.postHotspotUserProfileService(PlanesFichas).subscribe(
                  (data) => {
                      this.toastr.info(
                          this.perfilDesdeModal.nombrePerfilModal + ' Perfil Actualizado Correctamente',
                          'Actualizado', {progressBar: true}
                      );
                      //MANDA A TRAER EL METODO OBTENER PLANES PARA QUE SE ACTUALIZE LA TABLA CON EL NUEVO PERFIL EN TIEMP REAL
                      this.obtenerplanesfichas();
                  },
                  (error) => {
                      this.toastr.error(error.status + ', ' + error.name, 'Error',{
                          progressBar: true
                      });
                      console.log(error);
                  }
              );
      }else
          {
              //VALIDAMOS SI LA HORA ES MENOR A 10 Y LE AGREGAMOS UN CERO ANTES PARA QUE LO RECONOSCA MIKROTIK
              var tiempoLimiteFichaHoraConCero
              var tiempoLimiteFichaMinConCero
              if(this.perfilDesdeModal.tiempoLimiteFichaHora < 10 || this.perfilDesdeModal.tiempoLimiteFichaMin < 10 ){
                  tiempoLimiteFichaHoraConCero ="0" + this.perfilDesdeModal.tiempoLimiteFichaHora
                  tiempoLimiteFichaMinConCero = "0" + this.perfilDesdeModal.tiempoLimiteFichaMin
              }else{
                  tiempoLimiteFichaHoraConCero = this.perfilDesdeModal.tiempoLimiteFichaHora
                  tiempoLimiteFichaMinConCero = this.perfilDesdeModal.tiempoLimiteFichaMin
              }

              //OBTENER EL PRIMER CARACTER DE Mbps Y Kbps ===> 'M', 'K'
              var velocidadSubidaEnModalSubstring = this.perfilDesdeModal.velocidadSubidaEnModal.substring(0, 1);
              var velocidadBajadaEnModalSubstring = this.perfilDesdeModal.velocidadBajadaEnModal.substring(0, 1);


              //CREAMOS UNA VARIABLE CON LOS DATOS QUE SE ENVIARA EL BACKEND Y GUARDAR AL MIKROTIK
              var PlanesFichas: any = {
                  tipoDeFichas: this.perfilDesdeModal.tipodeFichas,
                  nameProfile: this.perfilDesdeModal.nombrePerfilModal,
                  addressPoolProfile: 'none',
                  velocidadSubidaBajadaProfile: this.perfilDesdeModal.velocidadSubidaModal + velocidadSubidaEnModalSubstring + "/" + this.perfilDesdeModal.velocidadBajadaModal + velocidadBajadaEnModalSubstring,
                  limiteDeTiempoProfile: this.perfilDesdeModal.tiempoLimiteFichaDia + "d " + tiempoLimiteFichaHoraConCero + ":" + tiempoLimiteFichaMinConCero + ":00",
                  onLoginProfile: '',
                  onLogoutProfile: 'planesFichas.onLogoutProfil',
              };

              //Enviamos los datos del variable al
              this._perfilfichasService.postHotspotUserProfileService(PlanesFichas).subscribe(
                  (data) => {
                      this.toastr.success(
                          this.perfilDesdeModal.nombrePerfilModal + ' Agregado Correctamente',
                          'Perfil Agregado', {progressBar: true}
                      );
                      //MANDA A TRAER EL METODO OBTENER PLANES PARA QUE SE ACTUALIZE LA TABLA CON EL NUEVO PERFIL EN TIEMP REAL
                      this.obtenerplanesfichas();
                  },
                  (error) => {
                      this.toastr.error(error.status + ', ' + error.name, 'Error',{
                          progressBar: true
                      });
                      console.log(error);
                  }
              );
      }
      //CON ESTO RESTABLECEMOS LOS VALORES DEL MODAL A VACIO
      this.perfilDesdeModal = {
          idPerfilModal: "",
          nombrePerfilModal : '',
          tipodeFichas: '',
          velocidadSubidaModal: "",
          velocidadSubidaEnModal: "",
          velocidadBajadaModal: "",
          velocidadBajadaEnModal: '',
          tiempoLimiteFichaDia: 0,
          tiempoLimiteFichaHora: 0,
          tiempoLimiteFichaMin: 0,
          tiemoExpiracionFichaDia:0,
          tiemoExpiracionFichaHora:0,
          tiemoExpiracionFichaMin:0,
          limiteDeTraficoFicha: 0,
          limiteDeTraficoFichaEnKbMbGb: ''
      };
      //Cierra el Modal
      this.hideDialog();

  }
  /* deletePlanesFichas(id: string) {
      this._perfilfichasService.deletePlanesFichas(id).subscribe(data =>{
          this.toastr.success('Plan eliminada con Exito', 'Plan Eliminado');
          this.obtenerplanesfichas();
      }, error => {
          this.toastr.error(error.status, 'Error')
      })
  } */
  deletePlanesFichas(id: string, nombrePerfil: string) {
      this.confirmationService.confirm({
          message: 'Estas seguro que quieres Eliminar ' + nombrePerfil +' ?',
          header: 'Eliminar',
          icon: 'pi pi-trash',
          accept: () => {
              this._perfilfichasService.deleteHotspotUserProfileService(id).subscribe(data => {
                  /* this.toastr.warning('Perfil ' + nombrePerfil + ' eliminada con Exito','Eliminado'); */
                  this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'Perfil ' + nombrePerfil + ' eliminada con Exito', life: 3000});
                  this.obtenerplanesfichas();
              }, error => {
                  /* this.toastr.error(error.status + ' ' +  error.name, 'Error') */
                  this.messageService.add({severity:'error', summary: 'Error', detail: error.status + ' ' +  error.name, life: 3000});
              });
          }
      });

  }

  editPlanesFichas(nombre: string, macCookieTimeout: string, rateLimit: string, idPlanes: string) {

    console.log("entro edit");

      //CONVERTIMOS EL STRING EN UN ARREGLO PARA PODER MANDAR EL VALOR DE SUBISDA Y BAJADA POR SEPARADO
      let rateLimitaSubida : Array<string>= rateLimit.split("/")


      var buscartiempoLimiteFichaDia;
      var buscartiempoLimiteFichaMin;
      var buscartiempoLimiteFichaHora;
      var buscartiempoLimiteFichaSemana;
      //RECORREMOS EL macCookieTimeout QUE VIENE PARA BUSCAR EL VALOR DE DIA RECORRIENDO CARACTER POR CARACTER
      for(var recorrer = 0; recorrer < macCookieTimeout.length; recorrer ++){
          var caracter = macCookieTimeout.charAt(recorrer)
          if( caracter === "d" || caracter === "w"){
              //VALIDAMOS SI LOS DIAS VIENE POR SEMANA, SI, SI OBTENEMOS EL VALOR DE LA SEMANA PARA PODER CONVERTIRLO EN DIA
              if(caracter === "w"){
                  /* console.log("Se encontro la letra D _"+  caracter + "Posicion " + recorrer ); */
                  buscartiempoLimiteFichaSemana = macCookieTimeout.substring(0, recorrer)
                  console.log(buscartiempoLimiteFichaSemana)
              }
              if(caracter === "d"){
                  /* console.log("Se encontro la letra D _"+  caracter + "Posicion " + recorrer ); */
              buscartiempoLimiteFichaDia = macCookieTimeout.substring(recorrer- 1, recorrer)
              console.log(buscartiempoLimiteFichaDia)
              }
          }
          /* if(caracter === "h"){ */
              /* console.log("Se encontro la letra H _"+  caracter + "Posicion " + recorrer ); */
              /* buscartiempoLimiteFichaHora = macCookieTimeout.substring(recorrer - 1, recorrer)
              console.log(buscartiempoLimiteFichaHora)
          } */
          /* if(caracter === "m"){ */
              /* console.log("Se encontro la letra M _"+  caracter + "Posicion " + recorrer ); */
           /*    buscartiempoLimiteFichaMin = macCookieTimeout.substring(recorrer - 1, recorrer)
              console.log(buscartiempoLimiteFichaMin)
          } */
      }
      //RECORREMOS PARA BUSCAR EL VALOR DE HORA
      for(var recorrerHyM = 0; recorrerHyM < macCookieTimeout.length; recorrerHyM ++){
          var caracter = macCookieTimeout.charAt(recorrerHyM)
          //SI ENCONTRAMOS w RECORREMOS PARA BUSCAR d
          if(caracter === "w"){
              for(var buscarD = 0; buscarD < macCookieTimeout.length; buscarD ++){
                  var caracterD = macCookieTimeout.charAt(buscarD)
                  //SI ENCONTRAMOS d RECORREMOS PARA BUSCAR h
                  if(caracterD === "d"){
                      for(var buscarH = 0; buscarH < macCookieTimeout.length; buscarH ++){
                          var caracterH = macCookieTimeout.charAt(buscarH)
                          if(caracterH === "h"){
                              //TOMAMOS EL VALOR DE LA POSICION DONDE SE ENCONTRO d Y h PARA OBTENER EL VALOR DE HORA
                              buscartiempoLimiteFichaHora = macCookieTimeout.substring(buscarD + 1, buscarH)
                              console.log(buscartiempoLimiteFichaHora)
                              //BUSCAMOS EL VALOR MINUTO
                              for (let buscarM = 0; buscarM < macCookieTimeout.length; buscarM++) {
                                  var caracterM = macCookieTimeout.charAt(buscarM)
                                      if (caracterM === "m") {
                                          //ASIGNAMOS EL VALOR AL MINUTO, TOMANDO COMO REFERENCIA LA HORA Y EL TOTAL DE DIGITOS DE LA CADENA -1
                                          buscartiempoLimiteFichaMin = macCookieTimeout.substring(buscarH + 1, macCookieTimeout.length -1)
                                          console.log(buscartiempoLimiteFichaMin)
                                          break;
                                      }
                              }
                              break
                          }
                          if (caracterH === "m") {
                              //ASIGNAMOS EL VALOR AL MINUTO, TOMANDO COMO REFERENCIA LA HORA Y EL TOTAL DE DIGITOS DE LA CADENA -1
                              buscartiempoLimiteFichaMin = macCookieTimeout.substring(buscarD + 1, macCookieTimeout.length -1)
                              console.log(buscartiempoLimiteFichaMin)
                              break;
                          }
                      }
                      break
                  }
                  //SI d NO EXISTE PROCEMOS A BUSCAR h
                  if(caracterD === "h"){
                      //Y TOMAMOS EL VALOR DE LA POSICION DONDE SE ENCUENTRA h
                      buscartiempoLimiteFichaHora = macCookieTimeout.substring(recorrerHyM + 1, buscarD)
                      console.log(buscartiempoLimiteFichaHora)
                      //BUSCAMOS EL VALOR MINUTO
                          for (let buscarM = 0; buscarM < macCookieTimeout.length; buscarM++) {
                              var caracterM = macCookieTimeout.charAt(buscarM)
                              if (caracterM === "m") {
                                  //ASIGNAMOS EL VALOR AL MINUTO, TOMANDO COMO REFERENCIA LA HORA Y EL TOTAL DE DIGITOS DE LA CADENA -1
                                  buscartiempoLimiteFichaMin = macCookieTimeout.substring(buscarD + 1, macCookieTimeout.length -1)
                                  console.log(buscartiempoLimiteFichaMin)
                                  break;
                              }
                          }
                      break;
                  }
                  if (caracterD === "m") {
                      buscartiempoLimiteFichaMin = macCookieTimeout.substring(recorrerHyM + 1, macCookieTimeout.length -1)
                      console.log(buscartiempoLimiteFichaMin)
                  }
              }
              break;
          }
          //SI NO EXISTE w BUSCAMOS DIRECTAMENTE d
          if(caracter === "d"){
              for(var buscarH = 0; buscarH < macCookieTimeout.length; buscarH ++){
                  var caracterH = macCookieTimeout.charAt(buscarH)
                  if(caracterH === "h"){
                      //TOMAMOS EL VALOR DE LA POSICION DONDE SE ENCONTRO d Y h PARA OBTENER EL VALOR DE HORA
                      buscartiempoLimiteFichaHora = macCookieTimeout.substring(recorrerHyM + 1, buscarH)
                      console.log(buscartiempoLimiteFichaHora)
                          //BUSCAMOS EL VALOR MINUTO
                      for (let buscarM = 0; buscarM < macCookieTimeout.length; buscarM++) {
                          var caracterM = macCookieTimeout.charAt(buscarM)
                              if (caracterM === "m") {
                                  //ASIGNAMOS EL VALOR AL MINUTO, TOMANDO COMO REFERENCIA LA HORA Y EL TOTAL DE DIGITOS DE LA CADENA -1
                                  buscartiempoLimiteFichaMin = macCookieTimeout.substring(buscarH + 1, macCookieTimeout.length -1)
                                  console.log(buscartiempoLimiteFichaMin)
                                  break;
                              }
                      }
                      break;
                  }
                  if (caracterH === "m") {
                      buscartiempoLimiteFichaMin = macCookieTimeout.substring(recorrerHyM + 1, macCookieTimeout.length -1)
                      console.log(buscartiempoLimiteFichaMin)
                      break;
                  }
              }
              break;
          }
          //SI NO EXISTE NI w NI d PROCEDEMOS A BUSCAR h
          if(caracter === "h"){
              buscartiempoLimiteFichaHora = macCookieTimeout.substring(0, recorrerHyM)
              console.log(buscartiempoLimiteFichaHora)
              //BUSCAMOS EL VALOR MINUTO
              for (let buscarM = 0; buscarM < macCookieTimeout.length; buscarM++) {
                  var caracterM = macCookieTimeout.charAt(buscarM)
                      if (caracterM === "m") {
                          //ASIGNAMOS EL VALOR AL MINUTO, TOMANDO COMO REFERENCIA LA HORA Y EL TOTAL DE DIGITOS DE LA CADENA -1
                          buscartiempoLimiteFichaMin = macCookieTimeout.substring(recorrerHyM + 1, macCookieTimeout.length -1)
                          console.log(buscartiempoLimiteFichaMin)
                          break;
                      }
              }
              break;
          }
          if (caracter === "m") {
              buscartiempoLimiteFichaMin = macCookieTimeout.substring(0, macCookieTimeout.length -1)
              console.log(buscartiempoLimiteFichaMin)
              break;
          }
      }



      //VALIDAMOS SI LOS VARIABLES VIENEN COMO VALOR INDEFINIDO Y LE AGREGAMOS UN CERO
      if(buscartiempoLimiteFichaMin === undefined){

          buscartiempoLimiteFichaMin = 0;
      }
      if(buscartiempoLimiteFichaHora === undefined){
          buscartiempoLimiteFichaHora = 0;
      }
      if(buscartiempoLimiteFichaDia === undefined){
          buscartiempoLimiteFichaDia = 0;
      }
      if(buscartiempoLimiteFichaSemana === undefined){
          buscartiempoLimiteFichaSemana = 0;
      }
      //convertimos el vaor que obtenemos en TIPO Number ya que la variable donde se va mandar es de tipo number
      var buscartiempoLimiteFichaDiaNumber = Number(buscartiempoLimiteFichaDia);
      var buscartiempoLimiteFichaHoraNumber = Number(buscartiempoLimiteFichaHora);
      var buscartiempoLimiteFichaMinNumber = Number(buscartiempoLimiteFichaMin);
      var buscartiempoLimiteFichaSemanaNumber = Number(buscartiempoLimiteFichaSemana);


      //ASIGNAMOS LOS VALORES EL MODAL EDITAR
      this.perfilDesdeModal = {
          idPerfilModal: idPlanes,
          nombrePerfilModal :  nombre,
          tipodeFichas: '',
          velocidadSubidaModal: rateLimitaSubida[0].substring(0, rateLimitaSubida[0].length-1),
          velocidadSubidaEnModal: rateLimitaSubida[0].substring(rateLimitaSubida[0].length-1, rateLimitaSubida[0].length) + "bps",
          velocidadBajadaModal: rateLimitaSubida[1].substring(0, rateLimitaSubida[1].length-1),
          velocidadBajadaEnModal: rateLimitaSubida[1].substring(rateLimitaSubida[1].length-1, rateLimitaSubida[1].length) + "bps",
          //DESPUES DE VALIDAR SI LOS DIAS VIENEN EN SEMANA , MULTIPLICAMOS LA SEMANA POR 7 PARA SACAR EL DIA Y LE CONCATENAMOS CON DIAS POR SI VIENE DIAS TAMBN APARTE DE SEMANA
          tiempoLimiteFichaDia: buscartiempoLimiteFichaSemanaNumber * 7 + buscartiempoLimiteFichaDiaNumber,
          tiempoLimiteFichaHora: buscartiempoLimiteFichaHoraNumber,
          tiempoLimiteFichaMin: buscartiempoLimiteFichaMinNumber,
          tiemoExpiracionFichaDia:0,
          tiemoExpiracionFichaHora:0,
          tiemoExpiracionFichaMin:0,
          limiteDeTraficoFicha: 0,
          limiteDeTraficoFichaEnKbMbGb: ''
      }
      console.log(this.perfilDesdeModal);
      this.perfilModalDialog = true;
  }
//METODO QUE CIERRA EL MODAL
  hideDialog() {
      this.perfilModalDialog = false;
      this.submitted = false;
  }
}
