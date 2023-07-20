import { Injectable } from '@angular/core';

const BOOKS_KEY = 'books';
const REVIEWS_KEY = 'reviews';

export interface Book {
  id: number;
  title: string;
  publishedYear: number;
  pictureUrl?: string | undefined; // Optional property for book picture URL
  starReview?: number | undefined; // Optional property for star review
  averageStarRating?: number | undefined; // Optional property for average star rating
}

export interface Review {
  bookId: number; // Add 'bookId' property to identify which book the review belongs to
  reviewerName: string;
  reviewerEmail: string;
  stars: number;
  reviewDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {
  private books: Book[] = [];
  private reviews: Review[] = [];

  constructor() {
    this.loadBooksFromLocalStorage();
    this.loadReviewsFromLocalStorage();
  }

  private loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem(BOOKS_KEY);
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
  }

  addBook(book: Book) {
    this.books.push(book);
    this.saveBooksToLocalStorage();
  }

  getBooks(): Book[] {
    return this.books;
  }

  addReview(review: Review) {
    this.reviews.push(review);
    this.saveReviewsToLocalStorage();
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  getBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.id === bookId);
  }

  getReviewsForBook(bookId: number): Review[] {
    return this.reviews.filter(review => review.bookId === bookId) || [];
  }

  private loadReviewsFromLocalStorage() {
    const storedReviews = localStorage.getItem(REVIEWS_KEY);
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
    } else {
      this.reviews = []; // Initialize reviews as an empty array if there are no reviews in local storage
    }
  }

  public saveBooksToLocalStorage() { // Change 'private' to 'public'
    localStorage.setItem(BOOKS_KEY, JSON.stringify(this.books));
  }

  // ... (existing code)

  public saveReviewsToLocalStorage() { // Change 'private' to 'public'
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(this.reviews));
  }
}
