import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoServicioComponent } from './resultado-servicio.component';

describe('ResultadoServicioComponent', () => {
  let component: ResultadoServicioComponent;
  let fixture: ComponentFixture<ResultadoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
