import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendersAddComponent } from './senders-add.component';

describe('SendersAddComponent', () => {
  let component: SendersAddComponent;
  let fixture: ComponentFixture<SendersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendersAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
