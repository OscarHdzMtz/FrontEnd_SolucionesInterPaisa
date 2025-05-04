import { Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ILogin } from '../../intrefaces/ilogin';
import { MessageService } from 'primeng/api';
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
  
  isSubmitting: boolean = false;
  showErrorDialog: boolean = false;  // Controlar la visibilidad del modal de error
  errorMessage: string = '';         // Mensaje de error que se mostrará en el modal

  loginResponseOnbject: any;  
  
  valCheck: string[] = ['remember'];

  loginForm = this.formBuilder.group({
    correo: ['user1@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    public layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async authSubmit() {
    if (this.loginForm.invalid) {
      alert("Error al ingresar los datos");
      return;
    }

    var loginInfo: ILogin = {
      correo: this.loginForm.value.correo?.toString(),
      password: this.loginForm.value.password?.toString()
    };

    this.isSubmitting = true; // Activar el preloader al comenzar la solicitud

    this._loginService.loginUser(loginInfo).subscribe(
      (data) => {
        this.loginResponseOnbject = data;
        this.router.navigateByUrl('hotspot/dashboard'); // Redirigir después del login

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Inicio de sesión exitoso",
          life: 3000
        });

        this.isSubmitting = false; // Desactivar el preloader después de la respuesta
      },
      (error: any) => {
        console.error("Ocurrió un error durante la solicitud:", error);

        if (error.error && error.error.errorsMessage && error.error.errorsMessage.length > 0) {
          this.errorMessage = error.error.errorsMessage[0];
        } else {
          this.errorMessage = 'Ocurrió un error desconocido. Por favor, inténtelo de nuevo.';
        }

        this.showErrorDialog = true;  // Mostrar el modal de error
        this.isSubmitting = false; // Desactivar el preloader después de la respuesta o error
      }
    );
  }

  validacionLogin() {
    if (this.loginForm.valid) {
      console.log("Formulario correcto");
    } else {
      console.log("Formulario inválido");
      alert("Error al ingresar los datos");
    }
  }
}
