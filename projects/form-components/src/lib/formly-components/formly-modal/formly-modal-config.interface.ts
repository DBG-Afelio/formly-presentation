import { Observable, Subject } from 'rxjs';
import { FormGeneratorResult } from '../interfaces/form-generator-result.interface';
import { FormlyModalButtonTypeEnum } from './formly-modal-button.enum';
import { FormlyModalSizeEnum } from './formly-modal-size.enum';
export interface IFormlyModalAction {
    label: string;
    key: string;
    icon?: string;
    className?: string;
    /**
     * Default: `true`
     */
    closeOnClick?: boolean;
}
export interface IFormlyModalButton {
    label: string;
    type: FormlyModalButtonTypeEnum;
    key?: string;
    className?: string;
}

export interface FormlyModalConfigBase {
    formConfig: FormGeneratorResult;
    actions?: IFormlyModalAction[];
    labels: {
        title: string,
        titleBadge$?: Observable<string | null>,
        cancel: string,
        submit?: string
    };
    size?: FormlyModalSizeEnum.Normal | FormlyModalSizeEnum.Large | FormlyModalSizeEnum.Medium;
    checkSubmittedPendingOrInvalidForm$?: Subject<void>;
    formClasses?: string[];
    buttons?: any[]
}

export interface FormlyModalConfigCustomButtons {
    formConfig: FormGeneratorResult;    
    actions?: IFormlyModalAction[];
    labels: {
        title: string,
        titleBadge$?: Observable<string | null>
        cancel?: string,
        submit?: string
    };
    buttons: IFormlyModalButton[];
    size?: FormlyModalSizeEnum.Normal | FormlyModalSizeEnum.Large | FormlyModalSizeEnum.Medium;
    checkSubmittedPendingOrInvalidForm$?: Subject<void>;
    formClasses?: string[];
}

export type FormlyModalConfig = FormlyModalConfigBase | FormlyModalConfigCustomButtons;
