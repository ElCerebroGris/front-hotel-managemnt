import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAddMemberComponent } from './groups-add-member.component';

describe('GroupsAddMemberComponent', () => {
  let component: GroupsAddMemberComponent;
  let fixture: ComponentFixture<GroupsAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsAddMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
