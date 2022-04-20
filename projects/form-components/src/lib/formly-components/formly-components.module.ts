import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyExtension, FormlyFieldConfig, FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import moment from 'moment-es6';
import { AutosizeModule } from 'ngx-autosize';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxMaskModule } from 'ngx-mask';
import { directives } from '../directives/index';
import { DaenaePipesModule } from '../pipes/daenae-pipes.module';
import { FormlyModalComponent } from './formly-modal/formly-modal.component';
import {
    TextareaComponent,
    TextComponent
} from './templates';
import { FormlySwitchListValidatorRequired } from './validators/formly-switch-list.validator';
import {
    SectionWrapperComponent,
    SimpleFieldWrapperComponent
} from './wrappers';


export function formlyValidationConfig(translate: TranslateService) {
    return {
      validationMessages: [
        {
          name: 'required',
          message() {
            return translate.stream('FORM.VALIDATION.REQUIRED');
          },
        },
        {
            name: 'min',
            message: (error: {min: string}, field: FormlyFieldConfig) => {
                return translate.stream(field.templateOptions?.['errorMessages'] ?
                field.templateOptions?.['errorMessages'] :
                    'FORM.VALIDATION.NUMBER_LOWER_THAN', {min : error.min});
            }
        },
        {
            name: 'max',
            message: (error: {max: string}, field: FormlyFieldConfig) => {
                return translate.stream(field.templateOptions?.['errorMessages'] ?
                    field.templateOptions?.['errorMessages'].max :
                    'FORM.VALIDATION.NUMBER_BIGGER_THAN', {max : error.max});
            }
        },
        {
            name: 'outOfRange',
            message(error:  {max: string,  min: string}, field: FormlyFieldConfig) {
                return translate.stream(
                    field.templateOptions?.['errorMessages'].outOfRange,
                    {
                        min : field.templateOptions?.min,
                        max : field.templateOptions?.max
                    }
                );
            }
        },
        {
            name: 'dateRangeError',
            message() {
              return translate.stream('FORM.VALIDATION.ULTERIOR_DATE');
            }
        },
        {
            name: 'invalidDate',
            message() {
              return translate.stream('FORM.VALIDATION.INVALIDDATE');
            }
        },
        {
            name: 'dateTooBig',
            message(a: Date) {
              return translate.stream('FORM.VALIDATION.DATETOOBIG', {date :  moment(a).format('DD/MM/YYYY')});
            }
        },
        {
            name: 'dateTooSmall',
            message(a: Date) {
                return translate.stream('FORM.VALIDATION.DATETOOSMALL', {'date' : moment(a).format('DD/MM/YYYY')});
            }

        },
        {
            name: 'switchRequired',
            message() {
                return translate.stream('FORM.VALIDATION.SWITCH_LIST_REQUIRED');
            }
        },
        {
            name: 'phoneError',
            message() {
                return translate.stream('FORM.VALIDATION.PHONE_ERROR');
            }
        },
        {
            name: 'emailInvalid',
            message() {
                return translate.stream('FORM.VALIDATION.EMAIL_ERROR');
            }
        },
        {
            name: 'invalidHour',
            message() {
                return translate.stream('FORM.VALIDATION.TIME_FORMAT_ERROR');
            }
        },
        {
            name: 'incoherentHours',
            message() {
                return translate.stream('FORM.VALIDATION.HOURS_INCOHERENT');
            }
        },
        {
            name: 'minChoice',
            message(min: number) {
                return translate.stream('FORM.VALIDATION.MINIMUM_CHOICE', { min });
            }
        },
        {
            name: 'minLength',
            message(min: number) {
                return translate.stream('FORM.VALIDATION.MINIMUM_LENGTH', { min });
            }
        },
        {
            name: 'invalidInami',
            message() {
                return translate.stream('FORM.VALIDATION.INAMI_NUMBER_ERROR');
            }
        }
      ]
    };
}

let postPopulateFormeHookTimeout: ReturnType<typeof setTimeout> | null = null;
export function postPopulateFormeHook(field: FormlyFieldConfig) {
    if (
        field.parent &&
        !field.parent.parent &&
        field.templateOptions?.['postPopulateForm'] &&
        !field.templateOptions?.['_postPopulateFormCalled']
    ) {
        // Debounce
        if (postPopulateFormeHookTimeout) {
            clearTimeout(postPopulateFormeHookTimeout);
            postPopulateFormeHookTimeout = null;
        }
        postPopulateFormeHookTimeout = setTimeout(() => {
            field.templateOptions?.['postPopulateForm'](field);
            if (field.templateOptions) {
                field.templateOptions['_postPopulateFormCalled']  = true;
            } else {
                field.templateOptions = {
                    _postPopulateFormCalled : true
                }
            }
            postPopulateFormeHookTimeout = null;
        }, 0);
    }
}
export const formPopulateHookExtension: FormlyExtension = {
    postPopulate: postPopulateFormeHook
};

@NgModule({
    declarations: [
        SimpleFieldWrapperComponent,
        SectionWrapperComponent,
        TextComponent,
        TextareaComponent,
        FormlyModalComponent,
        ...directives
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        TranslateModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        PopoverModule.forRoot(),
        FormlyModule.forChild({
            extras: { lazyRender: true },
            extensions: [
                { name: 'form-populate-hook', extension: formPopulateHookExtension },
            ],
            validators: [
                { name: 'switch-list-required', validation: (controls) => FormlySwitchListValidatorRequired(controls) }
            ],
            wrappers: [
                { name: 'simple-field-wrapper', component: SimpleFieldWrapperComponent },
                { name: 'section-wrapper', component: SectionWrapperComponent }
            ],
            types: [
                { name: 'textarea', component: TextareaComponent, wrappers: ['simple-field-wrapper']},
                { name: 'text', component: TextComponent, wrappers: ['simple-field-wrapper']},
            ]
        }),
        BsDatepickerModule.forRoot(),
        FormlySelectModule,
        MatAutocompleteModule,
        AutosizeModule,
        DaenaePipesModule,
        NgSelectModule
    ],
    providers: [
        { provide: FORMLY_CONFIG, multi: true, useFactory: formlyValidationConfig, deps: [TranslateService] }
    ],
    exports: [
        TextareaComponent,
        SimpleFieldWrapperComponent,
        ReactiveFormsModule,
        FormlyModule,
        DaenaePipesModule,
        FormlyModalComponent
    ]
})
export class FormlyComponentsModule {}
