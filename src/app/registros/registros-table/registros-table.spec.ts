import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosTable } from './registros-table';

describe('RegistrosTable', () => {
  let component: RegistrosTable;
  let fixture: ComponentFixture<RegistrosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
