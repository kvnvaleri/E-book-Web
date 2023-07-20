import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, Review } from '../book-review-service.service';

@Component({
  selector: 'app-book-detail-modal',
  templateUrl: './book-detail-modal.component.html',
  styleUrls: ['./book-detail-modal.component.css'],
})
export class BookDetailModalComponent {
  book: Book | undefined;
  reviews: Review[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { book: Book, reviews: Review[] }) {
    this.book = data.book;
    this.reviews = data.reviews;
  }
}
