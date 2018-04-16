import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe'
import { FilterByAuthorPipe } from '../../pipes/filter-by-author.pipe'
import { OrderByPipe } from '../../pipes/order-by.pipe'

@Component({
  selector: 'app-browse-books',
  templateUrl: './browse-books.component.html',
  styleUrls: ['./browse-books.component.css']
})
export class BrowseBooksComponent implements OnInit {
  books;
  admin;
  attributesAscending = [];
  attributesDescending = [];
  categories;
  
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private filter: FilterPipe,
    private order: OrderByPipe,
    private filterByAuthor: FilterPipe
  ) { }

  ngOnInit() {
    //check if user is admin
    this.authService.getProfile().subscribe(profile => {
      this.admin = profile.user.admin;
    },
      err => {
        return false;
      })
    //get books
    this.authService.getBooks().subscribe(data => {
      this.books = data.books
    });

    //add the fields to order by that we would like the user to be able to sort (Ascending)
    const attributesAscending1 = { name: "title" };
    const attributesAscending2 = { name: "author" };
    const attributesAscending3 = { name: "price" };
    const attributesAscending4 = { name: "stock" };
    const attributesAscending5 = { name: "category" };
    this.attributesAscending.push(attributesAscending1, attributesAscending2, attributesAscending3, attributesAscending4, attributesAscending5)

    //add the fields to order by that we would like the user to be able to sort (Descending)
    const attributesDescending1 = { name: "-title" };
    const attributesDescending2 = { name: "-author" };
    const attributesDescending3 = { name: "-price" };
    const attributesDescending4 = { name: "-stock" };
    const attributesDescending5 = { name: "-category" };
    this.attributesDescending.push(attributesDescending1, attributesDescending2, attributesDescending3, attributesDescending4, attributesDescending5)

    this.categories = []
    const category1 = { id: 1, name: "Comedy" };
    const category2 = { id: 2, name: "Drama" };
    const category3 = { id: 3, name: "Horror fiction" };
    const category4 = { id: 4, name: "Romance" };
    const category5 = { id: 4, name: "Satire" };
    const category6 = { id: 4, name: "Tragedy" };
    const category7 = { id: 4, name: "Fantasy" };
    const category8 = { id: 4, name: "Adventure" };
    this.categories.push(category1, category2, category3, category4, category5, category6, category7, category8)
  }

  edit(book) {

    //all fields must be filled in
    if (!this.validateService.validateBookCreate(book)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.updateBook(book).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Update successful', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Update error', { cssClass: 'alert alert-danger', timeout: 3000 });
      }
    });
  }




}
