import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookReviewService, Review } from '../book-review-service.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookReviewService: BookReviewService, private router: Router) {}

  ngOnInit(): void {
    this.books = this.bookReviewService.getBooks();
    this.calculateAverageStarRating();
  }

  private calculateAverageStarRating() {
    this.books.forEach((book) => {
      const reviews = this.bookReviewService.getReviewsForBook(book?.id || 0);
      if (reviews.length > 0) {
        const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
        book.starReview = totalStars / reviews.length;
      } else {
        book.starReview = 0;
      }
    });
  }
  
  showBookReview(book: Book) {
    if (book?.id) {
      this.router.navigate(['/book', book.id]);
    }    
  }
}
