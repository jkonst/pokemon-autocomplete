import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {arraysAreEqual} from "../utils";

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

  @Output() showDetails = new EventEmitter<T>();
  @Output() loadMoreItems = new EventEmitter<void>();
  @Output() loadInitialList = new EventEmitter<void>();

  searchControl = new FormControl();
  isDropDownOpen = false;
  isItemSelected = false;
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
      if (!arraysAreEqual(prevItems, currItems)) {
        this.filteredItems = currItems;
      }
    }
  }

  filterItems(query: string) {
    this.filteredItems = this.items?.filter(item => this.filterFn(item, query)) ?? [];
  }

  onSelectItem(item: T): void {
    const value = this.displayFn(item);
    this.searchControl.setValue(value);
    this.isItemSelected = true;
    this.showDetails.emit(item);
  }

  clearInput(): void {
    this.searchControl.setValue('');
    this.isItemSelected = false;
    this.loadInitialList.emit();
  }

  toggleDropdown(): void {
    this.isDropDownOpen = !this.isDropDownOpen;
  }
}
