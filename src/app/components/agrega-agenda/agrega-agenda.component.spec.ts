import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaAgendaComponent } from './agrega-agenda.component';

describe('AgregaAgendaComponent', () => {
  let component: AgregaAgendaComponent;
  let fixture: ComponentFixture<AgregaAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
