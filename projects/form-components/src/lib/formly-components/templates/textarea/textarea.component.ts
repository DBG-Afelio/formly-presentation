import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// Based on https://github.com/ngx-formly/ngx-formly/blob/main/src/ui/bootstrap/textarea/src/textarea.type.ts

@Component({
    selector: 'daenae-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends FieldType implements OnInit, AfterContentChecked, OnDestroy {
    override defaultOptions = {
        templateOptions: {
            cols: 1,
            maxLength: 99999,
            minRows: 4,
            onlyGrow: false
        },
    };

    private isVisible = false;
    public showError$!: Observable<boolean>;
    public inputBlur$: Subject<void> = new Subject();
    private destroy$: Subject<void> = new Subject();

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
        super();
    }

    ngOnInit(): void {
        this.showError$ = merge(this.formControl.statusChanges, this.inputBlur$).pipe(
            takeUntil(this.destroy$),
            map(() => this.showError)
        );
    }

    ngAfterContentChecked(): void {
        if (!this.isVisible && this.elementRef.nativeElement.offsetParent != null) {
            this.isVisible = true;
            this.refresh();
        } else if (this.isVisible && this.elementRef.nativeElement.offsetParent == null) {
            this.isVisible = false;
        }
    }

    private refresh(): void {
        this.cdr.detectChanges();
    }

    
    public get control() : UntypedFormControl {
        return this.formControl as UntypedFormControl
    }
    

    ngOnDestroy(): void {
        this.inputBlur$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
