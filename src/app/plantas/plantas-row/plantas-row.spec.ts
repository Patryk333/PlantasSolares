import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasRow } from './plantas-row';

describe('PlantasRow', () => {
  let component: PlantasRow;
  let fixture: ComponentFixture<PlantasRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
