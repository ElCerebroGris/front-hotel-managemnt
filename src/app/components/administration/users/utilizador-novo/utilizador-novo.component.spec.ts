import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadorNovoComponent } from './utilizador-novo.component';

describe('UtilizadorNovoComponent', () => {
  let component: UtilizadorNovoComponent;
  let fixture: ComponentFixture<UtilizadorNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizadorNovoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilizadorNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
