import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-books',
  templateUrl: './browse-books.component.html',
  styleUrls: ['./browse-books.component.css']
})
export class BrowseBooksComponent implements OnInit {
  books;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    //get books
    this.authService.getBooks().subscribe(data => {
      this.books = data.books
    });
  }

  edit(book){
    this.authService.updateBook(book).subscribe(data => {
      if (data.success) {
       this.flashMessage.show('Update successful', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Update error', { cssClass: 'alert-success', timeout: 3000 });
      }
    });
  }




}
