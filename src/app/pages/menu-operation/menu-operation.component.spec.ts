import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOperationComponent } from './menu-operation.component';

describe('MenuOperationComponent', () => {
  let component: MenuOperationComponent;
  let fixture: ComponentFixture<MenuOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
