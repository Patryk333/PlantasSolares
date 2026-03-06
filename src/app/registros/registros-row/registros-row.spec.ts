import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosRow } from './registros-row';

describe('RegistrosRow', () => {
  let component: RegistrosRow;
  let fixture: ComponentFixture<RegistrosRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
