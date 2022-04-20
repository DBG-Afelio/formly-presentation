
export enum ActionButtonTypeEnum {
    Submit = 'Submit',
    Reset = 'Reset'
}
export interface ActionButtonsInterface {
    type: ActionButtonTypeEnum;
    classes: string;
    label: string;
}
export interface FormlyDropdownMenuConfigInterface {
    toggleDropdownLabel: string;
    form: any;
    actionButtons: ActionButtonsInterface[];
    dropdownClasses?: string;
}
