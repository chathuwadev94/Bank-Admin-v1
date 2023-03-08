import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRemoveComponent } from './customer-remove.component';

describe('CustomerRemoveComponent', () => {
  let component: CustomerRemoveComponent;
  let fixture: ComponentFixture<CustomerRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
