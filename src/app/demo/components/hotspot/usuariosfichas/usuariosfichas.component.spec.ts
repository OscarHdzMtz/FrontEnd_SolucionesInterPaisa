import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosfichasComponent } from './usuariosfichas.component';

describe('UsuariosfichasComponent', () => {
  let component: UsuariosfichasComponent;
  let fixture: ComponentFixture<UsuariosfichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosfichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosfichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
