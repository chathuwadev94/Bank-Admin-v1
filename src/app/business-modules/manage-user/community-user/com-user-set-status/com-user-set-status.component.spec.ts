import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComUserSetStatusComponent } from './com-user-set-status.component';

describe('ComUserSetStatusComponent', () => {
  let component: ComUserSetStatusComponent;
  let fixture: ComponentFixture<ComUserSetStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComUserSetStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComUserSetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
