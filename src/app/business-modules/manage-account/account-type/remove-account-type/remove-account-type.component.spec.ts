import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccountTypeComponent } from './remove-account-type.component';

describe('RemoveAccountTypeComponent', () => {
  let component: RemoveAccountTypeComponent;
  let fixture: ComponentFixture<RemoveAccountTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAccountTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
