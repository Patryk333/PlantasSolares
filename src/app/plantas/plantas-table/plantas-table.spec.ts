import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasTable } from './plantas-table';

describe('PlantasTable', () => {
  let component: PlantasTable;
  let fixture: ComponentFixture<PlantasTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
