import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookReviewService, Review } from '../book-review-service.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailModalComponent } from '../book-detail-modal/book-detail-modal.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  searchQuery: string = '';

  constructor(private bookReviewService: BookReviewService, private router: Router, private dialog: MatDialog) {}

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

  // Method to handle the search functionality
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value.trim().toLowerCase(); // Convert search query to lowercase

    // Filter the books based on the search query
    if (this.searchQuery) {
      this.books = this.bookReviewService.getBooks().filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery)
      );
    } else {
      // If the search query is empty, show all books
      this.books = this.bookReviewService.getBooks();
    }
  }

  openBookDetailModal(book: Book) {
    const dialogRef = this.dialog.open(BookDetailModalComponent, {
      data: { book, reviews: this.bookReviewService.getReviewsForBook(book.id) },
    });

    // Subscribe to the afterClosed observable to get the result when the modal is closed
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal closed with result:', result);
    });
  }

  goToAddNewBook() {
    this.router.navigate(['/new-book']);
  }

  goToReview() {
    this.router.navigate(['/book-review']);
  }

  showBookReview(book: Book) {
    if (book?.id) {
      // Open the BookDetailModalComponent as a dialog
      const dialogRef = this.dialog.open(BookDetailModalComponent, {
        width: '400px', // Set the width of the modal
        data: { book, reviews: this.bookReviewService.getReviewsForBook(book.id) },
      });
    }
  }

  exportBooks() {
    // Extract the necessary data for each book
    const exportedBooks = this.books.map((book) => {
      const reviews = this.bookReviewService.getReviewsForBook(book.id);
      const averageRating =
        reviews.length > 0 ? reviews.reduce((total, review) => total + review.stars, 0) / reviews.length : 0;

      return {
        name: book.title,
        publishedYear: book.publishedYear,
        averageRating: averageRating.toFixed(2),
        reviews: reviews,
      };
    });

    const data = JSON.stringify(exportedBooks, null, 2); // null, 2 adds indentation for readability
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'books.json';
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
