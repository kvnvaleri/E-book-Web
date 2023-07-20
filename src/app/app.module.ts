import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BookReviewComponent } from './book-review/book-review.component';
import { BookReviewService } from './book-review-service.service';
import { FormsModule } from '@angular/forms';
import { BookDetailModalComponent } from './book-detail-modal/book-detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    NewBookComponent,
    BookReviewComponent,
    BookDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [BookReviewService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
