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
        servidorFichas: [''],
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

    submitted?: boolean;
    modalSpinner? : boolean = false;
    valorProgresBar :number = 0;
    //DONDE SE VA ALMACENAR EL PLAN SELECCIONADO AL CREAR FICHAS
   planesFichasSelected : any;
  constructor(private _perfilfichasService: PerfilfichasService,private _usuariosfichasService: UsuariosfichasService, private location:Location, private fb: FormBuilder, private toastr: ToastrService, private messageService: MessageService, private confirmationService: ConfirmationService) {
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

    cantidadfichasToast:any;
    addUsuarioFichas(){  
        this.cantidadfichasToast = this.userFormUsuariosFichas.get('cantidadfichas')?.value ;
        //OBTENEMOS TODAS LAS PROPIEDADES DEL PLAN ELEGIDO
        this.planesFichasSelected = this.userFormUsuariosFichas.get('planesFichas')?.value      
        console.log(this.userFormUsuariosFichas.value)
        const usuariosFichas : any = {
        cantidadfichas: this.userFormUsuariosFichas.get('cantidadfichas')?.value,
        vendedorFichas: this.userFormUsuariosFichas.get('vendedorFichas')?.value,
        servidorFichas: this.userFormUsuariosFichas.get('servidorFichas')?.value,
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
                console.log("ModalCerrado")             
                this.CerrarModalSpiner();                                          
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
        this.valorLongUser = 3;
        this.valorLongPass = 3;              
    }

    RegresarAtras(){
        this.location.back();
        this.obtenerUsuariosFichas()
    }


    
    AbrirModalSpiner(){        
        this.submitted = true;
        this.modalSpinner = true;
    }

    CerrarModalSpiner() {
        this.submitted = false;
        this.modalSpinner = false;        
    }

}
