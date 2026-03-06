import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasItem } from './plantas-item';

describe('PlantasItem', () => {
  let component: PlantasItem;
  let fixture: ComponentFixture<PlantasItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
