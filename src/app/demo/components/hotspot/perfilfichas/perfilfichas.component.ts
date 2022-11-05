import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';

@Component({
  selector: 'app-perfilfichas',
  templateUrl: './perfilfichas.component.html',
})
export class PerfilfichasComponent implements OnInit {

listplanesfichas: any[] = [];

  constructor(private _perfilfichas: PerfilfichasService) { }

  ngOnInit(): void {
    this.obtenerplanesfichas();
  }


  obtenerplanesfichas(){
        this._perfilfichas.getPlanesFichas().subscribe(data =>{
            console.log(data)
            this.listplanesfichas = data;
        }, error => {
            console.log(error);
        })
  }

}
