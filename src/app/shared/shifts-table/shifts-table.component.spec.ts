import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsTableComponent } from './shifts-table.component';

describe('ShiftsTableComponent', () => {
  let component: ShiftsTableComponent;
  let fixture: ComponentFixture<ShiftsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
