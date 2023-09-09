import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {arraysAreEqual} from "../utils";

@Component({
  standalone: true,
  selector: 'app-scrollable-list',
  imports: [CommonModule],
  templateUrl: './scrollable-list.component.html',
  styleUrls: ['./scrollable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollableListComponent<T> implements AfterViewInit, OnChanges {
  @Input() items: T[] = [];
  @Input() displayFn!: (item: T) => string;
  @Input() enableHighlighting: boolean = true;
  @Input() searchQuery: string = '';
  @Output() reachedBottom = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<T>();
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;
  selectedItem?: T;
  isLoading = false;
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges) {
    const { items } = changes;
    if (items) {
      const prevItems = items.previousValue;
      const currItems = items.currentValue;
      if (!arraysAreEqual(prevItems, currItems)) {
        this.isLoading = false;
      }
    }
  }

  ngAfterViewInit(): void {
    this.scrollableDiv.nativeElement.addEventListener('scroll', (event: any) => this.onScroll(event));
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight && !this.searchQuery) {
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

  highlightText(text: string, query: string) {
    const startIndex = text.toLowerCase().indexOf(query.toLowerCase());
    const endIndex = startIndex + query.length;
    const highlightedText = `
        ${text.substring(0, startIndex)}<span style='background-color: yellow;'>${text.substring(startIndex, endIndex)}</span>${text.substring(endIndex)}
    `;
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
