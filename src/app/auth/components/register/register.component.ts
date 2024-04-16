import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../../services/login.service';
import { log } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
})
export class RegisterComponent {

  formulario: FormGroup;
  
  loginService = inject(LoginService)

  valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService) { 
      this.formulario = new FormGroup({
        empresa : new FormControl(),
        email1 : new FormControl(),
        password1 : new FormControl()
      })
    }

    async onSubmit(){
      const response = await this.loginService.register(this.formulario.value);
      console.log(response);
    }

}
