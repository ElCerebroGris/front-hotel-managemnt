import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartosAddComponent } from './quartos-add.component';

describe('QuartosAddComponent', () => {
  let component: QuartosAddComponent;
  let fixture: ComponentFixture<QuartosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartosAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuartosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
