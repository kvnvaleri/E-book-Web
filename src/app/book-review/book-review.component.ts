import { Component, OnInit } from '@angular/core';
import { Review, BookReviewService } from '../book-review-service.service';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {
  newReview: Review = { bookId: 0, reviewerName: '', reviewerEmail: '', stars: 0, reviewDescription: '' }; // Change 'reviewForm' to 'newReview'

  constructor(private bookReviewService: BookReviewService) { }

  ngOnInit(): void {
  }

  addReview() {
    this.bookReviewService.addReview(this.newReview); // Change 'reviewForm' to 'newReview'
    this.newReview = { bookId: 0, reviewerName: '', reviewerEmail: '', stars: 0, reviewDescription: '' }; // Reset the form
  }
}
