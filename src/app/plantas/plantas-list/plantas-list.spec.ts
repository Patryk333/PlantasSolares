import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasList } from './plantas-list';

describe('PlantasList', () => {
  let component: PlantasList;
  let fixture: ComponentFixture<PlantasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
