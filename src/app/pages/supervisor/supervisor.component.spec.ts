import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorComponent } from './supervisor.component';

describe('SupervisorComponent', () => {
  let component: SupervisorComponent;
  let fixture: ComponentFixture<SupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
