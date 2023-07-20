import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review, Book, BookReviewService } from '../book-review-service.service';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {
  selectedBookId: number | undefined;
  newReview: Review = { bookId: 0, reviewerName: '', reviewerEmail: '', stars: 0, reviewDescription: '' };
  books: Book[] = [];

  constructor(private bookReviewService: BookReviewService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.books = this.bookReviewService.getBooks();
  }

  backHome() {
    this.router.navigate(['/books']);
  }

  addReview() {
    if (this.selectedBookId) {
      const selectedBook = this.bookReviewService.getBookById(this.selectedBookId);
      if (selectedBook) {
        this.newReview.bookId = this.selectedBookId;
        this.bookReviewService.addReview(this.newReview);
        this.newReview = { bookId: 0, reviewerName: '', reviewerEmail: '', stars: 0, reviewDescription: '' };
        this.selectedBookId = undefined; 

        this.bookReviewService.saveReviewsToLocalStorage();

        this.router.navigate(['/books']);
      }
    }
  }
  

  
  

  // Update the selected book id when the user chooses a book from the list
  onSelectBook(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedBookId = parseInt(target.value, 10);
  }
}
