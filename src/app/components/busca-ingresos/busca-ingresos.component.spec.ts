import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaIngresosComponent } from './busca-ingresos.component';

describe('BuscaIngresosComponent', () => {
  let component: BuscaIngresosComponent;
  let fixture: ComponentFixture<BuscaIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscaIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
