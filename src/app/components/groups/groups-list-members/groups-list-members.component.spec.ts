import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListMembersComponent } from './groups-list-members.component';

describe('GroupsListMembersComponent', () => {
  let component: GroupsListMembersComponent;
  let fixture: ComponentFixture<GroupsListMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsListMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsListMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
