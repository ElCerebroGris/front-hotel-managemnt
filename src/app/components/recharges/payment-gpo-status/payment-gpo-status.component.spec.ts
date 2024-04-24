import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGpoStatusComponent } from './payment-gpo-status.component';

describe('PaymentGpoStatusComponent', () => {
  let component: PaymentGpoStatusComponent;
  let fixture: ComponentFixture<PaymentGpoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGpoStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGpoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
