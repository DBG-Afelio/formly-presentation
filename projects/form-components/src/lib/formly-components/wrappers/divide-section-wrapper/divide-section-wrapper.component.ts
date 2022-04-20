import { ChangeDetectionStrategy, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'daenae-divide-section-wrapper',
  templateUrl: './divide-section-wrapper.component.html',
  styleUrls: ['./divide-section-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DivideSectionWrapperComponent extends FieldWrapper {

    @ViewChild('fieldComponent', { read: ViewContainerRef})
    override fieldComponent!: ViewContainerRef;

    override defaultOptions: FormlyFieldConfig = {
        templateOptions: {
            classes: ''
        }
    };
}
