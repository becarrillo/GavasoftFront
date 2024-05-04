import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaEmpleadoComponent } from './crea-empleado.component';

describe('CreaEmpleadoComponent', () => {
  let component: CreaEmpleadoComponent;
  let fixture: ComponentFixture<CreaEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
