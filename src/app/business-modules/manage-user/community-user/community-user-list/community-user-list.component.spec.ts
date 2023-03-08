import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityUserListComponent } from './community-user-list.component';

describe('CommunityUserListComponent', () => {
  let component: CommunityUserListComponent;
  let fixture: ComponentFixture<CommunityUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
