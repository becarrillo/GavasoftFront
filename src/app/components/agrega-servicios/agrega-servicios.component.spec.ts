import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaServiciosComponent } from './agrega-servicios.component';

describe('AgregaServiciosComponent', () => {
  let component: AgregaServiciosComponent;
  let fixture: ComponentFixture<AgregaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
