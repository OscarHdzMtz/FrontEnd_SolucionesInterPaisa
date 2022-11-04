import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutersfichasComponent } from './routersfichas.component';

describe('RoutersfichasComponent', () => {
  let component: RoutersfichasComponent;
  let fixture: ComponentFixture<RoutersfichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutersfichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutersfichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
