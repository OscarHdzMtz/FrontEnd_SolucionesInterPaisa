import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  isAuthenticated = false;

  constructor(public layoutService: LayoutService, public router: Router) {}

  ngOnInit(): void {
    // Aquí puedes añadir cualquier lógica de inicialización si es necesario
  }

  scrollToFeatures() {
    this.featuresSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
