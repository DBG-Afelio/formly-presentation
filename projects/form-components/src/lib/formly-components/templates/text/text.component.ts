import { UntypedFormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { merge, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { blockPastSpecialCharracters, checkSpecialCharacters } from '../../../helpers/textinputfilter.helper';

@Component({
  selector: 'daenae-text',
  templateUrl: './text.component.html',
  styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TextComponent extends FieldType implements OnInit, OnDestroy {

    public showError$!: Observable<boolean>;
    public inputBlur$ = new Subject<void>();
    private destroy$: Subject<boolean> = new Subject<boolean>();

    checkSpecialCharacters = checkSpecialCharacters;
    blockPastSpecialCharracters = blockPastSpecialCharracters;

    override defaultOptions = {
        validators: {
            validation: [Validators.maxLength(250)],
        },
        templateOptions: {
            acceptSpaces: true,
            className: ''
        }
    };

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    
    public get control() : UntypedFormControl {
        return this.formControl as UntypedFormControl;
    }
    

    ngOnInit() {
        this.showError$ = merge(this.formControl.statusChanges, this.inputBlur$).pipe(
            takeUntil(this.destroy$),
            startWith(this.showError),
            map(() => this.showError)
        );
    }

    ngOnDestroy() {
        this.inputBlur$.complete();
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}

