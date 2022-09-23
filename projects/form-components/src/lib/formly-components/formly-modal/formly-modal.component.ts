import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNil } from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { scrollToError } from '../../helpers/controls-errors.helper';
import { checkIfPendingFormIsInvalid, markAllControlsAsTouched } from '../../helpers/formgroup.helper';
import { FormlyModalButtonTypeEnum } from './formly-modal-button.enum';
import { FormlyModalConfig, IFormlyModalAction, IFormlyModalButton } from './formly-modal-config.interface';
import { FormlyModalSizeEnum } from './formly-modal-size.enum';

@Component({
    selector: 'daenae-formly-modal',
    templateUrl: './formly-modal.component.html'
})
export class FormlyModalComponent implements OnDestroy {

    public actionEmitter$ = new Subject<string>();
    public buttonsEmitter$ = new Subject<string | null>();

    public classes = 'col-10 col-md-6 col-lg-4';
    public titleBadge$?: Observable<string | null>;

    public navigationStack: (FormlyModalConfig)[] = [];
    public currentNavigationData$ = new BehaviorSubject<FormlyModalConfig | null>(null);

    constructor(
        public dialogRef: MatDialogRef<FormlyModalComponent>,
        @Inject(MAT_DIALOG_DATA) data: FormlyModalConfig
    ) {
        if (!data.formConfig) {
            throw new Error('You must give a formly config to this type of modal.');
        }
        this.pushNavigation(data);
        if (data.size === FormlyModalSizeEnum.Large) {
            this.classes = '-medium col-10 col-lg-8';
        }
        if (data.size === FormlyModalSizeEnum.Medium) {
            this.classes = 'col-11 col-md-9 col-lg-7 col-xl-5';
        }
        if (data.labels.titleBadge$) {
            this.titleBadge$ = data.labels.titleBadge$.pipe(debounceTime(10));
        }
    }

    ngOnDestroy(): void {
        this.actionEmitter$.complete();
        this.buttonsEmitter$.complete();
    }

    /**
     * Close the dialog
     * @param returnData the data to return
     */
    public closeDialog(returnData?: any) {
        this.dialogRef.close(returnData);
    }

    public submit() {
        const data = this.currentNavigationData$.getValue();
        if (data) {
            markAllControlsAsTouched(data.formConfig.formGroup);
            if (data.formConfig.formGroup.valid) {
                this.closeDialog(data.formConfig.model);
            } else if (checkIfPendingFormIsInvalid(data.formConfig.formGroup)) {
                scrollToError();
            } else if (data.checkSubmittedPendingOrInvalidForm$ && data.formConfig.formGroup.status === 'PENDING') {
                data.checkSubmittedPendingOrInvalidForm$.next();
            }
        }
    }

    public cancel() {
        if (this.navigationStack.length === 1) {
            this.closeDialog();
        } else {
            this.popNavigation();
        }
    }

    public actionClicked(action: IFormlyModalAction) {
        this.actionEmitter$.next(action.key);
        if (isNil(action.closeOnClick) || action.closeOnClick) {
            this.closeDialog(action.key);
        }
    }

    public buttonClicked(button: IFormlyModalButton) {
        switch (button.type) {
            case FormlyModalButtonTypeEnum.Submit:
                this.submit();
                break;
            case FormlyModalButtonTypeEnum.Cancel:
                this.cancel();
                break;
            case FormlyModalButtonTypeEnum.CustomSubmit:
                this.buttonsEmitter$.next(button.key ?? null);
                break;
            default:
                const data = this.currentNavigationData$.getValue();
                this.closeDialog(data?.formConfig.model);
                break;
        }
    }

    public pushNavigation(nav: FormlyModalConfig) {
        this.navigationStack.push(nav);
        this.currentNavigationData$.next(nav);
    }

    public popNavigation() {
        this.navigationStack.pop();
        this.currentNavigationData$.next(this.navigationStack[this.navigationStack.length - 1]);
    }
}
