import { ServidoreshotspotfichasService } from './../../../../service/servidoreshotspotfichas.service';
import { UsuariosfichasService } from 'src/app/demo/service/usuariosfichas.service';
import { Component, OnInit } from '@angular/core';
import {DividerModule} from 'primeng/divider';
import {SliderModule} from 'primeng/slider';
import { Location } from '@angular/common';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';

interface usuarioFichas {
    address: string,
    comment: string,
    email: string,
    limitBytesIn: string,
    limitBytesOut: string,
    limitBytesTotal: string,
    limitUptime: string,
    macAddress: string,
    name: string,
    password: string,
    profile: string,
    routes: string,
    server: string,
    disabled: string,
    bytesIn: string,
    bytesOut: string,
    packetsIn: string,
    packetsOut: string,
    uptime: string
}

@Component({
  selector: 'app-addusuariosfichas',
  templateUrl: './addusuariosfichas.component.html',
  styleUrls: ['./addusuariosfichas.component.scss'],
  providers: [MessageService,ConfirmationService]
})


export class AddusuariosfichasComponent implements OnInit {

    userFormUsuariosFichas = this.fb.group({
        cantidadfichas: ['', Validators.required],
        vendedorFichas: [''],
        servidorHotspot: [''],
        planesFichas: ['' /* , Validators.required */],        
        formConfiguracionUsers : this.fb.group({
        prefijoFichas: [''],
        LongitudUserFichas: [''],
        tipoUsuarioGenerarFichas: ['', Validators.required],
        tipoInicioDeSesionFichas: ['' , Validators.required],
        }),
        formConfiguracionPass : this.fb.group({
        valorLongPassFichas: [''],
        tipoPasswordGenerarFichas: ['', Validators.required],
        })        
    });
    
    valorLongUser?: number = 3;
    valorLongPass?: number = 3;

    tipoUsuarioGenerar: any[];
    tipoPasswordGenerar: any[];
    tipoInicioDeSesion: any[];

    arrayPlanesFichas: any[] = [];

    arrayUsuariosFichas: any[] = [];

    arrayServerHotspot: any[] = [];

    submitted?: boolean;
    modalSpinner? : boolean = false;

    submittedFichasCreadas?: boolean;
    modalFichasCreadas? : boolean = false;

    valorProgresBar :number = 0;
    //DONDE SE VA ALMACENAR EL PLAN SELECCIONADO AL CREAR FICHAS
   planesFichasSelected : any;
   serverHotspotSelected : any;
  constructor(private _perfilfichasService: PerfilfichasService,private _usuariosfichasService: UsuariosfichasService, private _serverHotspot: ServidoreshotspotfichasService, private location:Location, private fb: FormBuilder, private toastr: ToastrService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.tipoUsuarioGenerar = [
        "Numeros", "Letras", "Letras y numeros"
    ]
    this.tipoPasswordGenerar = [
        "Numeros", "Letras", "Letras y numeros"
    ]
    this.tipoInicioDeSesion = [
        "Contraseña", "Pin"
    ]
  }

  ngOnInit(): void {
    this.obtenerplanesFichas();
    this.obtenerUsuariosFichas();
    this.obtenerServerHotspot()
    
  }

  obtenerUsuariosFichas() {
    this._usuariosfichasService.getUsuariosFichas().subscribe(
        (data) => {
            console.log(data);
            this.arrayUsuariosFichas = data;
        },
        (error) => {
            console.log(error);
        }
    );
}
    obtenerplanesFichas(){
        this._perfilfichasService.getPlanesFichas().subscribe(
            data => {
                this.arrayPlanesFichas = data;
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    obtenerServerHotspot(){
        this._serverHotspot.getServerHotspot().subscribe(
            data => {
                this.arrayServerHotspot = data;
                console.log(data);
            },
            error=>{
                console.log(error);
            }
        )
    }
    cantidadfichasToast:any;
    arrayUsuariosFichasCreados: any[] = [];
    addUsuarioFichas(){  
        this.cantidadfichasToast = this.userFormUsuariosFichas.get('cantidadfichas')?.value ;
        //OBTENEMOS TODAS LAS PROPIEDADES DEL PLAN ELEGIDO
        this.planesFichasSelected = this.userFormUsuariosFichas.get('planesFichas')?.value      
        this.serverHotspotSelected = this.userFormUsuariosFichas.get('servidorHotspot')?.value
        console.log(this.userFormUsuariosFichas.value)
        const usuariosFichas : any = {
        cantidadfichas: this.userFormUsuariosFichas.get('cantidadfichas')?.value,
        vendedorFichas: this.userFormUsuariosFichas.get('vendedorFichas')?.value,
        servidorHotspot: this.serverHotspotSelected.name,
        /* planesFichas: this.userFormUsuariosFichas.get('planesFichas')?.value, */
        //OBTENEMOS EL NOMBRE DEL PLAN SELECIONADO
        planesFichas: this.planesFichasSelected.name,
        prefijoFichas: this.userFormUsuariosFichas.get('formConfiguracionUsers.prefijoFichas')?.value,
        LongitudUserFichas: this.userFormUsuariosFichas.get('formConfiguracionUsers.LongitudUserFichas')?.value,
        tipoUsuarioGenerarFichas: this.userFormUsuariosFichas.get('formConfiguracionUsers.tipoUsuarioGenerarFichas')?.value,
        tipoInicioDeSesionFichas: this.userFormUsuariosFichas.get('formConfiguracionUsers.tipoInicioDeSesionFichas')?.value,        
        valorLongPassFichas: this.userFormUsuariosFichas.get('formConfiguracionPass.valorLongPassFichas')?.value,
        tipoPasswordGenerarFichas: this.userFormUsuariosFichas.get('formConfiguracionPass.tipoPasswordGenerarFichas')?.value,   
        }     
        console.log(usuariosFichas);           
        this._usuariosfichasService.saveUsuariosFichas(usuariosFichas).subscribe(                        
            (data) => {    
                this.AbrirModalSpiner();                                          
                this.toastr.success(
                    'Se agregaron ' + this.cantidadfichasToast+ " fichas al mikrotik",
                    'LISTO!', {progressBar: true}                    
                );  
                //GUARDAMOS LOS USUARIOS QUE SE CREARON EN UN ARRAY PARA ENVIARLES A UN MODAL  
                this.arrayUsuariosFichasCreados = data;
                console.log(data);
                console.log("ModalCerrado")             
                this.CerrarModalSpiner();  
                this.AbrirModalFichasCreadas();
            },            
            (error) => {
                this.toastr.error(error.status + ', ' + error.name, 'Error',{
                    progressBar: true
                });
                console.log(error);
            },            
        );                     
        this.modalSpinner = true;                        
        this.userFormUsuariosFichas.reset();
        this.valorLongUser = 2;
        this.valorLongPass = 2;              
    }

    RegresarAtras(){
        this.location.back();
        this.obtenerUsuariosFichas()
    }


    
    AbrirModalSpiner(){        
        this.submitted = true;
        this.modalSpinner = true;
    }

    AbrirModalFichasCreadas(){        
        this.submittedFichasCreadas = true;
        this.modalFichasCreadas = true;
    }
    CerrarModalFichasCreadas(){        
        this.submittedFichasCreadas = false;
        this.modalFichasCreadas = false;
    }

    CerrarModalSpiner() {
        this.submitted = false;
        this.modalSpinner = false;        
    }

}
