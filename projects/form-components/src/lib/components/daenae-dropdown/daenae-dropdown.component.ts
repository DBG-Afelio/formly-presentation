import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { DaenaeDropdownConfigInterface, DaenaeDropdownItemInterface } from '../interfaces';

@Component({
    selector: 'daenae-dropdown',
    templateUrl: './daenae-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaenaeDropdownComponent implements OnInit, OnChanges, OnDestroy {

    @Input() config: DaenaeDropdownConfigInterface;
    @Input() closeDropdown: boolean;

    @Output() dropdownItemClickedEvent = new EventEmitter<DaenaeDropdownItemInterface>();
    @Output() dropdownIconClickedEvent = new EventEmitter<DaenaeDropdownItemInterface>();

    public isVisible$ = new BehaviorSubject<boolean>(false);

    public dropdownFormGroup = new FormGroup({});

    public dropdownSelectToggledDictionary: {[key: string]: boolean};

    public destroy$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config) {
            if (changes.config.currentValue?.items) {
                const items = this.config.items;
                items.map(item => {
                    if (item.options && item.options.length) {
                        this.dropdownFormGroup.addControl(item.key, new FormControl(item.data ?? null));
                        this.dropdownSelectToggledDictionary = {
                            ...this.dropdownSelectToggledDictionary,
                            [item.key]: false
                        };
                    }
                });
            }
        }
         if (changes.closeDropdown) {
            this.isVisible$.next(!changes.closeDropdown.currentValue);
         }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    toggleDropdown() {
        this.isVisible$.next(!this.isVisible$.getValue());
    }

    public toggleSelect(item: DaenaeDropdownItemInterface): void {
        this.dropdownFormGroup.get(item.key).setValue(item.data);
        this.dropdownSelectToggledDictionary[item.key] = !this.dropdownSelectToggledDictionary[item.key];
    }

    public validateDropdownSelect(item: DaenaeDropdownItemInterface): void {
        const selectValue = this.dropdownFormGroup.get(item.key).value;
        const newItem = {
            ...item,
            data: selectValue
        };
        this.dropdownItemClickedEvent.emit(newItem);
        this.toggleSelect(item);
    }

    public dropdownItemClicked(item: DaenaeDropdownItemInterface): void {
        if (item.options) {
            this.toggleSelect(item);
        } else {
            this.dropdownItemClickedEvent.emit(item);
        }
    }

    public dropdownIconClicked(item: DaenaeDropdownItemInterface): void {
            this.dropdownIconClickedEvent.emit(item);
    }
}
