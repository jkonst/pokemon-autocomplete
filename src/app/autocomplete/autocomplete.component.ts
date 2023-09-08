import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent<T> implements OnChanges {
  @Input() items?: T[] = [];
  @Input() label: string = '';
  @Input() textPlaceholder: string = '';
  @Input() filterFn!: (item: T, query: string) => boolean;
  @Input() displayFn!: (item: T) => string;

  @Output() itemSelected = new EventEmitter<T>();
  @Output() loadMoreItems = new EventEmitter<void>();
  @Output() loadInitialList = new EventEmitter<void>();

  searchControl = new FormControl();
  isDropDownOpen = false;
  filteredItems: T[] = [];

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filterItems(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { items } = changes;
    if (items) {
      const prevItems = items.previousValue;
      const currItems = items.currentValue;
      if (!this.arraysAreEqual(prevItems, currItems)) {
        this.filteredItems = currItems;
      }
    }
  }

  filterItems(query: string) {
    this.filteredItems = this.items?.filter(item => this.filterFn(item, query)) ?? [];
  }

  onSelectItem(item: T): void {
    this.itemSelected.emit(item);
  }

  clearInput(): void {
    this.searchControl.setValue('');
    this.loadInitialList.emit();
  }

  toggleDropdown(): void {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  private arraysAreEqual(arr1: any[], arr2: any[]): boolean {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

}
