import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-main',  
    templateUrl: './main.component.html'
})
export class MainComponent {
  isAuthenticated = false;
  constructor(public layoutService: LayoutService, public router: Router) { }
}
