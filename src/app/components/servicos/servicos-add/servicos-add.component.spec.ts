import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosAddComponent } from './servicos-add.component';

describe('ServicosAddComponent', () => {
  let component: ServicosAddComponent;
  let fixture: ComponentFixture<ServicosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
