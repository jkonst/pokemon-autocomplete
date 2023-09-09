import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-scrollable-list',
  templateUrl: './scrollable-list.component.html',
  styleUrls: ['./scrollable-list.component.scss']
})
export class ScrollableListComponent<T> implements AfterViewInit{
  @Input() items: T[] = [];
  @Input() displayFn!: (item: T) => string;
  @Output() reachedBottom = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<T>();
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;
  selectedItem?: T;
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.reachedBottom.emit();
    }
  }

  selectItem(item: T): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  ngAfterViewInit(): void {
    this.scrollableDiv.nativeElement.addEventListener('scroll', (event: any) => this.onScroll(event));
  }
}
