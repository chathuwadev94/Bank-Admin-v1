import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySetStatusComponent } from './category-set-status.component';

describe('CategorySetStatusComponent', () => {
  let component: CategorySetStatusComponent;
  let fixture: ComponentFixture<CategorySetStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySetStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
