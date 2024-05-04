import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaRolComponent } from './asigna-rol.component';

describe('AsignaRolComponent', () => {
  let component: AsignaRolComponent;
  let fixture: ComponentFixture<AsignaRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignaRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
