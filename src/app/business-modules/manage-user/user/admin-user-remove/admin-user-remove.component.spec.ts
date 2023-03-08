import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRemoveComponent } from './admin-user-remove.component';

describe('AdminUserRemoveComponent', () => {
  let component: AdminUserRemoveComponent;
  let fixture: ComponentFixture<AdminUserRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
