/* tslint:disable:no-unused-variable */
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { frLocale } from 'ngx-bootstrap/locale';
import { TranslateModule } from '@ngx-translate/core';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerSubComponent } from './component/datepicker-sub.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';

defineLocale('fr', frLocale);

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            ReactiveFormsModule,
            BsDatepickerModule.forRoot(),
            TranslateModule.forRoot()
        ],
      declarations: [ DatepickerComponent, DatepickerSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    const controlKey = 'test';
    const form = new FormGroup({ [controlKey]: new FormControl() });
    component.field = {
        key: controlKey,
        templateOptions: {},
        form,
        formControl: form.get(controlKey) as FormControl,
        options: { showError: () => false }
    };
    defineLocale('fr');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
