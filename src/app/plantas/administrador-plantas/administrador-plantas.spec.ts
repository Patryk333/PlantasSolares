import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPlantas } from './administrador-plantas';

describe('AdministradorPlantas', () => {
  let component: AdministradorPlantas;
  let fixture: ComponentFixture<AdministradorPlantas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorPlantas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorPlantas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
