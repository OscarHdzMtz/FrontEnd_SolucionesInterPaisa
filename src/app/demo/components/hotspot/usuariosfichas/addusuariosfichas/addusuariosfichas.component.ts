import { Component, OnInit } from '@angular/core';
import {DividerModule} from 'primeng/divider';
import {SliderModule} from 'primeng/slider';

@Component({
  selector: 'app-addusuariosfichas',
  templateUrl: './addusuariosfichas.component.html',
  styleUrls: ['./addusuariosfichas.component.scss']
})
export class AddusuariosfichasComponent implements OnInit {

    valorLongUser?: number = 3;
    valorLongPass?: number = 3;
    tipoUsuarioGenerar: any[];
    tipoPasswordGenerar: any[];
    tipoInicioDeSesion: any[];
  constructor() {
    this.tipoUsuarioGenerar = [
        "numerico", "alfanumerico", "combinados"
    ]
    this.tipoPasswordGenerar = [
        "numerico", "alfanumerico", "combinados"
    ]
    this.tipoInicioDeSesion = [
        "Contraseña", "Pin"
    ]
  }

  ngOnInit(): void {
  }

}
