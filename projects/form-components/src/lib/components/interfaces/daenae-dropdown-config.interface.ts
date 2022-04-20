export interface DaenaeDropdownConfigInterface {
    toggleDropdownLabel: string;
    toggleDropdownClassName?: string;
    toggleDropdownIconClassName?: string;
    dropdownClassName?: string;
    dropdownContainerClassName?: string;
    items?: DaenaeDropdownItemInterface[];
}
export interface DaenaeDropdownItemInterface {
    title?: string;
    titleClassName?: string;
    label: string;
    placeholder?: string;
    labelClassName?: string;
    iconClassName?: string;
    key: string;
    iconKey?: string;
    data?: any;
    separatorTopClassName?: string;
    selectItemClassName?: string;
    options?: any[];
    selectClassName?: string;
    validateButtonClassName?: string;
    cancelButtonClassName?: string;
    dropdownItemClassName?: string;
}
