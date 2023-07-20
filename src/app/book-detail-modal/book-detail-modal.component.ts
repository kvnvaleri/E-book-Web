import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, Review } from '../book-review-service.service';

@Component({
  selector: 'app-book-detail-modal',
  templateUrl: './book-detail-modal.component.html',
  styleUrls: ['./book-detail-modal.component.css']
})
export class BookDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book, reviews: Review[] }
  ) { }
}
