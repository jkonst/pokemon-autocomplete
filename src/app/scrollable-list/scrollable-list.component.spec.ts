import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableListComponent } from './scrollable-list.component';

describe('ScrollableListComponent', () => {
  let component: ScrollableListComponent;
  let fixture: ComponentFixture<ScrollableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollableListComponent]
    });
    fixture = TestBed.createComponent(ScrollableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
