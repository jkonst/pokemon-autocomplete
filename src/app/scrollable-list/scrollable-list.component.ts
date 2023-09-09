import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-scrollable-list',
  templateUrl: './scrollable-list.component.html',
  styleUrls: ['./scrollable-list.component.scss']
})
export class ScrollableListComponent<T> implements AfterViewInit, OnChanges {
  @Input() items: T[] = [];
  @Input() displayFn!: (item: T) => string;
  @Input() searchQuery: string = '';
  @Output() reachedBottom = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<T>();
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;
  selectedItem?: T;
  isLoading = false;
  ngOnChanges(changes: SimpleChanges) {
    const { items } = changes;
    if (items && !items.firstChange) {
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    this.scrollableDiv.nativeElement.addEventListener('scroll', (event: any) => this.onScroll(event));
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.isLoading = true;
      this.reachedBottom.emit();
    }
  }

  selectItem(item: T): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  shouldHighlight(text: string, query: string): boolean {
    return text?.toLowerCase().includes(query?.toLowerCase());
  }
}
