import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendersAdminComponent } from './senders-admin.component';

describe('SendersAdminComponent', () => {
  let component: SendersAdminComponent;
  let fixture: ComponentFixture<SendersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendersAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
