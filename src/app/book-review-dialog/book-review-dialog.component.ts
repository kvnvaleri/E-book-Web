import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../book-review-service.service';

@Component({
  selector: 'app-book-review-dialog',
  templateUrl: './book-review-dialog.component.html',
  styleUrls: ['./book-review-dialog.component.css']
})
export class BookReviewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Book) {}
}
