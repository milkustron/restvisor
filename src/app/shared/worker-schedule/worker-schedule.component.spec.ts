import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerScheduleComponent } from './worker-schedule.component';

describe('WorkerScheduleComponent', () => {
  let component: WorkerScheduleComponent;
  let fixture: ComponentFixture<WorkerScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
