import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookReviewService, Review } from '../book-review-service.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  reviews: Review[] = [];

  constructor(private bookReviewService: BookReviewService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      const bookIdInt = parseInt(bookId);
      this.book = this.bookReviewService.getBookById(bookIdInt);
      this.reviews = this.bookReviewService.getReviewsForBook(bookIdInt);
    }
  }

  saveDataToLocalStorage() {
    // Save data to local storage
    this.bookReviewService.saveBooksToLocalStorage();
    this.bookReviewService.saveReviewsToLocalStorage();
  }
}
