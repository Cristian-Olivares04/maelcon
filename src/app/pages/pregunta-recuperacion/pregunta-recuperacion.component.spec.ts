import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaRecuperacionComponent } from './pregunta-recuperacion.component';

describe('PreguntaRecuperacionComponent', () => {
  let component: PreguntaRecuperacionComponent;
  let fixture: ComponentFixture<PreguntaRecuperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaRecuperacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
