import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookReviewComponent } from './book-review/book-review.component'; // Import BookReviewComponent

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksListComponent },
  { path: 'new-book', component: NewBookComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'book-review', component: BookReviewComponent }, // Add this route for BookReviewComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

