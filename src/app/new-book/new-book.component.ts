import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookReviewService } from '../book-review-service.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  newBook: Book = { id: 0, title: '', publishedYear: 0 };

  selectedImage: string | undefined;

  constructor(private bookReviewService: BookReviewService, private router: Router) {}

  ngOnInit(): void {}

  addBook() {
    this.bookReviewService.addBook(this.newBook);
    this.newBook = { id: 0, title: '', publishedYear: 0 };
    this.router.navigate(['/books']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
    }
  }
}
