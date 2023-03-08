import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityUserDetailsComponent } from './community-user-details.component';

describe('CommunityUserDetailsComponent', () => {
  let component: CommunityUserDetailsComponent;
  let fixture: ComponentFixture<CommunityUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
