import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilfichasComponent } from './perfilfichas.component';

describe('PerfilfichasComponent', () => {
  let component: PerfilfichasComponent;
  let fixture: ComponentFixture<PerfilfichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilfichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilfichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
