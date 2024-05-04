import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaServicioComponent } from './modifica-servicio.component';

describe('ModificaServicioComponent', () => {
  let component: ModificaServicioComponent;
  let fixture: ComponentFixture<ModificaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
