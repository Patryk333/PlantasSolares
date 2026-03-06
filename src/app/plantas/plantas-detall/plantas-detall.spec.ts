import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasDetall } from './plantas-detall';

describe('PlantasDetall', () => {
  let component: PlantasDetall;
  let fixture: ComponentFixture<PlantasDetall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasDetall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasDetall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
