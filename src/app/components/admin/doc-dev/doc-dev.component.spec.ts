import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDevComponent } from './doc-dev.component';

describe('DocDevComponent', () => {
  let component: DocDevComponent;
  let fixture: ComponentFixture<DocDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
