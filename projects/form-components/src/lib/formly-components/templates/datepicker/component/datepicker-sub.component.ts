import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import moment from 'moment-es6';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { stringToMoment } from '../../../validators/date-validator-helper';
@Component({
    selector: 'daenae-sub-datepicker',
    templateUrl: './datepicker-sub.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerSubComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatepickerSubComponent),
            multi: true
        }
    ]
})
export class DatepickerSubComponent implements OnInit, ControlValueAccessor, Validator {
    private readonly defaultMinDate = new Date('01/01/1900');
    private readonly defaultMaxDate = new Date('01/01/2200');

    @Input() disabled = false;
    @Input() readonly = false;
    @Input() placeholder?: string;
    @Input() dateFormat = 'DD/MM/YYYY';
    @Input() shouldBlockMinMaxSelection = true;

    @Input() minDate: Date = this.defaultMinDate;
    @Input() maxDate: Date = this.defaultMaxDate;

    @Input() id!: string;

    public inputValue?: string;
    public datepickerValue?: Date;
    public dateNow: Date;

    public bsConfig: Partial<BsDatepickerConfig> = {
        containerClass: 'theme-grey',
        dateInputFormat: this.dateFormat,
        showWeekNumbers: false,
    };
    private _onChange = (myValue?: string) => {
        this._onTouched();
    }
    private _onTouched = () => { };

    constructor(private bootstrapLocale: BsLocaleService) {
        this.bootstrapLocale.use('fr');
        this.dateNow = new Date();
    }

    ngOnInit() {
        if (this.shouldBlockMinMaxSelection) {
            this.bsConfig.minDate = this.minDate;
            this.bsConfig.maxDate = this.maxDate;
        }
    }

    //#region "ControlValueAccessor"
    writeValue(obj?: string): void {
        if (!obj) {
            this.inputValue = undefined;
            this.datepickerValue = undefined;
            this._onChange(undefined);
            return;
        }
        const date = moment(obj, this.dateFormat);
        if (date.isValid()) {
            this.inputValue = date.format(this.dateFormat);
            this.datepickerValue = date.toDate();
        }
        this._onChange(obj);
    }
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    //#endregion "ControlValueAccessor"

    onInputChange(value: string) {
        if (!value) {
            this.writeValue(undefined);
            return;
        }
        const date = moment(value, this.dateFormat, true);


        if (date.isValid()) {
            this.writeValue(date.format(this.dateFormat));
        } else {
            this._onChange(value);
        }
    }

    onDatepickerChange(value: Date | string) {
        const date = moment(value, this.dateFormat, true);
        if (date.isValid()) {
            this.writeValue(date.format(this.dateFormat));
        }
    }

    onBlur() {
        this._onTouched();
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value) {
            const currentMomentDate = stringToMoment(value).startOf('day');
            if (!currentMomentDate.isValid()) {
                return { invalidDate: true };
            }

            if (this.maxDate && moment(this.maxDate, 'DD/MM/YYYY', true).startOf('day').isBefore(currentMomentDate)) {
                return { dateTooBig: this.maxDate };
            }
            if (this.minDate && moment(this.minDate, 'DD/MM/YYYY', true).startOf('day').isAfter(currentMomentDate)) {
                return { dateTooSmall: this.minDate };
            }
        }
        return null;
    }
}
