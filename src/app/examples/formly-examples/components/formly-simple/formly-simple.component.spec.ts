import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySimpleComponent } from './formly-simple.component';

describe('FormlySimpleComponent', () => {
  let component: FormlySimpleComponent;
  let fixture: ComponentFixture<FormlySimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlySimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlySimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
