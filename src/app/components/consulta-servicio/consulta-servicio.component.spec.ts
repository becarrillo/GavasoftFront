import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaServicioComponent } from './consulta-servicio.component';

describe('ConsultaServicioComponent', () => {
  let component: ConsultaServicioComponent;
  let fixture: ComponentFixture<ConsultaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
