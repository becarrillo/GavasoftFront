import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurguerMenuBtnComponent } from './burguer-menu-btn.component';

describe('BurguerMenuBtnComponent', () => {
  let component: BurguerMenuBtnComponent;
  let fixture: ComponentFixture<BurguerMenuBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurguerMenuBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurguerMenuBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
