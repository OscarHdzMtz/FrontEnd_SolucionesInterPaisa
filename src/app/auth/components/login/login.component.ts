import { Component, inject } from '@angular/core';
/* import { FormControl, FormGroup } from '@angular/forms'; */
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../../services/login.service';

import { Form, FormBuilder,Validators } from '@angular/forms';
import { ILogin } from '../../intrefaces/ilogin';

import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})


export class LoginComponent {               
    
    loginResponseOnbject: any;    

    valCheck: string[] = ['remember'];

    /* password!: string; */

    loginForm = this.formBuilder.group({
        correo : ['user1@gmail.com',[Validators.required, Validators.email]],
        password:['',Validators.required]
    });
    
    
    constructor(public layoutService: LayoutService,private formBuilder: FormBuilder, private _loginService : LoginService,private messageService: MessageService, private router:Router) {
        
    }

    async authSubmit(){

        var loginInfo: ILogin = {
            correo: this.loginForm.value.correo?.toString(),
            password: this.loginForm.value.password?.toString()
        };
          
        this._loginService.loginUser(loginInfo).subscribe(
            (data) => {                
                
                this.loginResponseOnbject = data;
          
                console.log(data);

                //console.log(data.resultado.token);

                this.router.navigateByUrl('hotspot/dashboardhotspot');

                this.messageService.add({severity:'success', summary: 'Success', detail: "mensaje", life: 3000});   

            },
            (error: any) => {

                console.error("Ocurrió un error durante la solicitud:", error);
           
                this.messageService.add({severity:'error', summary: 'Error', detail: error.error.errorsMessage[0], life: 3000});   
            }
        );
        /* try {

          const data = await this._loginService.loginUser(loginInfo).toPromise();

          this.loginResponseOnbject = data;
          
          console.log(data.resultado.token);

          this.router.navigateByUrl('hotspot/dashboardhotspot');

        }catch (error: any) {

            console.error("Ocurrió un error durante la solicitud:", error);
           
            this.messageService.add({severity:'error', summary: 'Error', detail: error.error.errorsMessage[0], life: 3000});            
        } */
      }
          
      validacionLogin(){
        if(this.loginForm.valid){
            console.log("correcto");
        }else{
            console.log("else");
            alert("error al ingresar los datos")
        }
      }
}
