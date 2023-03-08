import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorySetStatusComponent } from './sub-category-set-status.component';

describe('SubCategorySetStatusComponent', () => {
  let component: SubCategorySetStatusComponent;
  let fixture: ComponentFixture<SubCategorySetStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategorySetStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategorySetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
