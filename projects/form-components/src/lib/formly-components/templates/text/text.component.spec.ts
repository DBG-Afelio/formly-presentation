import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextComponent } from './text.component';


describe('TextComponent', () => {
    let component: TextComponent;
    let fixture: ComponentFixture<TextComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TextComponent],
            imports: [
                TranslateModule.forRoot(),
                FormlyModule,
                ReactiveFormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextComponent);
        component = fixture.componentInstance;
        const controlKey = 'test';
        const form = new UntypedFormGroup({ [controlKey]: new UntypedFormControl() });
        component.field = {
            key: controlKey,
            type: 'contextual-menu',
            templateOptions: {
                acceptSpaces: true,
                className: ''
            },
            form,
            formControl: form.get(controlKey),
            options: { showError: () => false }
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
