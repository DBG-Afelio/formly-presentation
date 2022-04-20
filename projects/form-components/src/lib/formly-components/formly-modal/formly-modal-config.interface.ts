import { FormlyModalSizeEnum } from '@fcsd-daenae/form-components';
import { Observable, Subject } from 'rxjs';
import { FormGeneratorResult } from '../interfaces/form-generator-result.interface';
import { FormlyModalButtonTypeEnum } from './formly-modal-button.enum';

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
}

export interface FormlyModalConfigCustomButtons {
    formConfig: FormGeneratorResult;
    actions?: IFormlyModalAction[];
    labels: {
        title: string,
        titleBadge$?: Observable<string | null>
    };
    buttons: IFormlyModalButton[];
    size?: FormlyModalSizeEnum.Normal | FormlyModalSizeEnum.Large | FormlyModalSizeEnum.Medium;
    checkSubmittedPendingOrInvalidForm$?: Subject<void>;
}

export type FormlyModalConfig = FormlyModalConfigBase | FormlyModalConfigCustomButtons;
