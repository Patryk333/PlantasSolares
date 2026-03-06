import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPlantasFormulario } from './administrador-plantas-formulario';

describe('AdministradorPlantasFormulario', () => {
  let component: AdministradorPlantasFormulario;
  let fixture: ComponentFixture<AdministradorPlantasFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorPlantasFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorPlantasFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
