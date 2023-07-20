import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReviewDialogComponent } from './book-review-dialog.component';

describe('BookReviewDialogComponent', () => {
  let component: BookReviewDialogComponent;
  let fixture: ComponentFixture<BookReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookReviewDialogComponent]
    });
    fixture = TestBed.createComponent(BookReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
