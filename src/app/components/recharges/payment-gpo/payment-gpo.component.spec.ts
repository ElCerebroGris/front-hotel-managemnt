import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGpoComponent } from './payment-gpo.component';

describe('PaymentGpoComponent', () => {
  let component: PaymentGpoComponent;
  let fixture: ComponentFixture<PaymentGpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
