import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorMenuComponent } from './asesor-menu.component';

describe('AsesorMenuComponent', () => {
  let component: AsesorMenuComponent;
  let fixture: ComponentFixture<AsesorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesorMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsesorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
